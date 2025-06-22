"use client"

import { MainLayout } from "@/components/main-layout"
import { Copy, Star, Plus } from "lucide-react"
import { TemplateCard } from '@/components/TemplateCard';
import { TemplateCardSkeleton } from '@/components/TemplateCardSkeleton';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Template, CreateTemplateData } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TemplatesPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState<CreateTemplateData>({
    name: '',
    description: '',
    platformPrompts: [
      { platform: 'LINKEDIN', prompt: '' },
      { platform: 'TWITTER', prompt: '' }
    ]
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates');
        if (!response.ok) throw new Error('Failed to fetch templates');
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast({
          title: "Error",
          description: "Failed to load templates. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isSignedIn) {
      fetchTemplates();
    }
  }, [isSignedIn, toast]);

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (template: Template) => {
    try {
      const response = await fetch(`/api/templates/${template.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete template');

      setTemplates(templates.filter(t => t.id !== template.id));
      toast({
        title: "Template Deleted",
        description: `"${template.name}" has been deleted successfully.`,
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Error",
        description: "Failed to delete template. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = (template: Template) => {
    const promptText = template.platformTemplates
      .map(pt => `${pt.platform}:\n${pt.prompt}`)
      .join('\n\n');
    navigator.clipboard.writeText(promptText);
    toast({
      title: "Copied!",
      description: "Template prompts have been copied to clipboard.",
    });
  };

  const handleCreateTemplate = async () => {
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTemplate),
      });

      if (!response.ok) throw new Error('Failed to create template');

      const template = await response.json();
      setTemplates([template, ...templates]);
      setNewTemplate({
        name: '',
        description: '',
        platformPrompts: [
          { platform: 'LINKEDIN', prompt: '' },
          { platform: 'TWITTER', prompt: '' }
        ]
      });
      setIsCreateDialogOpen(false);

      toast({
        title: "Template Created",
        description: `"${template.name}" has been created successfully.`,
      });
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Error",
        description: "Failed to create template. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTemplate = async () => {
    if (!editingTemplate) return;

    try {
      const response = await fetch(`/api/templates/${editingTemplate.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingTemplate.name,
          description: editingTemplate.description,
          platformPrompts: editingTemplate.platformTemplates.map(pt => ({
            platform: pt.platform,
            prompt: pt.prompt,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to update template');

      const updatedTemplate = await response.json();
      setTemplates(templates.map(t => 
        t.id === updatedTemplate.id ? updatedTemplate : t
      ));
      setIsEditDialogOpen(false);
      setEditingTemplate(null);

      toast({
        title: "Template Updated",
        description: `"${updatedTemplate.name}" has been updated successfully.`,
      });
    } catch (error) {
      console.error('Error updating template:', error);
      toast({
        title: "Error",
        description: "Failed to update template. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updatePlatformPrompt = (platform: 'LINKEDIN' | 'TWITTER', prompt: string, isEditing = false) => {
    if (isEditing && editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        platformTemplates: editingTemplate.platformTemplates.map(pt =>
          pt.platform === platform ? { ...pt, prompt } : pt
        )
      });
    } else {
      setNewTemplate({
        ...newTemplate,
        platformPrompts: newTemplate.platformPrompts.map(pp =>
          pp.platform === platform ? { ...pp, prompt } : pp
        )
      });
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

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
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    placeholder="e.g., Professional LinkedIn, Casual Twitter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    placeholder="Describe what this template does"
                  />
                </div>
                <div className="space-y-4">
                  <Label>Platform Prompts</Label>
                  {newTemplate.platformPrompts.map((platformPrompt) => (
                    <div key={platformPrompt.platform} className="space-y-2">
                      <Label className="text-sm font-medium">
                        {platformPrompt.platform} Prompt
                      </Label>
                      <Textarea
                        value={platformPrompt.prompt}
                        onChange={(e) => updatePlatformPrompt(platformPrompt.platform, e.target.value)}
                        placeholder={`Enter your ${platformPrompt.platform.toLowerCase()} prompt...`}
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        Example: "Rewrite this content in a professional tone suitable for LinkedIn, focusing on business insights and industry expertise."
                      </p>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleCreateTemplate}
                  className="w-full"
                  disabled={!newTemplate.name || newTemplate.platformPrompts.some(pp => !pp.prompt)}
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

        {/* Edit Template Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Template</DialogTitle>
            </DialogHeader>
            {editingTemplate && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Template Name</Label>
                  <Input
                    id="edit-name"
                    value={editingTemplate.name}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                    placeholder="Enter template name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Input
                    id="edit-description"
                    value={editingTemplate.description || ''}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                    placeholder="Enter template description"
                  />
                </div>
                <div className="space-y-4">
                  <Label>Platform Prompts</Label>
                  {editingTemplate.platformTemplates.map((platformTemplate) => (
                    <div key={platformTemplate.platform} className="space-y-2">
                      <Label className="text-sm font-medium">
                        {platformTemplate.platform} Prompt
                      </Label>
                      <Textarea
                        value={platformTemplate.prompt}
                        onChange={(e) => updatePlatformPrompt(platformTemplate.platform, e.target.value, true)}
                        placeholder={`Enter your ${platformTemplate.platform.toLowerCase()} prompt...`}
                        className="min-h-[100px]"
                      />
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleUpdateTemplate}
                  className="w-full"
                  disabled={!editingTemplate.name || editingTemplate.platformTemplates.some(pt => !pt.prompt)}
                >
                  Update Template
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
} 