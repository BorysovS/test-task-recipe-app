import React, { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';

import { CategoryFilter } from '@components/CategoryFilter';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { ErrorMessage } from '@components/ErrorMessage';
import { SearchBar } from '@components/SearchBar';
import { RecipeItem } from '@components/RecipeItem';
import { Pagination } from '@components/Pagination';

import { mealApiService } from '@services/mealApiService';

import type { RecipesListProps } from './types';

export const RecipesList: React.FC<RecipesListProps> = ({
  toggleRecipeSelection,
  selectedRecipes,
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const {
    data: recipes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['recipes', search],
    queryFn: () => mealApiService.searchRecipes(search),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: mealApiService.getCategories,
  });

  console.log('data', recipes);

  const filteredRecipes = useMemo(
    () =>
      category
        ? recipes.filter(recipe => recipe.strCategory === category)
        : recipes,
    [recipes, category],
  );

  const paginatedRecipes = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredRecipes.slice(start, start + itemsPerPage);
  }, [filteredRecipes, page]);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  const getPageNumbers = useMemo(() => {
    return () => {
      if (totalPages <= 10) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      if (page <= 4) {
        return [1, 2, 3, 4, 5, 6, 7, '...', totalPages];
      }
      if (page >= totalPages - 3) {
        return [
          1,
          '...',
          totalPages - 6,
          totalPages - 5,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }
      return [
        1,
        '...',
        page - 2,
        page - 1,
        page,
        page + 1,
        page + 2,
        '...',
        totalPages,
      ];
    };
  }, [totalPages, page]);

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
      setPage(1);
    }, 500),
    [setSearch],
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value);
      setPage(1);
    },
    [setCategory],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
    },
    [setPage],
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Error loading recipes" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedRecipes.map(recipe => (
          <RecipeItem
            key={recipe.idMeal}
            recipe={recipe}
            isSelected={selectedRecipes.some(r => r.idMeal === recipe.idMeal)}
            onToggleSelection={() => toggleRecipeSelection(recipe)}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          pageNumbers={getPageNumbers()}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
