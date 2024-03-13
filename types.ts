import { Json } from './types_db';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export interface Meal {
  type: MealType;
  foods: string[] | null;
  ingredients?: string[] | null;
  instructions?: string[] | null;
  macros?: Macros | null;
}
export interface MealPlan {
  meals: Meal[];
  id: string;
  owner: string | undefined;
  date: Date | undefined;
  macros: Macros;
}

export interface Query {
  id: string;
  query: string;
  user_id: string;
 
}
export interface SurveyResponse {
  id: string;
  user_id: string;
  response: Json;
}

export interface GeoCoordinate {
  lat: number;
  lon: number;
}
export interface Macros {
  protein: number;
  fat: number;
  carbs: number;
  total_calories: number;
}

type Jsonb = any;

export interface UserDetails {
  avatar_url?: string | null;
  billing_address?: Jsonb | null;
  full_name?: string | null;
  id?: string;
  address?: string | null;
  payment_method?: Jsonb | null;
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
  subscription?: Jsonb | null;
  diet_type?: string | null;
}
