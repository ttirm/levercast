export interface PlatformTemplate {
  id: string;
  platform: 'LINKEDIN' | 'TWITTER';
  prompt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
  platformTemplates: PlatformTemplate[];
}

export interface CreateTemplateData {
  name: string;
  description: string;
  platformPrompts: Array<{
    platform: 'LINKEDIN' | 'TWITTER';
    prompt: string;
  }>;
} 