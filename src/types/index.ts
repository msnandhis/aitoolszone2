export interface Application {
  id: string;
  name: string;
  description: string;
  provider: string;  // Added provider field
  url: string;
  categories: {
    id: string;
    name: string;
  }[];
  logo?: string | null;
  badge: 'featured' | 'top' | null;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  label: string;
  slug: string;
  total_applications: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id: string;
  name: string;
  email: string;
  tool_name: string;
  description: string;
  api_link: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

// Badge colors and styles
export const BADGE_STYLES = {
  featured: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    icon: '⭐',
    label: 'Featured'
  },
  top: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    icon: '🔥',
    label: 'Top'
  }
} as const;

// Helper function to convert File to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Helper function to check if string is a base64 image
export const isBase64Image = (str: string): boolean => {
  return str.startsWith('data:image/');
};
