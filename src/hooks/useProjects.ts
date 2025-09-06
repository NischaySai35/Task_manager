import { useState, useEffect } from 'react';
import { Project, Task, User } from '../types';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@synergysphere.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'admin',
    joinedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@synergysphere.com',
    avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'member',
    joinedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'Marcus Rodriguez',
    email: 'marcus@synergysphere.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'member',
    joinedAt: new Date('2024-02-01'),
  },
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'SynergySphere Mobile App',
    description: 'Developing the mobile version of our collaboration platform',
    color: '#3B82F6',
    members: mockUsers,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-20'),
    progress: 75,
    tasksCount: {
      total: 24,
      completed: 18,
      inProgress: 4,
      pending: 2,
    },
  },
  {
    id: '2',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design',
    color: '#10B981',
    members: [mockUsers[0], mockUsers[1]],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-12-19'),
    progress: 45,
    tasksCount: {
      total: 16,
      completed: 7,
      inProgress: 6,
      pending: 3,
    },
  },
  {
    id: '3',
    name: 'Marketing Campaign Q1',
    description: 'Launch comprehensive marketing campaign for Q1 2025',
    color: '#F59E0B',
    members: [mockUsers[1], mockUsers[2]],
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-12-18'),
    progress: 30,
    tasksCount: {
      total: 12,
      completed: 3,
      inProgress: 5,
      pending: 4,
    },
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design user authentication flow',
    description: 'Create wireframes and mockups for the login and signup process',
    status: 'completed',
    priority: 'high',
    assignee: mockUsers[1],
    projectId: '1',
    createdBy: '1',
    dueDate: new Date('2024-12-25'),
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-15'),
  },
  {
    id: '2',
    title: 'Implement task management API',
    description: 'Build REST endpoints for task CRUD operations',
    status: 'in-progress',
    priority: 'high',
    assignee: mockUsers[2],
    projectId: '1',
    createdBy: '1',
    dueDate: new Date('2024-12-30'),
    createdAt: new Date('2024-12-12'),
    updatedAt: new Date('2024-12-20'),
  },
  {
    id: '3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    status: 'pending',
    priority: 'medium',
    assignee: mockUsers[0],
    projectId: '1',
    createdBy: '1',
    dueDate: new Date('2025-01-05'),
    createdAt: new Date('2024-12-15'),
    updatedAt: new Date('2024-12-15'),
  },
  {
    id: '4',
    title: 'Create brand guidelines',
    description: 'Develop comprehensive brand identity guidelines',
    status: 'in-progress',
    priority: 'medium',
    assignee: mockUsers[1],
    projectId: '2',
    createdBy: '1',
    dueDate: new Date('2024-12-28'),
    createdAt: new Date('2024-12-08'),
    updatedAt: new Date('2024-12-18'),
  },
];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setTasks(mockTasks);
      setLoading(false);
    }, 800);
  }, []);

  const getProjectTasks = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getUserTasks = (userId: string) => {
    return tasks.filter(task => task.assignee?.id === userId);
  };

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return {
    projects,
    tasks,
    loading,
    getProjectTasks,
    getUserTasks,
    createProject,
    createTask,
    updateTask,
    deleteTask,
  };
};