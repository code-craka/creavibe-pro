import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createCheckoutSession } from '@/lib/stripe';
import { z } from 'zod';

// Schema for request validation
const checkoutSessionSchema = z.object({
  priceId: z.string().min(1),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

/**
 * API route to create a Stripe checkout session
 * This endpoint creates a checkout session and returns the session ID and URL
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
    const result = checkoutSessionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: result.error.format() },
        { status: 400 }
      );
    }

    const { priceId, successUrl, cancelUrl } = result.data;

    // Get the user's email for the Stripe customer
    const userId = session.user.id;
    const userEmail = session.user.email;

    // Create the checkout session
    const { sessionId, url } = await createCheckoutSession({
      priceId,
      userId,
      customerEmail: userEmail,
      successUrl,
      cancelUrl,
    });

    if (!sessionId || !url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      );
    }

    // Return the session ID and URL
    return NextResponse.json({ sessionId, url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: `Error creating checkout session: ${error.message}` },
      { status: 500 }
    );
  }
}
