import React from 'react';
import { Link } from 'react-router-dom';

import type { NavbarProps } from './types';

export const Navbar: React.FC<NavbarProps> = ({ selectedRecipesCount }) => {
  return (
    <nav className="sticky top-0 z-10 bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Recipe App
        </Link>

        <div className="space-x-4">
          <Link
            to="/"
            className="hover:underline"
            aria-label="View all recipes"
          >
            Recipes
          </Link>
          <Link
            to="/selected"
            className="hover:underline"
            aria-label="View selected recipes"
          >
            Selected ({selectedRecipesCount})
          </Link>
        </div>
      </div>
    </nav>
  );
};
