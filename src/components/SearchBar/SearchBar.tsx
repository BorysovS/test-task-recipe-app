import React from 'react';

import type { SearchBarProps } from './types';

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search recipes..."
      className="w-full max-w-md rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={e => onSearch(e.target.value)}
      aria-label="Search recipes"
    />
  );
};
