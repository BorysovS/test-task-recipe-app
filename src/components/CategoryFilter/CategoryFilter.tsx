import React from 'react';

import type { CategoryFilterProps } from './types';

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <select
      value={selectedCategory}
      onChange={e => onCategoryChange(e.target.value)}
      className="rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      aria-label="Select recipe category"
    >
      <option value="">All Categories</option>
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};
