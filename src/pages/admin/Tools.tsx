import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AdminLayout } from './AdminLayout';
import { styles } from '../../theme';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import type { Application, Category } from '../../types';
import { fetchCategories, fetchApplications, createApplication, updateApplication, deleteApplication } from '../../services/api';
import { ToolModal } from '../../components/admin/ToolModal';
import { Pagination } from '../../components/Pagination';

const ITEMS_PER_PAGE = 10;

type Badge = 'featured' | 'top' | null;

interface FormData {
  name: string;
  description: string;
  url: string;
  provider: string;
  categories: { id: string; name: string }[];
  logo: string;
  badge: Badge;
}

const emptyFormData: FormData = {
  name: '',
  description: '',
  url: '',
  provider: '',
  categories: [],
  logo: '',
  badge: null
};

const Tools = React.memo(() => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [appsResponse, categoriesResponse] = await Promise.all([
          fetchApplications(),
          fetchCategories()
        ]);
        setApplications(appsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value || null);
  }, []);

  const handleAddTool = useCallback(async (formData: FormData) => {
    try {
      const response = await createApplication(formData);
      setApplications(prev => [...prev, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating tool:', error);
    }
  }, []);

  const handleUpdateTool = useCallback(async (formData: FormData) => {
    if (!editingApp) return;
    try {
      const response = await updateApplication(editingApp.id, formData);
      setApplications(prev => prev.map(app =>
        app.id === editingApp.id ? response.data : app
      ));
      setEditingApp(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating tool:', error);
    }
  }, [editingApp]);

  const handleDeleteTool = useCallback(async (appId: string) => {
    try {
      await deleteApplication(appId);
      setApplications(prev => prev.filter(app => app.id !== appId));
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  }, []);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    setEditingApp(null);
  }, []);

  const handleEditTool = useCallback((app: Application) => {
    setEditingApp(app);
    setShowModal(true);
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = searchQuery
        ? app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.provider.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      const matchesCategory = selectedCategory
        ? app.categories.some(cat => cat.id === selectedCategory)
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [applications, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApplications = useMemo(() => {
    return filteredApplications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredApplications, startIndex]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const TableRow = React.memo(({ app }: { app: Application }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100">
            {app.logo ? (
              <img
                src={app.logo}
                alt={app.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random`;
                }}
              />
            ) : (
              <span className="text-xl font-bold text-gray-400">
                {app.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-medium text-gray-900 truncate">
              {app.name}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {app.description}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600">{app.provider}</td>
      <td className="px-6 py-4">
        {app.badge && (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                         ${app.badge === 'featured' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
            {app.badge === 'featured' ? '⭐ Featured' : '🔥 Top'}
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-right text-gray-600">
        {app.views.toLocaleString()}
      </td>
      <td className="px-6 py-4 text-gray-600">
        {new Date(app.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleEditTool(app)}
            className="text-gray-400 hover:text-gray-600"
            title="Edit"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600"
            title="View"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <button
            onClick={() => handleDeleteTool(app.id)}
            className="text-gray-400 hover:text-red-600"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  ));

  TableRow.displayName = 'TableRow';

  const CardView = React.memo(({ app }: { app: Application }) => (
    <div className="p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 flex items-center justify-center border border-gray-100">
          {app.logo ? (
            <img
              src={app.logo}
              alt={app.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random`;
              }}
            />
          ) : (
            <span className="text-xl font-bold text-gray-400">
              {app.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-gray-900 break-words">
              {app.name}
            </h3>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => handleEditTool(app)}
                className="text-gray-400 hover:text-gray-600"
                title="Edit"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
                title="View"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <button
                onClick={() => handleDeleteTool(app.id)}
                className="text-gray-400 hover:text-red-600"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1 break-words">
            {app.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span className="break-words">{app.provider}</span>
            {app.badge && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                             ${app.badge === 'featured' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                {app.badge === 'featured' ? '⭐ Featured' : '🔥 Top'}
              </span>
            )}
            <span>•</span>
            <span>{app.views.toLocaleString()} views</span>
            <span>•</span>
            <span>{new Date(app.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  ));

  CardView.displayName = 'CardView';

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-0">
          <div>
            <h1 className={`${styles.heading.h1} text-gray-900 mb-2`}>
              Tools
            </h1>
            <p className="text-base lg:text-lg text-gray-600">
              Manage your AI tools directory.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.md}
                       flex items-center justify-center gap-2 w-full sm:w-auto`}
          >
            <Plus className="w-5 h-5" />
            Add Tool
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="sm:w-48">
              <select
                value={selectedCategory || ''}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tools List/Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : paginatedApplications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No tools found</div>
          ) : (
            <>
              {/* Mobile View */}
              <div className="block lg:hidden divide-y divide-gray-200">
                {paginatedApplications.map((app) => (
                  <CardView key={app.id} app={app} />
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left text-sm font-medium text-gray-500 px-6 py-3 w-[30%]">Name</th>
                      <th className="text-left text-sm font-medium text-gray-500 px-6 py-3 w-[17.5%]">Provider</th>
                      <th className="text-left text-sm font-medium text-gray-500 px-6 py-3 w-[17.5%]">Badge</th>
                      <th className="text-right text-sm font-medium text-gray-500 px-6 py-3 w-[12.5%]">Views</th>
                      <th className="text-left text-sm font-medium text-gray-500 px-6 py-3 w-[12.5%]">Added</th>
                      <th className="text-right text-sm font-medium text-gray-500 px-6 py-3 w-[10%]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedApplications.map((app) => (
                      <TableRow key={app.id} app={app} />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo(0, 0);
              }}
            />
          </div>
        )}
      </div>

      {/* Add/Edit Tool Modal */}
      {showModal && (
        <ToolModal
          isEdit={!!editingApp}
          initialData={editingApp ? {
            name: editingApp.name,
            description: editingApp.description,
            url: editingApp.url,
            provider: editingApp.provider,
            categories: editingApp.categories,
            logo: editingApp.logo || '',
            badge: editingApp.badge
          } : emptyFormData}
          onSubmit={editingApp ? handleUpdateTool : handleAddTool}
          onClose={handleModalClose}
          categories={categories}
        />
      )}
    </AdminLayout>
  );
});

Tools.displayName = 'Tools';

export default Tools;
