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
