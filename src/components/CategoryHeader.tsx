import React from 'react';
import { styles } from '../theme';

interface CategoryHeaderProps {
  title: string;
  count?: number;
}

export function CategoryHeader({ title, count }: CategoryHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className={`${styles.heading.h2} text-gray-900`}>
        {title}
        {count !== undefined && (
          <span className="ml-2 text-sm text-gray-500">
            ({count})
          </span>
        )}
      </h2>
    </div>
  );
}
