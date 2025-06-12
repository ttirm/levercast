export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website',
    status: 'active',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'New mobile application for iOS and Android',
    status: 'in-progress',
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Design Homepage',
    description: 'Create new homepage design with modern UI elements',
    status: 'completed',
    assignedTo: '1',
    dueDate: '2024-03-20T00:00:00Z',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '2',
    projectId: '1',
    title: 'Implement Navigation',
    description: 'Build responsive navigation component',
    status: 'in-progress',
    assignedTo: '2',
    dueDate: '2024-03-25T00:00:00Z',
    createdAt: '2024-03-02T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  }
]; 