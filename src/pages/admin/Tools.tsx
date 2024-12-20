import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { AdminLayout } from './AdminLayout';
import { styles } from '../../theme';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Save,
  X
} from 'lucide-react';
import type { Application, Category } from '../../types';
import { fetchCategories } from '../../services/api';
import { LogoUpload } from '../../components/admin/LogoUpload';
import { CategorySelect } from '../../components/admin/CategorySelect';
import { Pagination } from '../../components/Pagination';

interface FormData {
  name: string;
  description: string;
  url: string;
  provider: string;
  categories: { id: string; name: string }[];
  logo: string;
  badge: Application['badge'];
}

const Tools = React.memo(() => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [logoUploadType, setLogoUploadType] = useState<'url' | 'file'>('url');
  const [selectedCategories, setSelectedCategories] = useState<{ id: string; name: string }[]>([]);
  const [logoUrl, setLogoUrl] = useState('');
  const itemsPerPage = 10;

  // Use refs for form data
  const formData = useRef<FormData>({
    name: '',
    description: '',
    url: '',
    provider: '',
    categories: [],
    logo: '',
    badge: null
  });

  // Form input refs
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const providerRef = useRef<HTMLInputElement>(null);
  const badgeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (editingApp) {
      const data = {
        name: editingApp.name,
        description: editingApp.description,
        url: editingApp.url,
        provider: editingApp.provider,
        categories: editingApp.categories,
        logo: editingApp.logo || '',
        badge: editingApp.badge
      };
      formData.current = data;
      setSelectedCategories(data.categories);
      setLogoUrl(data.logo);
      
      // Update input values
      if (nameRef.current) nameRef.current.value = editingApp.name;
      if (descriptionRef.current) descriptionRef.current.value = editingApp.description;
      if (urlRef.current) urlRef.current.value = editingApp.url;
      if (providerRef.current) providerRef.current.value = editingApp.provider;
      if (badgeRef.current) badgeRef.current.value = editingApp.badge || '';
    }
  }, [editingApp]);

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

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = useMemo(() => {
    return filteredApplications.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredApplications, startIndex, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    }
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value || null);
  }, []);

  const handleAddTool = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const newTool: Application = {
      id: `app_${Date.now()}`,
      name: formData.current.name,
      provider: formData.current.provider,
      description: formData.current.description,
      url: formData.current.url,
      categories: formData.current.categories,
      logo: formData.current.logo,
      badge: formData.current.badge,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setApplications(prev => [...prev, newTool]);
    setShowAddModal(false);
    resetForm();
  }, []);

  const handleUpdateTool = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;
    setApplications(prev => prev.map(app =>
      app.id === editingApp.id
        ? {
            ...app,
            name: formData.current.name,
            provider: formData.current.provider,
            description: formData.current.description,
            url: formData.current.url,
            categories: formData.current.categories,
            logo: formData.current.logo,
            badge: formData.current.badge,
            updated_at: new Date().toISOString()
          }
        : app
    ));
    setEditingApp(null);
    resetForm();
  }, [editingApp]);

  const handleDeleteTool = useCallback((appId: string) => {
    setApplications(prev => prev.filter(app => app.id !== appId));
  }, []);

  const resetForm = useCallback(() => {
    const emptyData = {
      name: '',
      description: '',
      url: '',
      provider: '',
      categories: [],
      logo: '',
      badge: null
    };
    formData.current = emptyData;
    setSelectedCategories([]);
    setLogoUrl('');
    
    // Reset input values
    if (nameRef.current) nameRef.current.value = '';
    if (descriptionRef.current) descriptionRef.current.value = '';
    if (urlRef.current) urlRef.current.value = '';
    if (providerRef.current) providerRef.current.value = '';
    if (badgeRef.current) badgeRef.current.value = '';
    
    setLogoUploadType('url');
  }, []);

  const handleModalClose = useCallback(() => {
    setShowAddModal(false);
    setEditingApp(null);
    resetForm();
  }, [resetForm]);

  const handleEditTool = useCallback((app: Application) => {
    setEditingApp(app);
  }, []);

  const ToolModal = React.memo(({ isEdit = false }: { isEdit?: boolean }) => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleModalClose}
    >
      <div 
        className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display font-bold text-gray-900">
            {isEdit ? 'Edit Tool' : 'Add New Tool'}
          </h2>
          <button
            type="button"
            onClick={handleModalClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={isEdit ? handleUpdateTool : handleAddTool} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Tool Name
              </label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                name="name"
                required
                onChange={(e) => formData.current.name = e.target.value}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
                Provider
              </label>
              <input
                ref={providerRef}
                type="text"
                id="provider"
                name="provider"
                required
                onChange={(e) => formData.current.provider = e.target.value}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                placeholder="e.g., OpenAI, Google, Meta"
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                ref={urlRef}
                type="url"
                id="url"
                name="url"
                required
                onChange={(e) => formData.current.url = e.target.value}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="badge" className="block text-sm font-medium text-gray-700 mb-1">
                Badge
              </label>
              <select
                ref={badgeRef}
                id="badge"
                name="badge"
                onChange={(e) => formData.current.badge = e.target.value as Application['badge']}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              >
                <option value="">No Badge</option>
                <option value="featured">Featured</option>
                <option value="top">Top</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categories
              </label>
              <CategorySelect
                selectedCategories={selectedCategories}
                onCategoryChange={(categories) => {
                  setSelectedCategories(categories);
                  formData.current.categories = categories;
                }}
                categories={categories}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo
              </label>
              <LogoUpload
                logoUrl={logoUrl}
                onLogoChange={(logo) => {
                  setLogoUrl(logo);
                  formData.current.logo = logo;
                }}
                logoUploadType={logoUploadType}
                setLogoUploadType={setLogoUploadType}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                ref={descriptionRef}
                id="description"
                name="description"
                required
                rows={3}
                onChange={(e) => formData.current.description = e.target.value}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleModalClose}
              className={`${styles.button.base} ${styles.button.secondary} ${styles.button.sizes.md}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.md}
                         flex items-center gap-2`}
            >
              <Save className="w-4 h-4" />
              {isEdit ? 'Update Tool' : 'Add Tool'}
            </button>
          </div>
        </form>
      </div>
    </div>
  ));

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
            <h3 className="font-medium text-gray-900">
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
          <p className="text-sm text-gray-500 mt-1">
            {app.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span>{app.provider}</span>
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
            onClick={() => setShowAddModal(true)}
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
      {(showAddModal || editingApp) && (
        <ToolModal isEdit={!!editingApp} />
      )}
    </AdminLayout>
  );
});

Tools.displayName = 'Tools';

export default Tools;
