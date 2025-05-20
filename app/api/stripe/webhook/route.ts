import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import type { Stripe } from 'stripe';
import {
  handleCheckoutSessionCompleted,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted
} from '@/lib/subscription-service';
import {
  handlePaymentIntentSucceeded,
  handlePaymentIntentFailed,
  handleDelayedPaymentMethod
} from '@/lib/payment-method-handlers';

// Disable body parsing, we need the raw body for Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Stripe webhook handler
 * This endpoint receives events from Stripe and processes them
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;
    const contentType = req.headers.get("Content-Type") || "";

    // Webhook secrets for both payload types
    const snapshotWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    const thinWebhookSecret = process.env.STRIPE_THIN_WEBHOOK_SECRET || '';

    // Determine if this is a thin payload or a snapshot payload
    const isThinPayload = contentType.includes("application/json") && body.includes("v2.core");
    const webhookSecret = isThinPayload ? thinWebhookSecret : snapshotWebhookSecret;

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing Stripe signature' },
        { status: 400 }
      );
    }

    let event: Stripe.Event | any; // Use any for thin payloads

    try {
      // For thin payloads, we might need to parse the JSON directly
      if (isThinPayload) {
        // Parse the thin payload
        const parsedEvent = JSON.parse(body);
        // Verify the signature
        stripe.webhooks.constructEvent(body, signature, webhookSecret);
        event = parsedEvent;
      } else {
        // Standard snapshot payload
        event = stripe.webhooks.constructEvent(
          body,
          signature,
          webhookSecret
        );
      }
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    console.log(`Received Stripe event: ${isThinPayload ? event.type : event.type}`);

    // Process based on payload type
    if (isThinPayload) {
      // Handle thin payload events
      await handleThinPayloadEvent(event);
    } else {
      // Handle standard snapshot payload events
      switch (event.type) {
        case 'checkout.session.completed':
          // A checkout session has completed successfully
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          await handleCheckoutSessionCompleted(checkoutSession);
          break;

        case 'customer.subscription.updated':
        case 'customer.subscription.created':
          // A subscription has been created or updated
          const updatedSubscription = event.data.object as Stripe.Subscription;
          await handleSubscriptionUpdated(updatedSubscription);
          break;

        case 'customer.subscription.deleted':
          // A subscription has been canceled or expired
          const deletedSubscription = event.data.object as Stripe.Subscription;
          await handleSubscriptionDeleted(deletedSubscription);
          break;

        // Payment intent events for handling various payment methods
        case 'payment_intent.succeeded':
          // Payment intent succeeded - important for non-card payment methods
          const succeededIntent = event.data.object as Stripe.PaymentIntent;
          await handlePaymentIntentSucceeded(succeededIntent);
          break;
          
        case 'payment_intent.payment_failed':
          // Payment intent failed
          const failedIntent = event.data.object as Stripe.PaymentIntent;
          await handlePaymentIntentFailed(failedIntent);
          break;
          
        case 'payment_intent.processing':
          // Payment is being processed (common with bank transfers, SEPA, etc.)
          // Handle delayed notification payment methods
          await handleDelayedPaymentMethod(event);
          break;

        // Add more event handlers as needed
        case 'invoice.payment_succeeded':
          try {
            // Handle successful invoice payment
            // This could update the subscription's current_period_end
            const invoiceEvent = event.data.object as any; // Use any temporarily to access properties
            
            // Check if the invoice has a subscription ID
            if (invoiceEvent.subscription && typeof invoiceEvent.subscription === 'string') {
              // Get the subscription details and update in Supabase
              const subscriptionId = invoiceEvent.subscription;
              const subscription = await stripe.subscriptions.retrieve(subscriptionId);
              await handleSubscriptionUpdated(subscription);
            }
          } catch (error) {
            console.error('Error processing invoice.payment_succeeded event:', error);
          }
          break;

        case 'invoice.payment_failed':
          // Handle failed invoice payment
          // You might want to notify the user or update the subscription status
          break;

        default:
          // Unexpected event type
          console.log(`Unhandled event type: ${event.type}`);
      }
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: `Webhook error: ${error.message}` },
      { status: 500 }
    );
  }
}

/**
 * Handle Stripe thin payload events (v2 API)
 */
async function handleThinPayloadEvent(event: any) {
  // Extract the event type and related object
  const eventType = event.type;
  const relatedObject = event.related_object || {};
  
  console.log(`Processing thin payload event: ${eventType}`);
  
  // Handle different event types
  switch (eventType) {
    case "financial_account.created":
    case "financial_account.updated":
      console.log(`Financial account event: ${eventType}`, relatedObject.id);
      break;
    case "outbound_payment.created":
    case "outbound_payment.updated":
      console.log(`Outbound payment event: ${eventType}`, relatedObject.id);
      break;
    case "outbound_payment.failed":
      console.log(`Outbound payment failed: ${relatedObject.id}`);
      break;
    case "outbound_payment.posted":
      console.log(`Outbound payment posted: ${relatedObject.id}`);
      break;
    case "received_payment.created":
    case "received_payment.updated":
      console.log(`Received payment event: ${eventType}`, relatedObject.id);
      break;
    default:
      console.log(`Unhandled thin payload event type: ${eventType}`);
  }
}
