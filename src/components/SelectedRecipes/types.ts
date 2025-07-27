import type { Meal } from 'types';

export type SelectedRecipesProps = {
  selectedRecipes: Meal[];
  onRemoveRecipe: (recipe: Meal) => void;
};
export type Measure = {
  value: number;
  unit: string;
};

export type CombinedIngredient = {
  name: string;
  originalMeasures: string[];
};
