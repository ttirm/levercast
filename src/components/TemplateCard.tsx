import { Template } from '@/lib/mockData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'recently';
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
      <CardFooter className="text-sm text-muted-foreground">
        <span>Created {formatDate(template.createdAt)}</span>
      </CardFooter>
    </Card>
  );
} 