import React, { useState } from 'react';

import type { Meal } from 'types';
import type { CombinedIngredient, SelectedRecipesProps } from './types';

const normalizeUnit = (unit: string): string => {
  const map: Record<string, string> = {
    tblsp: 'tbsp',
    tbs: 'tbsp',
    tbsp: 'tbsp',
    tablespoon: 'tbsp',
    tsp: 'tsp',
    teaspoons: 'tsp',
    handfull: 'handful',
    handful: 'handful',
    clove: 'clove',
    cloves: 'clove',
    stick: 'stick',
    sticks: 'stick',
    l: 'ml',
    litre: 'ml',
    large: 'large',
    medium: 'medium',
    small: 'small',
    unit: 'unit',
    can: 'can',
    finely: '',
    chopped: '',
    beaten: '',
    garnish: '',
    topping: '',
    sprinkling: '',
    to: '',
    taste: '',
  };
  return map[unit.toLowerCase()] || unit.toLowerCase();
};

const normalizeMeasure = (measure: string): string => {
  if (!measure?.trim()) return 'unknown measure';

  const parts = measure.trim().split(' ');
  const unit = parts.length > 1 ? parts.pop() : '';
  const value = parts.join(' ');
  const normalizedUnit = normalizeUnit(unit || '');
  return normalizedUnit
    ? `${value} ${normalizedUnit}`.trim()
    : value || 'unknown measure';
};

const combineMeasures = (
  existing: CombinedIngredient | undefined,
  newMeasure: string,
  ingredient: string,
): CombinedIngredient => {
  const normalizedMeasure = normalizeMeasure(newMeasure);

  if (!existing) {
    return {
      name: ingredient,
      originalMeasures: [normalizedMeasure],
    };
  }

  return {
    ...existing,
    originalMeasures: [...existing.originalMeasures, normalizedMeasure],
  };
};

const SelectedRecipes: React.FC<SelectedRecipesProps> = ({
  selectedRecipes,
  onRemoveRecipe,
}) => {
  const [expandedRecipes, setExpandedRecipes] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedRecipes(prev =>
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id],
    );
  };

  const { combinedIngredients, totalIngredients } = selectedRecipes.reduce(
    (acc, recipe) => {
      Array.from({ length: 20 }, (_, i) => {
        const ingredient = recipe[
          `strIngredient${i + 1}` as keyof Meal
        ] as string;

        const measure = recipe[`strMeasure${i + 1}` as keyof Meal] as string;

        if (ingredient?.trim()) {
          const key = ingredient.toLowerCase();

          acc.combinedIngredients[key] = combineMeasures(
            acc.combinedIngredients[key],
            measure,
            ingredient,
          );

          acc.totalIngredients.add(key);
        }
      });
      return acc;
    },
    {
      combinedIngredients: {} as Record<string, CombinedIngredient>,
      totalIngredients: new Set<string>(),
    },
  );

  const downloadShoppingList = () => {
    const content = Object.entries(combinedIngredients)
      .map(([_, item]) => `${item.name}: ${item.originalMeasures.join(' + ')}`)
      .join('\n');

    const blob = new Blob(
      [`Total unique ingredients: ${totalIngredients.size}\n\n${content}`],
      { type: 'text/plain' },
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;
    a.download = 'shopping-list.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

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
        <h2 className="text-xl font-semibold">Your Shopping List</h2>

        <ul className="mt-4 list-disc space-y-1 pl-5">
          {Object.entries(combinedIngredients).map(([key, item]) => (
            <li key={key} className="text-gray-700">
              <strong>{item.name}:</strong> {item.originalMeasures.join(' + ')}
            </li>
          ))}
        </ul>

        <p className="text-gray-600">
          Total unique ingredients: {totalIngredients.size}
        </p>

        <button
          onClick={downloadShoppingList}
          className="mt-4 rounded-lg bg-blue-500 p-2 text-white transition hover:opacity-90"
        >
          Download Shopping List
        </button>
      </div>
    </div>
  );
};

export { SelectedRecipes };
