import React from 'react';

import type { ErrorMessageProps } from './types';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="rounded-lg bg-red-100 p-4 text-center text-red-700">
      {message}
    </div>
  );
};
