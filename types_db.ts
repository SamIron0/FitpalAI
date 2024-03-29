import { GeoCoordinate, Macros, Meal } from './types';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customers_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
        };
        Update: {
          id: string;
          name: string;
          email: string;
        };
      };
      clicks: {
        Row: {
          id?: string;
          name: string;
          count: number;
        };
        Insert: {
          id?: string;
          name?: string;
          count?: number;
        };
        Update: {
          id?: string;
          nam?: string;
          count?: number;
        };
      };
      mealplans: {
        Row: {
          id: string;
          meals: Meal[] | null;
          owner: string;
        };
        Insert: {
          id: string;
          meals?: Meal[] | null;
          owner?: string;
        };
        Update: {
          id?: string;
          meals?: Meal[] | null;
          owner?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'mealplans_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };

      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database['public']['Enums']['pricing_plan_interval'] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database['public']['Enums']['pricing_type'] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?:
            | Database['public']['Enums']['pricing_plan_interval']
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database['public']['Enums']['pricing_type'] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?:
            | Database['public']['Enums']['pricing_plan_interval']
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database['public']['Enums']['pricing_type'] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'prices_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          price_id: string | null;
          quantity: number | null;
          status: Database['public']['Enums']['subscription_status'] | null;
          trial_end: string | null;
          trial_start: string | null;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database['public']['Enums']['subscription_status'] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database['public']['Enums']['subscription_status'] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_price_id_fkey';
            columns: ['price_id'];
            referencedRelation: 'prices';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscriptions_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };

      queries: {
        Row: {
          id: string;
          query: string;
          user_id: string;
          time: string;
        };
        Insert: {
          id: string;
          query?: string | null;
          user_id?: string | null;
          time: string;
        };
        Update: {
          id?: string;
          query?: string | null;
          user_id?: string | null;
          time: string;
        };
        Relationships: [
          {
            foreignKeyName: 'querys_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };

      users: {
        Row: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          full_name?: string | null;
          id?: string;
          address?: string | null;
          payment_method?: Json | null;
          geolocation?: GeoCoordinate | null;
          allergies?: string[] | null;
          bio?: string | null;
          goals?: string[] | null;
          height?: number | null;
          weight?: number | null;
          macros?: Macros | null;
          phone?: string | null;
          username?: string | null;
          age?: number | null;
          subscription?: Json | null;
          diet_type?: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          full_name?: string | null;
          id?: string;
          address?: string | null;
          payment_method?: Json | null;
          geolocation?: GeoCoordinate | null;
          allergies?: string[] | null;
          bio?: string | null;
          goals?: string[] | null;
          height?: number | null;
          weight?: number | null;
          macros?: Macros | null;
          phone?: string | null;
          username?: string | null;
          age?: number | null;
          subscription?: Json | null;
          diet_type?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          full_name?: string | null;
          id?: string;
          address?: string | null;
          payment_method?: Json | null;
          geolocation?: GeoCoordinate | null;
          allergies?: string[] | null;
          bio?: string | null;
          goals?: string[] | null;
          height?: number | null;
          weight?: number | null;
          macros?: Macros | null;
          phone?: string | null;
          username?: string | null;
          age?: number | null;
          subscription?: Json | null;
          diet_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      survey_responses: {
        Row: {
          id: string;
          user_id: string | null;
          response: Json | null;
        };
        Insert: {
          id: string;
          user_id?: string | null;
          response?: Json | null;
        };
        Update: {
          id: string;
          user_id?: string | null;
          response?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      pricing_plan_interval: 'day' | 'week' | 'month' | 'year';
      pricing_type: 'one_time' | 'recurring';
      subscription_status:
        | 'trialing'
        | 'active'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired'
        | 'past_due'
        | 'unpaid'
        | 'paused';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
