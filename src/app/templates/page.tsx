"use client"

import { MainLayout } from "@/components/main-layout"
import { Copy, Star } from "lucide-react"
import { mockTemplates } from '@/lib/mockData';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplateCardSkeleton } from '@/components/TemplateCardSkeleton';
import { useState, useEffect } from 'react';
import { Template } from '@/lib/mockData';

export default function TemplatesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setTemplates(mockTemplates);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEdit = (template: Template) => {
    console.log('Edit template:', template);
    // TODO: Implement edit functionality
  };

  const handleDelete = (template: Template) => {
    console.log('Delete template:', template);
    // TODO: Implement delete functionality
  };

  const handleCopy = (template: Template) => {
    console.log('Copy template:', template);
    // TODO: Implement copy functionality
    navigator.clipboard.writeText(template.content);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="text-muted-foreground">Manage your content templates</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Show 6 skeleton cards while loading
          Array.from({ length: 6 }).map((_, i) => (
            <TemplateCardSkeleton key={i} />
          ))
        ) : (
          templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCopy={handleCopy}
            />
          ))
        )}
      </div>
    </div>
  );
} 