import { Application, Category, User, Message, Submission } from '../types';

// Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    total: number;
    total_pages: number;
    current_page: number;
    per_page: number;
  };
}

// Sample data
const sampleCategories: Category[] = [
  {
    id: 'cat_1',
    label: 'Text Generation',
    slug: 'text-generation',
    total_applications: 10,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat_2',
    label: 'Image Generation',
    slug: 'image-generation',
    total_applications: 1,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

const sampleApplications: Application[] = [
  {
    id: 'app_1',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Advanced language model for text generation',
    url: 'https://openai.com/gpt-4',
    categories: [
      { id: 'cat_1', name: 'Text Generation' }
    ],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    badge: 'featured',
    views: 1250,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'app_2',
    name: 'Claude',
    provider: 'Anthropic',
    description: 'AI assistant for various tasks',
    url: 'https://anthropic.com/claude',
    categories: [
      { id: 'cat_1', name: 'Text Generation' }
    ],
    logo: 'https://anthropic.com/favicon.ico',
    badge: 'featured',
    views: 980,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'app_3',
    name: 'GPT-3.5',
    provider: 'OpenAI',
    description: 'Efficient language model for text generation',
    url: 'https://openai.com/gpt-3-5',
    categories: [
      { id: 'cat_1', name: 'Text Generation' }
    ],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    badge: 'top',
    views: 750,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'app_4',
    name: 'Claude 2',
    provider: 'Anthropic',
    description: 'Advanced version of Claude AI assistant',
    url: 'https://anthropic.com/claude-2',
    categories: [
      { id: 'cat_1', name: 'Text Generation' }
    ],
    logo: 'https://anthropic.com/favicon.ico',
    badge: 'top',
    views: 700,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'app_5',
    name: 'PaLM 2',
    provider: 'Google',
    description: "Google's language model for text generation",
    url: 'https://cloud.google.com/vertex-ai/docs/generative-ai/learn/palm2',
    categories: [
      { id: 'cat_1', name: 'Text Generation' }
    ],
    logo: 'https://www.gstatic.com/devrel-devsite/prod/v85e39fe21f53c758adf6c791fb94a7a2182cff2f109e4a61cd588859f04242c9/cloud/images/favicons/onecloud/favicon.ico',
    badge: 'featured',
    views: 650,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'app_6',
    name: 'Llama 2',
    provider: 'Meta',
    description: "Meta's open source language model",
    url: 'https://ai.meta.com/llama/',
    categories: [
      { id: 'cat_1', name: 'Text Generation' }
    ],
    logo: 'https://ai.meta.com/favicon.ico',
    badge: null,
    views: 600,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'app_7',
    name: 'Cohere',
    provider: 'Cohere',
    description: 'Enterprise-focused language model API',
    url: 'https://cohere.ai/',
    categories: [
      { id: 'cat_1', name: 'Text Generation' }
    ],
    logo: 'https://cohere.ai/favicon.ico',
    badge: null,
    views: 550,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'app_8',
    name: 'Gemini',
    provider: 'Google',
    description: "Google's multimodal AI model",
    url: 'https://deepmind.google/technologies/gemini/',
    categories: [
      { id: 'cat_1', name: 'Text Generation' }
    ],
    logo: 'https://deepmind.google/favicon.ico',
    badge: 'featured',
    views: 850,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'app_9',
    name: 'ChatGPT',
    provider: 'OpenAI',
    description: 'Popular chat-based interface for GPT models',
    url: 'https://chat.openai.com',
    categories: [
      { id: 'cat_1', name: 'Text Generation' }
    ],
    logo: 'https://chat.openai.com/favicon.ico',
    badge: 'featured',
    views: 950,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'app_10',
    name: 'Bard',
    provider: 'Google',
    description: "Google's conversational AI model",
    url: 'https://bard.google.com',
    categories: [
      { id: 'cat_1', name: 'Text Generation' }
    ],
    logo: 'https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg',
    badge: 'top',
    views: 900,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'app_11',
    name: 'DALL-E',
    provider: 'OpenAI',
    description: 'AI system for generating images from text',
    url: 'https://openai.com/dall-e',
    categories: [
      { id: 'cat_2', name: 'Image Generation' }
    ],
    logo: 'https://openai.com/favicon.ico',
    badge: 'featured',
    views: 800,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// Storage keys
const STORAGE_KEYS = {
  APPLICATIONS: 'applications',
  CATEGORIES: 'categories',
  SUBMISSIONS: 'submissions',
  MESSAGES: 'messages',
  USERS: 'users'
};

// Initialize local storage with sample data
function initializeStorage() {
  localStorage.clear(); // Clear existing data to ensure fresh start
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(sampleApplications));
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(sampleCategories));
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
}

// Initialize storage on load
initializeStorage();

// Helper function to generate ID
function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to wrap response
function wrapResponse<T>(data: T, pagination?: ApiResponse<T>['pagination']): ApiResponse<T> {
  return {
    success: true,
    data,
    pagination
  };
}

// Helper function to sort applications by badge priority
function sortApplicationsByBadge(applications: Application[]): Application[] {
  return [...applications].sort((a, b) => {
    const badgePriority = { featured: 2, top: 1, null: 0 };
    const aPriority = badgePriority[a.badge || 'null'];
    const bPriority = badgePriority[b.badge || 'null'];
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    // If badges are the same, sort by views
    return b.views - a.views;
  });
}

// Applications
export async function fetchApplications(categoryId?: string): Promise<ApiResponse<Application[]>> {
  const applications: Application[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
  const filtered = categoryId
    ? applications.filter(app => app.categories.some(cat => cat.id === categoryId))
    : applications;
  return wrapResponse(sortApplicationsByBadge(filtered));
}

export async function createApplication(data: Partial<Application>): Promise<ApiResponse<Application>> {
  const applications: Application[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
  const newApplication: Application = {
    id: generateId('app'),
    name: data.name || '',
    provider: data.provider || '',
    description: data.description || '',
    url: data.url || '',
    categories: data.categories || [],
    logo: data.logo,
    badge: data.badge || null,
    views: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  applications.push(newApplication);
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));

  return wrapResponse(newApplication);
}

export async function updateApplication(id: string, data: Partial<Application>): Promise<ApiResponse<Application>> {
  const applications: Application[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
  const index = applications.findIndex(r => r.id === id);
  
  if (index === -1) {
    throw new Error('Application not found');
  }

  const updatedApplication = {
    ...applications[index],
    ...data,
    updated_at: new Date().toISOString()
  };

  applications[index] = updatedApplication;
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));

  return wrapResponse(updatedApplication);
}

export async function deleteApplication(id: string): Promise<ApiResponse<null>> {
  const applications: Application[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
  const filtered = applications.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(filtered));

  return wrapResponse(null);
}

// Categories
export async function fetchCategories(): Promise<ApiResponse<Category[]>> {
  const categories: Category[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
  return wrapResponse(categories);
}

// View Tracking
export async function trackView(type: 'application' | 'category', id: string): Promise<void> {
  if (type === 'application') {
    const applications: Application[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
    const index = applications.findIndex(r => r.id === id);
    if (index !== -1) {
      applications[index].views += 1;
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    }
  }
}

// Submit API Application
export async function submitApiApplication(data: {
  name: string;
  description: string;
  url: string;
  email: string;
}): Promise<ApiResponse<Submission>> {
  const submissions: Submission[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
  
  const newSubmission: Submission = {
    id: generateId('sub'),
    name: data.name,
    email: data.email,
    tool_name: data.name,
    description: data.description,
    api_link: data.url,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  submissions.push(newSubmission);
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));

  return wrapResponse(newSubmission);
}
