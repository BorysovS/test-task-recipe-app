import axios from 'axios';
import type { Meal } from '../types';

const baseUrl = 'https://www.themealdb.com/api/json/v1/1';

const mealApiService = {
  searchRecipes: async (search: string): Promise<Meal[]> => {
    const response = await axios.get(`${baseUrl}/search.php`, {
      params: { s: search },
    });
    return response.data.meals || [];
  },

  getCategories: async (): Promise<string[]> => {
    const response = await axios.get(`${baseUrl}/categories.php`);
    return response.data.categories.map(
      (cat: { strCategory: string }) => cat.strCategory,
    );
  },

  getRecipeById: async (id: string): Promise<Meal | null> => {
    const response = await axios.get(`${baseUrl}/lookup.php`, {
      params: { i: id },
    });
    return response.data.meals ? response.data.meals[0] : null;
  },
};

export { mealApiService };
