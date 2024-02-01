import { Json } from './types_db';

export interface Meal {
  title: string | null;
  ingredients: string[] | null;
  steps?: string[] | null;
  calories: number | null;
}
export interface MealPlan {
  meals: Meal[];
  id: string;
  owner: string | null;
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
export interface UserDetails {
  avatar_url: string | null;
  billing_address: Json | null;
  full_name: string | null;
  id: string;
  address: string | null;
  payment_method: Json | null;
  geolocation?: GeoCoordinate | null;
  allergies: string[] | null;
  bio?: string | null;
  goals?: string[] | null;
  height?: number | null;
  weight?: number | null;
  macros?: Json | null;
  phone?: string | null;
  username?: string | null;
  subscription?: Json | null;
  
}
