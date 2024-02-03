import { Json } from './types_db';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export interface Meal {
  type: MealType;
  title: string | null;
  ingredients?: string[] | null;
  steps?: string[] | null;
  macros?: Macros | null;
}
export interface MealPlan {
  meals?: Meal[];
  id: string;
  owner: string | undefined;
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
interface Macros {
  protein: number;
  fat: number;
  carbs: number;
}
export interface UserDetails {
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
}
