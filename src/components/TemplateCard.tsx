'use client';

import { Template } from '@/lib/mockData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Edit, Trash2, Copy } from 'lucide-react';
import { useState } from 'react';

interface TemplateCardProps {
  template: Template;
  onEdit?: (template: Template) => void;
  onDelete?: (template: Template) => void;
  onCopy?: (template: Template) => void;
}

export function TemplateCard({ template, onEdit, onDelete, onCopy }: TemplateCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };

  const handleAction = async (action: 'edit' | 'delete' | 'copy') => {
    setIsLoading(true);
    try {
      switch (action) {
        case 'edit':
          onEdit?.(template);
          break;
        case 'delete':
          onDelete?.(template);
          break;
        case 'copy':
          onCopy?.(template);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="text-sm text-muted-foreground bg-muted p-2 rounded-md overflow-x-auto">
          {template.content}
        </pre>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Created {formatDate(template.createdAt)}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAction('copy')}
            disabled={isLoading}
            title={copied ? "Copied!" : "Copy template"}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAction('edit')}
            disabled={isLoading}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAction('delete')}
            disabled={isLoading}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 