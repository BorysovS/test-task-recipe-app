import React, { useState } from 'react';

import type { Measure, SelectedRecipesProps } from './types';
import type { Meal } from 'types';

const parseMeasure = (measure: string): Measure | null => {
  if (!measure?.trim()) return null;
  const match = measure.trim().match(/^(\d*\.?\d+\/?\d*)\s*(\w*)$/);
  if (!match) return null;

  const [, valueStr, unit] = match;
  let value: number;

  if (valueStr.includes('/')) {
    const [numerator, denominator] = valueStr.split('/').map(Number);
    value = denominator ? numerator / denominator : numerator;
  } else {
    value = Number(valueStr);
  }

  return { value, unit: unit || '' };
};

const combineMeasures = (
  existing: string | undefined,
  newMeasure: string,
  ingredient: string,
): string => {
  const parsedNew = parseMeasure(newMeasure);
  if (!parsedNew) return existing || `${newMeasure.trim()} ${ingredient}`;

  if (!existing) return `${parsedNew.value} ${parsedNew.unit} ${ingredient}`;

  const parsedExisting = parseMeasure(existing);
  if (!parsedExisting || parsedExisting.unit !== parsedNew.unit) {
    return `${existing}, ${newMeasure.trim()} ${ingredient}`;
  }

  const totalValue = parsedExisting.value + parsedNew.value;
  return `${totalValue} ${parsedNew.unit} ${ingredient}`;
};

export const SelectedRecipes: React.FC<SelectedRecipesProps> = ({
  selectedRecipes,
  onRemoveRecipe,
}) => {
  const [expandedRecipes, setExpandedRecipes] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedRecipes(prev =>
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id],
    );
  };

  const combinedIngredients = selectedRecipes.reduce(
    (acc, recipe) => {
      Array.from({ length: 20 }, (_, i) => {
        const ingredient = recipe[
          `strIngredient${i + 1}` as keyof Meal
        ] as string;

        const measure = recipe[`strMeasure${i + 1}` as keyof Meal] as string;

        if (ingredient?.trim()) {
          const key = ingredient.toLowerCase();

          acc[key] = combineMeasures(acc[key], measure, ingredient);
        }
      });
      return acc;
    },
    {} as Record<string, string>,
  );

  if (selectedRecipes.length === 0) {
    return (
      <div className="text-center text-gray-600">No recipes selected yet.</div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Selected Recipes</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {selectedRecipes.map(recipe => (
          <div
            key={recipe.idMeal}
            className="rounded-lg border bg-white p-4 shadow transition hover:shadow-lg"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="mb-4 h-48 w-full rounded-lg object-cover"
              loading="lazy"
            />
            <h3 className="text-xl font-bold">{recipe.strMeal}</h3>
            <p className="text-gray-600">Category: {recipe.strCategory}</p>
            <p className="text-gray-600">Origin: {recipe.strArea}</p>
            <button
              onClick={() => toggleExpand(recipe.idMeal)}
              className="mt-2 text-blue-500 hover:underline"
            >
              {expandedRecipes.includes(recipe.idMeal)
                ? 'Hide Instructions'
                : 'Show Instructions'}
            </button>
            {expandedRecipes.includes(recipe.idMeal) && (
              <p className="mt-2 whitespace-pre-wrap text-gray-700">
                {recipe.strInstructions}
              </p>
            )}
            <button
              onClick={() => onRemoveRecipe(recipe)}
              className="mt-4 w-full rounded-lg bg-red-500 p-2 text-white transition hover:opacity-90"
              aria-label={`Remove ${recipe.strMeal} from selected`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold">Combined Ingredients</h2>
        <ul className="list-disc pl-5">
          {Object.values(combinedIngredients).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
