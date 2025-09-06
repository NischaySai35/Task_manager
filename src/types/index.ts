export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'viewer';
  joinedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  members: User[];
  createdAt: Date;
  updatedAt: Date;
  progress: number;
  tasksCount: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: User | null;
  projectId: string;
  createdBy: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  attachments?: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export type Theme = 'light' | 'dark';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}