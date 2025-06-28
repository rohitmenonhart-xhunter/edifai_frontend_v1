import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, ChevronDown, ChevronUp, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

interface Chapter {
  title: string;
  description: string;
  subchapters: {
    title: string;
    description: string;
  }[];
}

interface ChapterSubchapterFormProps {
  onSubmit: (structure: Chapter[]) => void;
  isLoading: boolean;
}

const ChapterSubchapterForm: React.FC<ChapterSubchapterFormProps> = ({ onSubmit, isLoading }) => {
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      title: '',
      description: '',
      subchapters: [{ title: '', description: '' }]
    }
  ]);

  const addChapter = () => {
    setChapters([
      ...chapters, 
      {
        title: '',
        description: '',
        subchapters: [{ title: '', description: '' }]
      }
    ]);
  };

  const removeChapter = (chapterIndex: number) => {
    if (chapters.length === 1) {
      toast.error("You need at least one chapter");
      return;
    }
    
    const updatedChapters = chapters.filter((_, index) => index !== chapterIndex);
    setChapters(updatedChapters);
  };

  const addSubchapter = (chapterIndex: number) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].subchapters.push({ title: '', description: '' });
    setChapters(updatedChapters);
  };

  const removeSubchapter = (chapterIndex: number, subchapterIndex: number) => {
    if (chapters[chapterIndex].subchapters.length === 1) {
      toast.error("Each chapter needs at least one subchapter");
      return;
    }
    
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].subchapters = updatedChapters[chapterIndex].subchapters.filter(
      (_, index) => index !== subchapterIndex
    );
    setChapters(updatedChapters);
  };

  const updateChapter = (chapterIndex: number, field: keyof Chapter, value: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex] = {
      ...updatedChapters[chapterIndex],
      [field]: value
    };
    setChapters(updatedChapters);
  };

  const updateSubchapter = (
    chapterIndex: number,
    subchapterIndex: number,
    field: 'title' | 'description',
    value: string
  ) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].subchapters[subchapterIndex] = {
      ...updatedChapters[chapterIndex].subchapters[subchapterIndex],
      [field]: value
    };
    setChapters(updatedChapters);
  };

  const handleSubmit = () => {
    // Validate that all chapters and subchapters have titles
    const hasEmptyChapterTitles = chapters.some(chapter => !chapter.title.trim());
    const hasEmptySubchapterTitles = chapters.some(chapter => 
      chapter.subchapters.some(subchapter => !subchapter.title.trim())
    );
    
    if (hasEmptyChapterTitles) {
      toast.error("All chapters must have titles");
      return;
    }
    
    if (hasEmptySubchapterTitles) {
      toast.error("All subchapters must have titles");
      return;
    }
    
    onSubmit(chapters);
  };

  const moveChapter = (chapterIndex: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && chapterIndex === 0) || 
      (direction === 'down' && chapterIndex === chapters.length - 1)
    ) {
      return;
    }
    
    const updatedChapters = [...chapters];
    const newIndex = direction === 'up' ? chapterIndex - 1 : chapterIndex + 1;
    
    [updatedChapters[chapterIndex], updatedChapters[newIndex]] = 
      [updatedChapters[newIndex], updatedChapters[chapterIndex]];
    
    setChapters(updatedChapters);
  };

  const moveSubchapter = (chapterIndex: number, subchapterIndex: number, direction: 'up' | 'down') => {
    const subchapters = chapters[chapterIndex].subchapters;
    
    if (
      (direction === 'up' && subchapterIndex === 0) || 
      (direction === 'down' && subchapterIndex === subchapters.length - 1)
    ) {
      return;
    }
    
    const updatedChapters = [...chapters];
    const newIndex = direction === 'up' ? subchapterIndex - 1 : subchapterIndex + 1;
    
    [updatedChapters[chapterIndex].subchapters[subchapterIndex], updatedChapters[chapterIndex].subchapters[newIndex]] = 
      [updatedChapters[chapterIndex].subchapters[newIndex], updatedChapters[chapterIndex].subchapters[subchapterIndex]];
    
    setChapters(updatedChapters);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Course Structure</h2>
        <Button onClick={addChapter}>
          <Plus className="h-4 w-4 mr-2" />
          Add Chapter
        </Button>
      </div>
      
      {chapters.map((chapter, chapterIndex) => (
        <Card key={chapterIndex} className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Chapter {chapterIndex + 1}</CardTitle>
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => moveChapter(chapterIndex, 'up')}
                  disabled={chapterIndex === 0}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => moveChapter(chapterIndex, 'down')}
                  disabled={chapterIndex === chapters.length - 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeChapter(chapterIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chapter Title*
              </label>
              <Input
                value={chapter.title}
                onChange={(e) => updateChapter(chapterIndex, 'title', e.target.value)}
                placeholder="Enter chapter title"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chapter Description (Optional)
              </label>
              <Textarea
                value={chapter.description}
                onChange={(e) => updateChapter(chapterIndex, 'description', e.target.value)}
                placeholder="Enter chapter description"
                className="w-full"
                rows={2}
              />
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium">Subchapters</h3>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => addSubchapter(chapterIndex)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Subchapter
                </Button>
              </div>
              
              {chapter.subchapters.map((subchapter, subchapterIndex) => (
                <Card key={subchapterIndex} className="mb-3 border-l-4 border-l-[#8A63FF]">
                  <CardHeader className="py-2 px-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm">Subchapter {subchapterIndex + 1}</CardTitle>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => moveSubchapter(chapterIndex, subchapterIndex, 'up')}
                          disabled={subchapterIndex === 0}
                          className="h-6 w-6 p-0"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => moveSubchapter(chapterIndex, subchapterIndex, 'down')}
                          disabled={subchapterIndex === chapter.subchapters.length - 1}
                          className="h-6 w-6 p-0"
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeSubchapter(chapterIndex, subchapterIndex)}
                          className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="py-2 px-3">
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Subchapter Title*
                        </label>
                        <Input
                          value={subchapter.title}
                          onChange={(e) => updateSubchapter(chapterIndex, subchapterIndex, 'title', e.target.value)}
                          placeholder="Enter subchapter title"
                          className="w-full text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Subchapter Description (Optional)
                        </label>
                        <Textarea
                          value={subchapter.description}
                          onChange={(e) => updateSubchapter(chapterIndex, subchapterIndex, 'description', e.target.value)}
                          placeholder="Enter subchapter description"
                          className="w-full text-sm"
                          rows={2}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          className="bg-amber-500 hover:bg-amber-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Generate Course Content
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChapterSubchapterForm; 