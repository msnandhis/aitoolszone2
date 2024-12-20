import React, { useState, useEffect } from 'react';
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

interface FormData {
  name: string;
  description: string;
  url: string;
  provider: string;
  categories: { id: string; name: string }[];
  logo: string;
  badge: Application['badge'];
}

export default function Tools() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    url: '',
    provider: '',
    categories: [],
    logo: '',
    badge: null
  });
  const [logoUploadType, setLogoUploadType] = useState<'url' | 'file'>('url');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    const newTool: Application = {
      id: `app_${Date.now()}`,
      name: formData.name,
      provider: formData.provider,
      description: formData.description,
      url: formData.url,
      categories: formData.categories,
      logo: formData.logo,
      badge: formData.badge,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setApplications([...applications, newTool]);
    setShowAddModal(false);
    resetForm();
  };

  const handleUpdateTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;
    setApplications(applications.map(app =>
      app.id === editingApp.id
        ? {
            ...app,
            name: formData.name,
            provider: formData.provider,
            description: formData.description,
            url: formData.url,
            categories: formData.categories,
            logo: formData.logo,
            badge: formData.badge,
            updated_at: new Date().toISOString()
          }
        : app
    ));
    setEditingApp(null);
    resetForm();
  };

  const handleDeleteTool = (appId: string) => {
    setApplications(applications.filter(app => app.id !== appId));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      url: '',
      provider: '',
      categories: [],
      logo: '',
      badge: null
    });
    setLogoUploadType('url');
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setEditingApp(null);
    resetForm();
  };

  const ToolModal = ({ isEdit = false }: { isEdit?: boolean }) => (
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
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
                Provider
              </label>
              <input
                type="text"
                id="provider"
                name="provider"
                value={formData.provider}
                onChange={handleInputChange}
                required
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
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="badge" className="block text-sm font-medium text-gray-700 mb-1">
                Badge
              </label>
              <select
                id="badge"
                name="badge"
                value={formData.badge || ''}
                onChange={handleInputChange}
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
                selectedCategories={formData.categories}
                onCategoryChange={(categories) => setFormData(prev => ({ ...prev, categories }))}
                categories={categories}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo
              </label>
              <LogoUpload
                logoUrl={formData.logo}
                onLogoChange={(logo) => setFormData(prev => ({ ...prev, logo }))}
                logoUploadType={logoUploadType}
                setLogoUploadType={setLogoUploadType}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
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
  );

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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="sm:w-48">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
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

        {/* Tools Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-sm font-medium text-gray-500 px-4 sm:px-6 py-3">Name</th>
                  <th className="text-left text-sm font-medium text-gray-500 px-4 sm:px-6 py-3 hidden sm:table-cell">Provider</th>
                  <th className="text-left text-sm font-medium text-gray-500 px-4 sm:px-6 py-3 hidden md:table-cell">Badge</th>
                  <th className="text-right text-sm font-medium text-gray-500 px-4 sm:px-6 py-3 hidden lg:table-cell">Views</th>
                  <th className="text-left text-sm font-medium text-gray-500 px-4 sm:px-6 py-3 hidden md:table-cell">Added</th>
                  <th className="text-right text-sm font-medium text-gray-500 px-4 sm:px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
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
                    <td className="px-4 sm:px-6 py-4 text-gray-600 hidden sm:table-cell">{app.provider}</td>
                    <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                      {app.badge && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                       ${app.badge === 'featured' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                          {app.badge === 'featured' ? '⭐ Featured' : '🔥 Top'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right text-gray-600 hidden lg:table-cell">
                      {app.views.toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 hidden md:table-cell">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => {
                            setEditingApp(app);
                            setFormData({
                              name: app.name,
                              provider: app.provider,
                              description: app.description,
                              url: app.url,
                              categories: app.categories,
                              logo: app.logo || '',
                              badge: app.badge
                            });
                          }}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Tool Modal */}
      {(showAddModal || editingApp) && (
        <ToolModal isEdit={!!editingApp} />
      )}
    </AdminLayout>
  );
}
