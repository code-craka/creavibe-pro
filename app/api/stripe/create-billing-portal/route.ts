import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createBillingPortalSession } from '@/lib/stripe';
import { getUserSubscription } from '@/lib/subscription-service';
import { z } from 'zod';

// Schema for request validation
const billingPortalSchema = z.object({
  returnUrl: z.string().url().optional(),
});

/**
 * API route to create a Stripe billing portal session
 * This endpoint creates a billing portal session and returns the URL
 */
export async function POST(req: NextRequest) {
  try {
    // Get the current user from Supabase
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse and validate the request body
    const body = await req.json();
    const result = billingPortalSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: result.error.format() },
        { status: 400 }
      );
    }

    const { returnUrl } = result.data;
    const userId = session.user.id;

    // Get the user's subscription to find their Stripe customer ID
    const subscription = await getUserSubscription(userId);

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No subscription found for this user' },
        { status: 404 }
      );
    }

    // Create the billing portal session
    const { url } = await createBillingPortalSession({
      customerId: subscription.stripe_customer_id,
      returnUrl,
    });

    if (!url) {
      return NextResponse.json(
        { error: 'Failed to create billing portal session' },
        { status: 500 }
      );
    }

    // Return the billing portal URL
    return NextResponse.json({ url });
  } catch (error: any) {
    console.error('Error creating billing portal session:', error);
    return NextResponse.json(
      { error: `Error creating billing portal session: ${error.message}` },
      { status: 500 }
    );
  }
}
