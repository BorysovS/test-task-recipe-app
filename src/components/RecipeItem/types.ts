import type { Meal } from 'types';

export type RecipeItemProps = {
  recipe: Meal;
  isSelected: boolean;
  onToggleSelection: () => void;
};
