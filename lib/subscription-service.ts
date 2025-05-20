import { supabase } from '@/lib/supabase';
import { Subscription, SubscriptionStatus } from '@/types/subscription';
import { stripe, getPlanFromPriceId } from '@/lib/stripe';

/**
 * Get a user's subscription from Supabase
 */
export async function getUserSubscription(userId: string): Promise<Subscription | null> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user subscription:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserSubscription:', error);
    return null;
  }
}

/**
 * Create or update a subscription in Supabase
 */
export async function upsertSubscription(subscription: Partial<Subscription> & { user_id: string }): Promise<Subscription | null> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .upsert(subscription, { onConflict: 'user_id' })
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Error upserting subscription:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in upsertSubscription:', error);
    return null;
  }
}

/**
 * Update a subscription in Supabase by Stripe subscription ID
 */
export async function updateSubscriptionByStripeId(
  stripeSubscriptionId: string,
  updates: Partial<Subscription>
): Promise<Subscription | null> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .update(updates)
      .eq('stripe_subscription_id', stripeSubscriptionId)
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Error updating subscription by Stripe ID:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in updateSubscriptionByStripeId:', error);
    return null;
  }
}

/**
 * Delete a subscription from Supabase by Stripe subscription ID
 */
export async function deleteSubscriptionByStripeId(stripeSubscriptionId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('stripe_subscription_id', stripeSubscriptionId);

    if (error) {
      console.error('Error deleting subscription by Stripe ID:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteSubscriptionByStripeId:', error);
    return false;
  }
}

/**
 * Handle Stripe checkout.session.completed event
 */
export async function handleCheckoutSessionCompleted(session: any): Promise<void> {
  try {
    const userId = session.metadata?.userId;
    const customerId = session.customer;
    const subscriptionId = session.subscription;

    if (!userId || !customerId || !subscriptionId) {
      console.error('Missing required data in checkout session:', { userId, customerId, subscriptionId });
      return;
    }

    // Get the subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0].price.id;

    // Get the subscription status
    const status = subscription.status as SubscriptionStatus;

    // Create or update the subscription in Supabase
    await upsertSubscription({
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      price_id: priceId,
      status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    });

    // Update the user's profile with the subscription plan
    const plan = getPlanFromPriceId(priceId);
    await supabase
      .from('profiles')
      .update({ subscription_plan: plan })
      .eq('id', userId);

  } catch (error) {
    console.error('Error handling checkout session completed:', error);
  }
}

/**
 * Handle Stripe customer.subscription.updated event
 */
export async function handleSubscriptionUpdated(subscription: any): Promise<void> {
  try {
    const subscriptionId = subscription.id;
    const customerId = subscription.customer;
    const status = subscription.status as SubscriptionStatus;
    const priceId = subscription.items.data[0].price.id;

    // Get the user ID from the subscription metadata
    const userId = subscription.metadata?.userId;

    if (!userId) {
      // If userId is not in metadata, try to find it in Supabase
      const { data } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', subscriptionId)
        .maybeSingle();

      if (!data?.user_id) {
        console.error('Could not find user ID for subscription:', subscriptionId);
        return;
      }

      // Update the subscription in Supabase
      await updateSubscriptionByStripeId(subscriptionId, {
        status,
        price_id: priceId,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
      });

      // Update the user's profile with the subscription plan
      const plan = getPlanFromPriceId(priceId);
      await supabase
        .from('profiles')
        .update({ subscription_plan: plan })
        .eq('id', data.user_id);
    } else {
      // Update the subscription in Supabase
      await upsertSubscription({
        user_id: userId,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        price_id: priceId,
        status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
      });

      // Update the user's profile with the subscription plan
      const plan = getPlanFromPriceId(priceId);
      await supabase
        .from('profiles')
        .update({ subscription_plan: plan })
        .eq('id', userId);
    }
  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

/**
 * Handle Stripe customer.subscription.deleted event
 */
export async function handleSubscriptionDeleted(subscription: any): Promise<void> {
  try {
    const subscriptionId = subscription.id;

    // Get the subscription from Supabase to get the user ID
    const { data } = await supabase
      .from('subscriptions')
      .select('user_id')
      .eq('stripe_subscription_id', subscriptionId)
      .maybeSingle();

    if (!data?.user_id) {
      console.error('Could not find user ID for deleted subscription:', subscriptionId);
      return;
    }

    // Update the subscription status to 'canceled'
    await updateSubscriptionByStripeId(subscriptionId, {
      status: 'canceled',
      cancel_at_period_end: true,
    });

    // Update the user's profile to free plan
    await supabase
      .from('profiles')
      .update({ subscription_plan: 'free' })
      .eq('id', data.user_id);
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}
