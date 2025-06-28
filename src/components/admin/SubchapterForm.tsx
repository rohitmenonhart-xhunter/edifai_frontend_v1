import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface SubchapterFormProps {
  chapterTitle: string;
  onAdd: (subchapter: { title: string; description: string }) => void;
}

const SubchapterForm: React.FC<SubchapterFormProps> = ({ chapterTitle, onAdd }) => {
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
        <h3 className="text-md font-medium mb-2">Add Subchapter to: {chapterTitle}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="subchapterTitle">Subchapter Title</Label>
            <Input
              id="subchapterTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter subchapter title"
              className="mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="subchapterDescription">Description (Optional)</Label>
            <Textarea
              id="subchapterDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter subchapter description"
              className="mt-1"
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Subchapter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubchapterForm; 