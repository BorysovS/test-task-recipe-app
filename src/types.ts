export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube?: string;
  strSource?: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};

export type Ingredient = {
  name: string;
  measure: string;
};

export type ApiResponse = {
  meals: Meal[] | null;
};
