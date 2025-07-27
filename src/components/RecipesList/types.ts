import type { Meal } from 'types';

export type RecipesListProps = {
  toggleRecipeSelection: (recipe: Meal) => void;
  selectedRecipes: Meal[];
};
