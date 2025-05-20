export type SubscriptionStatus = 
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid';

export type SubscriptionPlan = 
  | 'free'
  | 'basic'
  | 'pro'
  | 'enterprise';

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  price_id: string | null;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionWithPrice extends Subscription {
  plan: SubscriptionPlan;
  price: number;
  currency: string;
  interval: 'month' | 'year';
}

export interface PriceWithProduct {
  id: string;
  product_id: string;
  active: boolean;
  description: string | null;
  unit_amount: number;
  currency: string;
  type: string;
  interval: 'month' | 'year' | null;
  interval_count: number | null;
  trial_period_days: number | null;
  metadata: Record<string, string>;
  product: {
    id: string;
    active: boolean;
    name: string;
    description: string | null;
    metadata: Record<string, string>;
  };
}

export interface SubscriptionWithPriceAndProduct extends Subscription {
  price: PriceWithProduct | null;
}

export interface CreateCheckoutSessionParams {
  priceId: string;
  userId: string;
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CreateBillingPortalSessionParams {
  customerId: string;
  returnUrl?: string;
}

export interface StripeEvent {
  id: string;
  object: string;
  api_version: string | null;
  created: number;
  data: {
    object: any;
  };
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string | null;
    idempotency_key: string | null;
  };
  type: string;
}
