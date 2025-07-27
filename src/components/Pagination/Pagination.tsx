import React from 'react';

import type { PaginationProps } from './types';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageNumbers,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border p-2 hover:bg-gray-100 disabled:opacity-50"
        aria-label="Previous page"
      >
        ←
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`rounded-lg border p-2 ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          } ${page === '...' ? 'cursor-default' : ''}`}
          disabled={page === '...'}
          aria-label={page === '...' ? 'More pages' : `Go to page ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border p-2 hover:bg-gray-100 disabled:opacity-50"
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
};
