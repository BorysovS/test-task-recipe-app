import React from 'react';
import { Link } from 'react-router-dom';

import type { RecipeItemProps } from './types';

export const RecipeItem: React.FC<RecipeItemProps> = ({
  recipe,
  isSelected,
  onToggleSelection,
}) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow transition hover:shadow-lg">
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="mb-4 h-48 w-full rounded-lg object-cover"
          loading="lazy"
        />
        <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
      </Link>
      <p className="text-gray-600">Category: {recipe.strCategory}</p>
      <p className="text-gray-600">Origin: {recipe.strArea}</p>
      <button
        onClick={onToggleSelection}
        className={`mt-4 w-full rounded-lg p-2 ${
          isSelected ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        } transition hover:opacity-90`}
        aria-label={`${isSelected ? 'Remove' : 'Select'} ${recipe.strMeal}`}
      >
        {isSelected ? 'Remove' : 'Select'}
      </button>
    </div>
  );
};
