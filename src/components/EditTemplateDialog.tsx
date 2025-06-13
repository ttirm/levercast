'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}

interface EditTemplateDialogProps {
  template: Template | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (template: Template) => void;
}

export function EditTemplateDialog({
  template,
  open,
  onOpenChange,
  onSave,
}: EditTemplateDialogProps) {
  const [editedTemplate, setEditedTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (template) {
      setEditedTemplate(template);
    }
  }, [template]);

  if (!editedTemplate) {
    return null;
  }

  const handleSave = () => {
    onSave(editedTemplate);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Template</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={editedTemplate.name}
              onChange={(e) => setEditedTemplate({ ...editedTemplate, name: e.target.value })}
              placeholder="Enter template name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={editedTemplate.description}
              onChange={(e) => setEditedTemplate({ ...editedTemplate, description: e.target.value })}
              placeholder="Enter template description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Template Content</Label>
            <Textarea
              id="content"
              value={editedTemplate.content}
              onChange={(e) => setEditedTemplate({ ...editedTemplate, content: e.target.value })}
              placeholder="Enter template content"
              className="min-h-[200px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={editedTemplate.isDefault}
              onChange={(e) => setEditedTemplate({ ...editedTemplate, isDefault: e.target.checked })}
              className="rounded border-gray-300"
            />
            <Label htmlFor="isDefault">Set as default template</Label>
          </div>
          <Button 
            onClick={handleSave}
            className="w-full"
            disabled={!editedTemplate.name || !editedTemplate.content}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 