"use client"

import { MainLayout } from "@/components/main-layout"
import { Copy, Star } from "lucide-react"
import { mockTemplates } from '@/lib/mockData';
import { TemplateCard } from '@/components/TemplateCard';

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="text-muted-foreground">Manage your content templates</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
} 