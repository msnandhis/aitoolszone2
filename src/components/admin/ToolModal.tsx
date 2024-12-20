import React, { useState, useCallback, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { styles } from '../../theme';
import { LogoUpload } from './LogoUpload';
import { CategorySelect } from './CategorySelect';
import type { Category } from '../../types';

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

interface ToolModalProps {
  isEdit: boolean;
  initialData: FormData;
  onSubmit: (data: FormData) => void;
  onClose: () => void;
  categories: Category[];
}

export const ToolModal = React.memo(({ 
  isEdit,
  initialData,
  onSubmit,
  onClose,
  categories,
}: ToolModalProps) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [logoUploadType, setLogoUploadType] = useState<'url' | 'file'>('url');

  // Update form data when initialData changes
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleFormChange = useCallback((data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-6 max-w-2xl w-full overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display font-bold text-gray-900">
            {isEdit ? 'Edit Tool' : 'Add New Tool'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                onChange={(e) => handleFormChange({ name: e.target.value })}
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
                onChange={(e) => handleFormChange({ provider: e.target.value })}
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
                onChange={(e) => handleFormChange({ url: e.target.value })}
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
                onChange={(e) => handleFormChange({ badge: (e.target.value || null) as Badge })}
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
                onCategoryChange={(categories) => handleFormChange({ categories })}
                categories={categories}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo
              </label>
              <LogoUpload
                logoUrl={formData.logo}
                onLogoChange={(logo) => handleFormChange({ logo })}
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
                onChange={(e) => handleFormChange({ description: e.target.value })}
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
              onClick={onClose}
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
});

ToolModal.displayName = 'ToolModal';
