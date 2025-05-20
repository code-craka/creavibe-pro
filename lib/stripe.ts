import Stripe from 'stripe';
import type { Stripe as StripeType } from 'stripe';
import { CreateCheckoutSessionParams, CreateBillingPortalSessionParams } from '@/types/subscription';

// Initialize Stripe with the secret key from environment variables
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // Let Stripe use its default API version
  typescript: true,
});

/**
 * Create a Stripe Checkout Session for subscription
 */
export async function createCheckoutSession({
  priceId,
  userId,
  customerEmail,
  successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?success=true`,
  cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?canceled=true`,
}: CreateCheckoutSessionParams): Promise<{ sessionId: string | null; url: string | null }> {
  try {
    // Find or create a customer for the user
    let customerId: string | undefined;
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else if (customerEmail) {
      const customer = await stripe.customers.create({
        email: customerEmail,
        metadata: {
          userId,
        },
      });
      customerId = customer.id;
    }

    // Create the checkout session with dynamic payment methods
    // By removing payment_method_types, Stripe will automatically show all available payment methods
    // based on the currency and customer location
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      // Add payment_method query parameter to success URL to track which payment method was used
      success_url: `${successUrl}${successUrl.includes('?') ? '&' : '?'}session_id={CHECKOUT_SESSION_ID}&payment_method={PAYMENT_METHOD}`,
      cancel_url: cancelUrl,
      metadata: {
        userId,
      },
      subscription_data: {
        metadata: {
          userId,
        },
      },
      // Allow Stripe to handle payment method selection dynamically
      // The currency is determined by the price object in Stripe
    });

    return {
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      sessionId: null,
      url: null,
    };
  }
}

/**
 * Create a Stripe Billing Portal Session for managing subscriptions
 */
export async function createBillingPortalSession({
  customerId,
  returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
}: CreateBillingPortalSessionParams): Promise<{ url: string | null }> {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return {
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating billing portal session:', error);
    return {
      url: null,
    };
  }
}

/**
 * Retrieve a subscription by its ID
 */
export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    return null;
  }
}

/**
 * Cancel a subscription at period end
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    return subscription;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return null;
  }
}

/**
 * Reactivate a subscription that was canceled but not yet expired
 */
export async function reactivateSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
    return subscription;
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    return null;
  }
}

/**
 * Format a price from cents to dollars/euros with proper currency symbol
 */
export function formatPrice(price: number, currency: string = 'usd'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  });

  return formatter.format(price / 100);
}

/**
 * Get the subscription plan name from the price ID
 */
export function getPlanFromPriceId(priceId: string | null): 'free' | 'basic' | 'pro' | 'enterprise' {
  if (!priceId) return 'free';
  
  if (priceId.includes('basic')) return 'basic';
  if (priceId.includes('pro')) return 'pro';
  if (priceId.includes('enterprise')) return 'enterprise';
  
  return 'free';
}
