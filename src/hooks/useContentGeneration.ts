import { useState } from 'react';
import { Platform } from '@/lib/types';

interface GenerateContentParams {
  templateId: string;
  platform: Platform;
  rawContent: string;
}

interface GenerateContentResponse {
  generatedContent: string;
  template: {
    id: string;
    name: string;
    platform: Platform;
    prompt: string;
  };
}

interface UseContentGenerationReturn {
  generateContent: (params: GenerateContentParams) => Promise<string>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useContentGeneration(): UseContentGenerationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async (params: GenerateContentParams): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to generate content');
      }

      const data: GenerateContentResponse = await response.json();
      return data.generatedContent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    generateContent,
    isLoading,
    error,
    clearError,
  };
} 