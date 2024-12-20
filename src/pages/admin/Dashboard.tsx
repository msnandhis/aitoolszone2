import React from 'react';
import { AdminLayout } from './AdminLayout';
import { styles } from '../../theme';
import {
  Users,
  MessageSquare,
  Send,
  Wrench,
  ExternalLink,
  Clock,
  Circle
} from 'lucide-react';

const stats = [
  {
    name: 'Total Tools',
    value: '12',
    icon: Wrench,
    change: '+2 this week',
    changeType: 'increase'
  },
  {
    name: 'Active Users',
    value: '450',
    icon: Users,
    change: '+50 this month',
    changeType: 'increase'
  },
  {
    name: 'Messages',
    value: '8',
    icon: MessageSquare,
    change: '3 unread',
    changeType: 'neutral'
  },
  {
    name: 'Submissions',
    value: '5',
    icon: Send,
    change: '2 pending',
    changeType: 'neutral'
  }
];

// Sample data - replace with actual data
const recentSubmissions = [
  {
    id: 'sub_1',
    tool_name: 'ChatGPT Plugin',
    email: 'developer@example.com',
    status: 'pending',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 'sub_2',
    tool_name: 'AI Image Generator',
    email: 'creator@example.com',
    status: 'pending',
    created_at: '2024-01-14T15:45:00Z'
  },
  {
    id: 'sub_3',
    tool_name: 'Text Analyzer',
    email: 'dev@example.com',
    status: 'pending',
    created_at: '2024-01-14T09:20:00Z'
  }
];

const recentMessages = [
  {
    id: 'msg_1',
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Integration Question',
    message: 'Hi, I need help integrating...',
    created_at: '2024-01-15T11:00:00Z',
    read: false
  },
  {
    id: 'msg_2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Feature Request',
    message: 'Would it be possible to add...',
    created_at: '2024-01-15T09:30:00Z',
    read: false
  },
  {
    id: 'msg_3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    subject: 'Bug Report',
    message: 'I found an issue with...',
    created_at: '2024-01-14T16:45:00Z',
    read: false
  }
];

export default function Dashboard() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="px-4 sm:px-0">
          <h1 className={`${styles.heading.h1} text-gray-900 mb-2`}>
            Dashboard
          </h1>
          <p className="text-base lg:text-lg text-gray-600">
            Overview of your AI Tools Directory
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-50 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Submissions */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-medium text-gray-900">Recent Submissions</h2>
              </div>
              <a href="/admin/submissions" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all
              </a>
            </div>
            <div className="divide-y divide-gray-200">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {submission.tool_name}
                      </h3>
                      <p className="text-sm text-gray-500">{submission.email}</p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        {formatDate(submission.created_at)}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-medium text-gray-900">Recent Messages</h2>
              </div>
              <a href="/admin/messages" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all
              </a>
            </div>
            <div className="divide-y divide-gray-200">
              {recentMessages.map((message) => (
                <div key={message.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {message.name}
                        </h3>
                        {!message.read && (
                          <Circle className="w-2 h-2 fill-primary-500 text-primary-500 flex-shrink-0" />
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">{message.subject}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
