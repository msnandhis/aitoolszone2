import React from 'react';
import { AdminLayout } from './AdminLayout';
import { styles } from '../../theme';
import { MessageSquare, Star, Archive, Trash2 } from 'lucide-react';

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
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className={`${styles.heading.h1} text-gray-900 mb-2`}>
            Inbox
          </h1>
          <p className="text-lg text-gray-600">
            Manage your messages and inquiries
          </p>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {sampleMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 hover:bg-gray-50 ${!message.read ? 'bg-primary-50' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className={`w-5 h-5 ${!message.read ? 'text-primary-600' : 'text-gray-400'}`} />
                    <h3 className="font-medium text-gray-900">
                      {message.from}
                    </h3>
                    <span className="text-sm text-gray-500">
                      ({message.email})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className={`text-gray-400 hover:text-yellow-500 ${message.starred ? 'text-yellow-500' : ''}`}
                      title="Star"
                    >
                      <Star className="w-5 h-5" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      title="Archive"
                    >
                      <Archive className="w-5 h-5" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <h4 className="font-medium text-gray-800 mb-1">
                  {message.subject}
                </h4>
                <p className="text-sm text-gray-600">
                  {message.message}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  {new Date(message.date).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
