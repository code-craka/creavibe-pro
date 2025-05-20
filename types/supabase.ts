export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          bio: string | null
          subscription_plan: Database['public']['Enums']['subscription_plan'] | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
          subscription_plan?: Database['public']['Enums']['subscription_plan'] | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
          subscription_plan?: Database['public']['Enums']['subscription_plan'] | null
        }
      }
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          user_id?: string
        }
      },
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          price_id: string | null
          status: string
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          price_id?: string | null
          status: string
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          price_id?: string | null
          status?: string
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid'
      subscription_plan: 'free' | 'basic' | 'pro' | 'enterprise'
    }
  }
}
