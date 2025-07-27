import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RecipesList } from './components/RecipesList/RecipesList';
import { RecipeDetail } from './components/RecipeDetail/RecipeDetail';
import { SelectedRecipes } from './components/SelectedRecipes/SelectedRecipes';
import { Navbar } from './components/Navbar/Navbar';

import type { Meal } from './types';

const App: React.FC = () => {
  const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);

  const toggleRecipeSelection = useCallback((recipe: Meal) => {
    setSelectedRecipes(prev =>
      prev.some(r => r.idMeal === recipe.idMeal)
        ? prev.filter(r => r.idMeal !== recipe.idMeal)
        : [...prev, recipe],
    );
  }, []);

  const removeRecipe = useCallback((recipe: Meal) => {
    setSelectedRecipes(prev => prev.filter(r => r.idMeal !== recipe.idMeal));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar selectedRecipesCount={selectedRecipes.length} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <RecipesList
                toggleRecipeSelection={toggleRecipeSelection}
                selectedRecipes={selectedRecipes}
              />
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route
            path="/selected"
            element={
              <SelectedRecipes
                selectedRecipes={selectedRecipes}
                onRemoveRecipe={removeRecipe}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export { App };
