'use client';

import { Post } from '@/lib/mockData';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  onView?: (post: Post) => void;
}

export function PostCard({ post, onEdit, onDelete, onView }: PostCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };

  const handleAction = async (action: 'edit' | 'delete' | 'view') => {
    setIsLoading(true);
    try {
      switch (action) {
        case 'edit':
          onEdit?.(post);
          break;
        case 'delete':
          onDelete?.(post);
          break;
        case 'view':
          onView?.(post);
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl dark:text-white">{post.title}</CardTitle>
          <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className={post.status === 'published' ? 'bg-yellow-500 text-gray-900' : ''}>
            {post.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Created {formatDate(post.createdAt)}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAction('view')}
            disabled={isLoading}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAction('edit')}
            disabled={isLoading}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAction('delete')}
            disabled={isLoading}
            className="text-destructive hover:text-destructive hover:bg-red-100 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 