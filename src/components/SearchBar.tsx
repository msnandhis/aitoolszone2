import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useCallback(
    (value: string) => {
      onSearch(value);
    },
    [onSearch]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search AI tools by name, provider, or features..."
        value={searchQuery}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500
                 placeholder:text-gray-400"
      />
    </div>
  );
}
