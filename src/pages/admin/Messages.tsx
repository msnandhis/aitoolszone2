import React, { useState, useEffect } from "react";
import { AdminLayout } from "./AdminLayout";
import { styles } from "../../theme";
import { Pagination } from "../../components/Pagination";
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  Filter,
  CheckCircle,
  X,
  Save,
} from "lucide-react";

// Static data for demo
const initialMessages = [
  {
    id: "msg_1",
    name: "John Smith",
    email: "john@example.com",
    subject: "API Integration Question",
    message:
      "Hi, I was wondering if you could help me with integrating the GPT-4 API into my application. I'm having trouble with the authentication process.",
    status: "unread",
    admin_notes: "",
    date: "2024-01-15T10:30:00Z",
  },
  {
    id: "msg_2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Feature Request",
    message:
      "Would it be possible to add a comparison feature for different AI models? It would be really helpful for choosing the right API.",
    status: "read",
    admin_notes: "Added to feature requests list",
    date: "2024-01-14T15:45:00Z",
  },
  {
    id: "msg_3",
    name: "Mike Wilson",
    email: "mike@example.com",
    subject: "Feedback on Directory",
    message:
      "Just wanted to say that your directory has been incredibly helpful for my team. We've found several APIs that we now use in production.",
    status: "read",
    admin_notes: "Positive feedback - consider for testimonials",
    date: "2024-01-13T09:15:00Z",
  },
];

export default function Messages() {
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleMarkAsRead = (messageId: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, status: "read" } : msg
      )
    );
  };

  const handleSaveNotes = (messageId: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, admin_notes: noteText } : msg
      )
    );
    setEditingNotes(null);
    setNoteText("");
  };

  const handleDelete = (messageId: string) => {
    setMessages(messages.filter((msg) => msg.id !== messageId));
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || message.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="px-4 sm:px-0">
          <h1 className={`${styles.heading.h1} text-gray-900 mb-2`}>
            Messages
          </h1>
          <p className="text-base lg:text-lg text-gray-600">
            Manage and respond to user messages.
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

            {/* Status Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedStatus(null)}
                className={`${styles.button.base} ${styles.button.sizes.sm}
                  ${
                    !selectedStatus
                      ? styles.button.primary
                      : styles.button.secondary
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedStatus("unread")}
                className={`${styles.button.base} ${styles.button.sizes.sm}
                  ${
                    selectedStatus === "unread"
                      ? styles.button.primary
                      : styles.button.secondary
                  }`}
              >
                Unread
              </button>
              <button
                onClick={() => setSelectedStatus("read")}
                className={`${styles.button.base} ${styles.button.sizes.sm}
                  ${
                    selectedStatus === "read"
                      ? styles.button.primary
                      : styles.button.secondary
                  }`}
              >
                Read
              </button>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
          {paginatedMessages.map((message) => (
            <div key={message.id} className="p-6 hover:bg-gray-50">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
                {/* Message Content */}
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {message.status === "unread" ? (
                        <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      ) : (
                        <MailOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <h3 className="font-medium text-gray-900 truncate">
                        {message.subject}
                      </h3>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium self-start sm:self-auto
                                   ${
                                     message.status === "unread"
                                       ? "bg-primary-100 text-primary-700"
                                       : "bg-gray-100 text-gray-700"
                                   }`}
                    >
                      {message.status}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-gray-500 mb-3">
                    <span className="truncate">{message.name}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="truncate">{message.email}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{new Date(message.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{message.message}</p>

                  {/* Admin Notes */}
                  <div className="mt-4 sm:mt-6">
                    {editingNotes === message.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Add admin notes..."
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm
                                   focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                          rows={2}
                        />
                        <div className="flex flex-col sm:flex-row justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingNotes(null);
                              setNoteText("");
                            }}
                            className={`${styles.button.base} ${styles.button.secondary} ${styles.button.sizes.sm} w-full sm:w-auto`}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNotes(message.id)}
                            className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.sm}
                                      flex items-center justify-center gap-2 w-full sm:w-auto`}
                          >
                            <Save className="w-4 h-4" />
                            Save Notes
                          </button>
                        </div>
                      </div>
                    ) : message.admin_notes ? (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-900">
                            Admin Notes
                          </h4>
                          <button
                            onClick={() => {
                              setEditingNotes(message.id);
                              setNoteText(message.admin_notes);
                            }}
                            className="text-sm text-primary-600 hover:text-primary-700 px-2 py-1 rounded-md hover:bg-gray-100"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">
                          {message.admin_notes}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingNotes(message.id);
                          setNoteText("");
                        }}
                        className="text-sm text-primary-600 hover:text-primary-700 px-2 py-1 rounded-md hover:bg-gray-100"
                      >
                        Add Notes
                      </button>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 self-start sm:self-center order-first sm:order-last">
                  {message.status === 'unread' && (
                    <button
                      onClick={() => handleMarkAsRead(message.id)}
                      className="p-1.5 text-gray-400 hover:text-primary-500 rounded-lg hover:bg-gray-100"
                      title="Mark as read"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
