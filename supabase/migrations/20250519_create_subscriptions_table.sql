-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  price_id TEXT,
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON public.subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON public.subscriptions(stripe_subscription_id);

-- Add Row Level Security (RLS)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to view only their own subscriptions
CREATE POLICY "Users can view their own subscriptions"
  ON public.subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow service role to manage all subscriptions (for webhook processing)
CREATE POLICY "Service role can manage all subscriptions"
  ON public.subscriptions
  USING (auth.role() = 'service_role');

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create subscription_status type for better type safety in TypeScript
CREATE TYPE public.subscription_status AS ENUM (
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'trialing',
  'unpaid'
);

-- Create subscription plans type
CREATE TYPE public.subscription_plan AS ENUM (
  'free',
  'basic',
  'pro',
  'enterprise'
);

-- Add subscription_plan column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS subscription_plan public.subscription_plan DEFAULT 'free'::public.subscription_plan;

-- Create function to update profile subscription plan when subscription changes
CREATE OR REPLACE FUNCTION public.update_profile_subscription_plan()
RETURNS TRIGGER AS $$
DECLARE
  plan_name public.subscription_plan;
BEGIN
  -- Determine the plan based on price_id
  -- This is a simplified example - you'll need to adjust based on your actual price IDs
  CASE
    WHEN NEW.price_id LIKE '%basic%' THEN plan_name := 'basic'::public.subscription_plan;
    WHEN NEW.price_id LIKE '%pro%' THEN plan_name := 'pro'::public.subscription_plan;
    WHEN NEW.price_id LIKE '%enterprise%' THEN plan_name := 'enterprise'::public.subscription_plan;
    ELSE plan_name := 'free'::public.subscription_plan;
  END CASE;

  -- Only update if status is active
  IF NEW.status = 'active' THEN
    UPDATE public.profiles
    SET subscription_plan = plan_name
    WHERE id = NEW.user_id;
  -- If subscription is no longer active, revert to free plan
  ELSIF OLD.status = 'active' AND NEW.status != 'active' THEN
    UPDATE public.profiles
    SET subscription_plan = 'free'::public.subscription_plan
    WHERE id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update profile subscription plan
CREATE TRIGGER update_profile_subscription_plan
AFTER INSERT OR UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_profile_subscription_plan();
