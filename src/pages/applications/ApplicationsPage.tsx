import React, { useState, useEffect } from 'react';
import { MainLayout } from '../../shared/layouts/MainLayout';
import { CategorySection } from '../../components/CategorySection';
import { CategoryFilter } from '../../components/CategoryFilter';
import { SearchBar } from '../../components/SearchBar';
import { fetchApplications } from '../../services/api';
import { styles } from '../../theme';
import type { Application } from '../../types';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadApplications();
    // Update page title and meta description
    document.title = 'AiToolsZone - Best AI Tools Directory and Comprehensive List';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Discover the best AI tools with AiToolsZone. Explore our comprehensive directory and find top-rated AI solutions for any task.'
      );
    }
  }, []);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const response = await fetchApplications(selectedCategory || undefined);
      setApplications(response.data || []);
    } catch (error) {
      console.error('Error loading applications:', error);
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter applications based on search query
  const filteredApplications = applications.filter(application => {
    const matchesSearch = !searchQuery || 
      application.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <MainLayout>
      {/* Search Section */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className={`${styles.container} py-4`}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Applications Section */}
      <div className="bg-gray-50">
        <div className={`${styles.container} py-8`}>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-r-2 border-primary-500" />
            </div>
          ) : filteredApplications.length > 0 ? (
            <CategorySection
              applications={filteredApplications}
            />
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
              <p className="text-gray-600">Try adjusting your search query or category filter</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
