"use client"

import { MainLayout } from "@/components/main-layout"
import { Copy, Star, Plus } from "lucide-react"
import { mockTemplates } from '@/lib/mockData';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplateCardSkeleton } from '@/components/TemplateCardSkeleton';
import { useState, useEffect } from 'react';
import { Template } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function TemplatesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    content: ''
  });
  const { toast } = useToast();

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

  const handleCreateTemplate = () => {
    const template: Template = {
      id: String(Date.now()),
      name: newTemplate.name,
      description: newTemplate.description,
      content: newTemplate.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTemplates([template, ...templates]);
    setNewTemplate({ name: '', description: '', content: '' });
    setIsCreateDialogOpen(false);

    toast({
      title: "Template Created",
      description: `"${template.name}" has been created successfully.`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Templates</h1>
            <p className="text-muted-foreground">Manage your content templates</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={newTemplate.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    placeholder="Enter template name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newTemplate.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    placeholder="Enter template description"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Template Content</Label>
                  <Textarea
                    id="content"
                    value={newTemplate.content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                    placeholder="Enter template content"
                    className="min-h-[200px]"
                  />
                </div>
                <Button 
                  onClick={handleCreateTemplate}
                  className="w-full"
                  disabled={!newTemplate.name || !newTemplate.content}
                >
                  Create Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
    </MainLayout>
  );
} 