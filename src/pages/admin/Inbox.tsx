import React, { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { styles } from '../../theme';
import { Pagination } from '../../components/Pagination';
import {
  MessageSquare,
  Star,
  Archive,
  Trash2,
  Search,
  Filter,
} from 'lucide-react';

interface Message {
  id: string;
  from: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  starred: boolean;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    from: 'John Doe',
    email: 'john@example.com',
    subject: 'Integration Question',
    message: 'Hi, I need help integrating your API...',
    date: '2024-01-15T10:30:00Z',
    read: false,
    starred: false
  },
  {
    id: '2',
    from: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Feature Request',
    message: 'Would it be possible to add...',
    date: '2024-01-15T09:00:00Z',
    read: true,
    starred: true
  }
];

export default function Inbox() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleToggleRead = (messageId: string) => {
    setMessages(messages.map(msg =>
      msg.id === messageId ? { ...msg, read: !msg.read } : msg
    ));
  };

  const handleToggleStar = (messageId: string) => {
    setMessages(messages.map(msg =>
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  const handleDelete = (messageId: string) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = !searchQuery || 
      message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = 
      filter === 'all' ||
      (filter === 'unread' && !message.read) ||
      (filter === 'starred' && message.starred);

    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filter]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="px-4 sm:px-0">
          <h1 className={`${styles.heading.h1} text-gray-900 mb-2`}>
            Inbox
          </h1>
          <p className="text-base lg:text-lg text-gray-600">
            Manage your messages and inquiries
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`${styles.button.base} ${styles.button.sizes.sm}
                  ${filter === 'all' ? styles.button.primary : styles.button.secondary}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`${styles.button.base} ${styles.button.sizes.sm}
                  ${filter === 'unread' ? styles.button.primary : styles.button.secondary}
                  flex items-center gap-1`}
              >
                <MessageSquare className="w-4 h-4" />
                Unread
              </button>
              <button
                onClick={() => setFilter('starred')}
                className={`${styles.button.base} ${styles.button.sizes.sm}
                  ${filter === 'starred' ? styles.button.primary : styles.button.secondary}
                  flex items-center gap-1`}
              >
                <Star className="w-4 h-4" />
                Starred
              </button>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {paginatedMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 sm:p-6 hover:bg-gray-50 ${!message.read ? 'bg-primary-50' : ''}`}
                onClick={() => handleToggleRead(message.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <MessageSquare className={`w-5 h-5 flex-shrink-0 ${!message.read ? 'text-primary-600' : 'text-gray-400'}`} />
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {message.from}
                      </h3>
                      <span className="text-sm text-gray-500 truncate block">
                        {message.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStar(message.id);
                      }}
                      className={`p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-yellow-500 ${message.starred ? 'text-yellow-500' : ''}`}
                      title="Star"
                    >
                      <Star className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
                      }}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">
                  {message.subject}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {message.message}
                </p>
                <div className="text-xs text-gray-500">
                  {new Date(message.date).toLocaleString()}
                </div>
              </div>
            ))}
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
    </AdminLayout>
  );
}
