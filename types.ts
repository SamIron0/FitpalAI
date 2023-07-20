
export interface Meal{
  meal: string | null,
  item: string | null,
  calories: number | null
}
export interface MealPlan{
  [day: string]: { // day1, day2, ...
    breakfast: {
      item: string;
      calories: string;
    };
    lunch: {
      item: string;
      calories: string;
    };
    dinner: {
      item: string;
      calories: string;
    };
    snack: {
      item: string;
      calories: string;
    };
    totalCalories: string;
  };
}

export interface MealPlans {
  day1: Meal[],
  day2: Meal[],
  day3: Meal[],
  day4: Meal[],
  day5: Meal[],
}
