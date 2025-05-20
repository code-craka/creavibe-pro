import { Stripe } from 'stripe';
import { stripe } from './stripe';
import { supabase } from './supabase';

/**
 * Handles payment intent succeeded events for various payment methods
 * This is important for payment methods that don't immediately create a subscription
 */
export async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Extract metadata from the payment intent
    const { userId, subscriptionId } = paymentIntent.metadata;

    if (!userId) {
      console.error('No userId found in payment intent metadata');
      return;
    }

    // If this is related to a subscription, update the subscription status
    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      // Update subscription in Supabase
      await updateSubscriptionInDatabase(subscription, userId);
    }

    // Log the successful payment
    console.log(`Payment succeeded for user ${userId}, payment method: ${paymentIntent.payment_method_types[0]}`);
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error);
  }
}

/**
 * Handles payment intent failed events
 */
export async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Extract metadata from the payment intent
    const { userId } = paymentIntent.metadata;

    if (!userId) {
      console.error('No userId found in payment intent metadata');
      return;
    }

    // Log the failed payment
    console.log(`Payment failed for user ${userId}, payment method: ${paymentIntent.payment_method_types[0]}`);
    
    // You could send an email notification or update a payment attempts table here
  } catch (error) {
    console.error('Error handling payment intent failed:', error);
  }
}

/**
 * Updates subscription information in the Supabase database
 */
export async function updateSubscriptionInDatabase(
  subscription: any, // Use any temporarily to avoid type issues with Stripe's complex types
  userId: string
) {
  try {
    // Check if subscription already exists in database
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('stripe_subscription_id', subscription.id)
      .maybeSingle();

    const subscriptionData = {
      user_id: userId,
      stripe_customer_id: subscription.customer as string,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
      current_period_start: String(subscription.current_period_start),
      current_period_end: String(subscription.current_period_end),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    };

    if (existingSubscription) {
      // Update existing subscription
      await supabase
        .from('subscriptions')
        .update(subscriptionData)
        .eq('id', existingSubscription.id);
    } else {
      // Create new subscription
      await supabase.from('subscriptions').insert({
        ...subscriptionData,
        created_at: new Date().toISOString(),
      });
    }

    console.log(`Subscription ${subscription.id} updated in database for user ${userId}`);
  } catch (error) {
    console.error('Error updating subscription in database:', error);
    throw error;
  }
}

/**
 * Handles delayed notification payment methods like SEPA, iDEAL, etc.
 * These payment methods often have a delay between authorization and settlement
 */
export async function handleDelayedPaymentMethod(event: Stripe.Event) {
  try {
    switch (event.type) {
      case 'payment_intent.processing':
        // Payment is processing - could update status in your database
        const processingIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment processing for ${processingIntent.id}, method: ${processingIntent.payment_method_types[0]}`);
        break;
        
      case 'payment_intent.succeeded':
        // Payment succeeded - update subscription or order status
        const succeededIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(succeededIntent);
        break;
        
      case 'payment_intent.payment_failed':
        // Payment failed - notify customer or update status
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentFailed(failedIntent);
        break;
    }
  } catch (error) {
    console.error('Error handling delayed payment method:', error);
  }
}
