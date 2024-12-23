import React, { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { styles } from '../../theme';
import { Pagination } from '../../components/Pagination';
import {
  Search,
  UserPlus,
  Edit2,
  Trash2,
  User,
  Mail,
  Calendar,
  Save,
  X,
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  lastLogin?: string;
  created_at: string;
}

// Static data for demo
const initialUsers: AdminUser[] = [
  {
    id: 'usr_1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'admin',
    lastLogin: '2024-01-15T10:30:00Z',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'usr_2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'super_admin',
    lastLogin: '2024-01-14T15:45:00Z',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'usr_3',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    role: 'admin',
    lastLogin: '2024-01-13T09:15:00Z',
    created_at: '2024-01-02T00:00:00Z'
  }
];

const roleColors = {
  admin: 'bg-blue-100 text-blue-700',
  super_admin: 'bg-purple-100 text-purple-700'
};

export default function Users() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'admin' as 'admin' | 'super_admin'
  });

  const handleAddUser = () => {
    const newUser: AdminUser = {
      id: `usr_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      created_at: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
    setFormData({ name: '', email: '', role: 'admin' });
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    setUsers(users.map(user =>
      user.id === editingUser.id
        ? { ...user, name: formData.name, email: formData.email, role: formData.role }
        : user
    ));
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'admin' });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const UserModal = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display font-bold text-gray-900">
            {isEdit ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={() => {
              setShowAddModal(false);
              setEditingUser(null);
              setFormData(prev => ({ name: '', email: '', role: 'admin' }));
            }}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          isEdit ? handleUpdateUser() : handleAddUser();
        }} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm
                       focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm
                       focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'admin' | 'super_admin' }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm
                       focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                setEditingUser(null);
                setFormData(prev => ({ name: '', email: '', role: 'admin' }));
              }}
              className={`${styles.button.base} ${styles.button.secondary} ${styles.button.sizes.md} w-full sm:w-auto`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.md}
                         flex items-center justify-center gap-2 w-full sm:w-auto`}
            >
              <Save className="w-4 h-4" />
              {isEdit ? 'Update User' : 'Add User'}
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
              Users
            </h1>
            <p className="text-base lg:text-lg text-gray-600">
              Manage administrator accounts.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.md}
                       flex items-center justify-center gap-2 w-full sm:w-auto`}
          >
            <UserPlus className="w-5 h-5" />
            Add User
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(prev => e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-sm font-medium text-gray-500 px-4 sm:px-6 py-3 w-[40%]">User</th>
                  <th className="text-left text-sm font-medium text-gray-500 px-4 sm:px-6 py-3 hidden sm:table-cell w-[15%]">Role</th>
                  <th className="text-left text-sm font-medium text-gray-500 px-4 sm:px-6 py-3 hidden md:table-cell w-[20%]">Last Login</th>
                  <th className="text-left text-sm font-medium text-gray-500 px-4 sm:px-6 py-3 hidden lg:table-cell w-[15%]">Joined</th>
                  <th className="text-right text-sm font-medium text-gray-500 px-4 sm:px-6 py-3 w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">{user.name}</div>
                          <div className="text-sm text-gray-500 truncate">{user.email}</div>
                          <div className="sm:hidden mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                         ${roleColors[user.role]}`}>
                              {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                     ${roleColors[user.role]}`}>
                        {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-end gap-2 sm:gap-3">
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setFormData({
                              name: user.name,
                              email: user.email,
                              role: user.role
                            });
                          }}
                          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
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

      {/* Add/Edit User Modal */}
      {(showAddModal || editingUser) && (
        <UserModal isEdit={!!editingUser} />
      )}
    </AdminLayout>
  );
}
