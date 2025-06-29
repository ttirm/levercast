export interface User {
  id: string;
  email: string;
  name: string | null;
  clerkId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string | null;
  platform: Platform;
  prompt: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}

export interface PostTemplate {
  id: string;
  postId: string;
  templateId: string;
  platform: Platform;
  generatedContent: string | null;
  createdAt: string;
  updatedAt: string;
  template: Template;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  formattedContent: string | null;
  status: PostStatus;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  userId: string;
  postTemplates: PostTemplate[];
}

export interface CreateTemplateData {
  name: string;
  description: string;
  platform: Platform;
  prompt: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  imageUrl?: string;
  templateSelections: {
    platform: Platform;
    templateId: string;
  }[];
}

export type PostStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'SCHEDULED';
export type Platform = 'LINKEDIN' | 'TWITTER';
export type Theme = 'LIGHT' | 'DARK';
export type SocialPostStatus = 'PENDING' | 'PUBLISHED' | 'FAILED'; 