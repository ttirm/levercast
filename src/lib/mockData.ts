export interface Post {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled';
  createdAt: string;
  updatedAt: string;
  template?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  theme: 'light' | 'dark';
  notifications: boolean;
  defaultTemplate?: string;
}

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Welcome to Levercast',
    content: 'This is your first post. Start writing amazing content!',
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    template: 'default'
  },
  {
    id: '2',
    title: 'Draft Post',
    content: 'This is a draft post that needs editing.',
    status: 'draft',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Default Template',
    description: 'A clean and simple template for your posts',
    content: '{{title}}\n\n{{content}}',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'News Article',
    description: 'Perfect for news and updates',
    content: '# {{title}}\n\n{{content}}\n\nPublished on {{date}}',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockSettings: Settings = {
  theme: 'light',
  notifications: true,
  defaultTemplate: '1'
}; 