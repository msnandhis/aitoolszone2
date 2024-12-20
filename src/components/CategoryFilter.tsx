import React from 'react';
import { fetchCategories } from '../services/api';
import { useEffect, useState } from 'react';
import type { Category } from '../types';
import { styles } from '../theme';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    }
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200 overflow-hidden">
      <div className={`${styles.container} py-4`}>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onSelectCategory(null)}
            className={`
              flex-none rounded-full px-4 py-1.5 text-sm font-medium
              transition-colors duration-200
              ${!selectedCategory
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                flex-none rounded-full px-4 py-1.5 text-sm font-medium
                transition-colors duration-200
                ${selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {category.label}
              {category.total_applications > 0 && (
                <span className="ml-2 text-xs">
                  ({category.total_applications})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
