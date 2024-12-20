import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { Category } from '../../types';

interface CategorySelectProps {
  selectedCategories: { id: string; name: string }[];
  onCategoryChange: (categories: { id: string; name: string }[]) => void;
  categories: Category[];
}

export function CategorySelect({
  selectedCategories,
  onCategoryChange,
  categories
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="min-h-[42px] px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCategories.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(cat => (
              <span
                key={cat.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {cat.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCategoryChange(selectedCategories.filter(c => c.id !== cat.id));
                  }}
                  className="ml-1.5 text-primary-600 hover:text-primary-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">Select categories...</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2 max-h-60 overflow-y-auto">
            {categories.map(category => (
              <label
                key={category.id}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.some(cat => cat.id === category.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onCategoryChange([...selectedCategories, { id: category.id, name: category.label }]);
                    } else {
                      onCategoryChange(selectedCategories.filter(cat => cat.id !== category.id));
                    }
                  }}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{category.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
