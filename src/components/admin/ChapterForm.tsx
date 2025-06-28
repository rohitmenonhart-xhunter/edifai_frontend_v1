import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface ChapterFormProps {
  onAdd: (chapter: { title: string; description: string }) => void;
}

const ChapterForm: React.FC<ChapterFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="chapterTitle">Chapter Title</Label>
            <Input
              id="chapterTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter chapter title"
              className="mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="chapterDescription">Description (Optional)</Label>
            <Textarea
              id="chapterDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter chapter description"
              className="mt-1"
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Chapter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChapterForm; 