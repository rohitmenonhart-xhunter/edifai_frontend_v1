import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface SectionFormProps {
  subchapterTitle: string;
  onAdd: (section: { title: string; content: string }) => void;
}

const SectionForm: React.FC<SectionFormProps> = ({ subchapterTitle, onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title, content });
      setTitle('');
      setContent('');
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <h3 className="text-md font-medium mb-2">Add Section to: {subchapterTitle}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="sectionTitle">Section Title</Label>
            <Input
              id="sectionTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter section title"
              className="mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="sectionContent">Content Prompt (Optional)</Label>
            <Textarea
              id="sectionContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter section content prompt for AI generation"
              className="mt-1"
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-1">
              This will be used as guidance for AI content generation
            </p>
          </div>
          <Button type="submit" className="w-full">
            Add Section
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SectionForm; 