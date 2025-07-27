import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { LoadingSpinner } from '@components/LoadingSpinner';
import { ErrorMessage } from '@components/ErrorMessage';

import { mealApiService } from '@services/mealApiService';

import type { Meal } from 'types';

export const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => mealApiService.getRecipeById(id!),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !recipe) return <ErrorMessage message="Recipe not found" />;

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = recipe[`strIngredient${i + 1}` as keyof Meal] as string;
    const measure = recipe[`strMeasure${i + 1}` as keyof Meal] as string;
    return ingredient ? `${measure} ${ingredient}`.trim() : null;
  }).filter(Boolean);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="h-64 w-full rounded-lg object-cover"
        loading="lazy"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">Details</h2>
          <p>Category: {recipe.strCategory}</p>
          <p>Origin: {recipe.strArea}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <ul className="list-disc pl-5">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Instructions</h2>
        <p className="whitespace-pre-wrap">{recipe.strInstructions}</p>
      </div>

      {recipe.strYoutube && (
        <div>
          <h2 className="text-xl font-semibold">Video</h2>
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Watch on YouTube
          </a>
        </div>
      )}

      {recipe.strSource && (
        <div>
          <h2 className="text-xl font-semibold">Source</h2>
          <a
            href={recipe.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Source
          </a>
        </div>
      )}
    </div>
  );
};
