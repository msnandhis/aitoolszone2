import React, { useState, useEffect, useRef, useCallback } from "react";
import { AdminLayout } from "./AdminLayout";
import { styles } from "../../theme";
import { Plus, Search, Edit2, Trash2, BarChart2, Save, X } from "lucide-react";
import type { Category } from "../../types";

// Static data for demo
const initialCategories: Category[] = [
  {
    id: "cat_1",
    label: "Text Generation",
    slug: "text-generation",
    total_applications: 10,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat_2",
    label: "Image Generation",
    slug: "image-generation",
    total_applications: 1,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const labelRef = useRef<HTMLInputElement | null>(null);
  const slugRef = useRef<HTMLInputElement | null>(null);

  const formData = useRef({
    label: "",
    slug: "",
  });

  useEffect(() => {
    if (editingCategory) {
      formData.current = {
        label: editingCategory.label,
        slug: editingCategory.slug,
      };
      if (labelRef.current && slugRef.current) {
        labelRef.current.value = editingCategory.label;
        slugRef.current.value = editingCategory.slug;
      }
    }
  }, [editingCategory]);

  const generateSlug = useCallback((text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }, []);

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: `cat_${Date.now()}`,
      label: formData.current.label,
      slug: formData.current.slug || generateSlug(formData.current.label),
      total_applications: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setCategories((prev) => [...prev, newCategory]);
    setShowAddModal(false);
    resetForm();
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === editingCategory.id
          ? {
              ...cat,
              label: formData.current.label,
              slug:
                formData.current.slug || generateSlug(formData.current.label),
              updated_at: new Date().toISOString(),
            }
          : cat
      )
    );
    setEditingCategory(null);
    resetForm();
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== categoryId)
    );
  };

  const resetForm = () => {
    if (labelRef.current && slugRef.current) {
      labelRef.current.value = "";
      slugRef.current.value = "";
    }
    formData.current = { label: "", slug: "" };
  };

  const filteredCategories = categories.filter((category) =>
    category.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CategoryModal = React.memo(
    ({ isEdit = false }: { isEdit?: boolean }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-display font-bold text-gray-900">
              {isEdit ? "Edit Category" : "Add New Category"}
            </h2>
            <button
              onClick={() => {
                setShowAddModal(false);
                setEditingCategory(null);
                resetForm();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEdit ? handleUpdateCategory() : handleAddCategory();
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="label"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category Name
              </label>
              <input
                ref={labelRef}
                type="text"
                id="label"
                onChange={(e) => {
                  formData.current.label = e.target.value;
                  formData.current.slug = generateSlug(e.target.value);
                }}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              />
            </div>

            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Slug
              </label>
              <input
                ref={slugRef}
                type="text"
                id="slug"
                onChange={(e) => {
                  formData.current.slug = generateSlug(e.target.value);
                }}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCategory(null);
                  resetForm();
                }}
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
                {isEdit ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className={`${styles.heading.h1} text-gray-900 mb-2`}>
              Categories
            </h1>
            <p className="text-base lg:text-lg text-gray-600">
              Manage your application categories.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.md}
                       flex items-center justify-center gap-2 w-full sm:w-auto`}
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-1 truncate">
                    {category.label}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 sm:mb-4">
                    Slug: {category.slug}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setShowAddModal(true);
                    }}
                    className={`${styles.button.base} ${styles.button.secondary} ${styles.button.sizes.sm}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className={`${styles.button.base} ${styles.button.danger} ${styles.button.sizes.sm}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                <BarChart2 className="w-4 h-4" />
                <span>{category.total_applications} applications</span>
              </div>
            </div>
          ))}
        </div>

        {showAddModal && <CategoryModal isEdit={!!editingCategory} />}
      </div>
    </AdminLayout>
  );
}
