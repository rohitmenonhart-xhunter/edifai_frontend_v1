import React, { useState } from 'react';
import ChapterForm from './ChapterForm';
import SubchapterForm from './SubchapterForm';
import SectionForm from './SectionForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Chapter {
  id: string;
  title: string;
  description: string;
  subchapters: Subchapter[];
  expanded?: boolean;
}

interface Subchapter {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  expanded?: boolean;
}

interface Section {
  id: string;
  title: string;
  content: string;
}

interface CourseStructureBuilderProps {
  courseId?: string;
  onSave: (structure: { 
    chapters: Chapter[] 
  }) => void;
}

const CourseStructureBuilder: React.FC<CourseStructureBuilderProps> = ({ courseId, onSave }) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedSubchapter, setSelectedSubchapter] = useState<string | null>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addChapter = (chapter: { title: string; description: string }) => {
    const newChapter: Chapter = {
      id: generateId(),
      title: chapter.title,
      description: chapter.description,
      subchapters: [],
      expanded: true
    };
    setChapters([...chapters, newChapter]);
    setSelectedChapter(newChapter.id);
  };

  const addSubchapter = (chapterId: string, subchapter: { title: string; description: string }) => {
    const newSubchapter: Subchapter = {
      id: generateId(),
      title: subchapter.title,
      description: subchapter.description,
      sections: [],
      expanded: true
    };
    
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          subchapters: [...chapter.subchapters, newSubchapter]
        };
      }
      return chapter;
    }));
    setSelectedSubchapter(newSubchapter.id);
  };

  const addSection = (chapterId: string, subchapterId: string, section: { title: string; content: string }) => {
    const newSection: Section = {
      id: generateId(),
      title: section.title,
      content: section.content
    };
    
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          subchapters: chapter.subchapters.map(subchapter => {
            if (subchapter.id === subchapterId) {
              return {
                ...subchapter,
                sections: [...subchapter.sections, newSection]
              };
            }
            return subchapter;
          })
        };
      }
      return chapter;
    }));
  };

  const removeChapter = (chapterId: string) => {
    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
    if (selectedChapter === chapterId) {
      setSelectedChapter(null);
      setSelectedSubchapter(null);
    }
  };

  const removeSubchapter = (chapterId: string, subchapterId: string) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          subchapters: chapter.subchapters.filter(subchapter => subchapter.id !== subchapterId)
        };
      }
      return chapter;
    }));
    
    if (selectedSubchapter === subchapterId) {
      setSelectedSubchapter(null);
    }
  };

  const removeSection = (chapterId: string, subchapterId: string, sectionId: string) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          subchapters: chapter.subchapters.map(subchapter => {
            if (subchapter.id === subchapterId) {
              return {
                ...subchapter,
                sections: subchapter.sections.filter(section => section.id !== sectionId)
              };
            }
            return subchapter;
          })
        };
      }
      return chapter;
    }));
  };

  const toggleChapterExpand = (chapterId: string) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return { ...chapter, expanded: !chapter.expanded };
      }
      return chapter;
    }));
  };

  const toggleSubchapterExpand = (chapterId: string, subchapterId: string) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          subchapters: chapter.subchapters.map(subchapter => {
            if (subchapter.id === subchapterId) {
              return { ...subchapter, expanded: !subchapter.expanded };
            }
            return subchapter;
          })
        };
      }
      return chapter;
    }));
  };

  const handleSave = () => {
    // Clean up expanded flags before saving
    const cleanStructure = {
      chapters: chapters.map(chapter => ({
        ...chapter,
        expanded: undefined,
        subchapters: chapter.subchapters.map(subchapter => ({
          ...subchapter,
          expanded: undefined,
        }))
      }))
    };
    onSave(cleanStructure);
  };

  const getSelectedChapter = () => {
    return chapters.find(chapter => chapter.id === selectedChapter);
  };

  const getSelectedSubchapter = () => {
    const chapter = chapters.find(chapter => chapter.id === selectedChapter);
    if (!chapter) return null;
    return chapter.subchapters.find(subchapter => subchapter.id === selectedSubchapter);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
            </CardHeader>
            <CardContent>
              {chapters.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Start by adding chapters to your course
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {chapters.map(chapter => (
                    <Card key={chapter.id} className={`border ${selectedChapter === chapter.id ? 'border-primary' : 'border-muted'}`}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div 
                            className="flex items-center cursor-pointer" 
                            onClick={() => toggleChapterExpand(chapter.id)}
                          >
                            {chapter.expanded ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronUp className="h-4 w-4 mr-2" />}
                            <h3 className="font-medium">{chapter.title}</h3>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => setSelectedChapter(chapter.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => removeChapter(chapter.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        
                        {chapter.description && (
                          <p className="text-sm text-muted-foreground">{chapter.description}</p>
                        )}

                        {chapter.expanded && chapter.subchapters.length > 0 && (
                          <div className="pl-6 mt-3 space-y-3">
                            {chapter.subchapters.map(subchapter => (
                              <Card key={subchapter.id} className={`border ${selectedSubchapter === subchapter.id ? 'border-primary' : 'border-muted'}`}>
                                <CardContent className="p-2">
                                  <div className="flex items-center justify-between mb-1">
                                    <div 
                                      className="flex items-center cursor-pointer" 
                                      onClick={() => toggleSubchapterExpand(chapter.id, subchapter.id)}
                                    >
                                      {subchapter.expanded ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronUp className="h-4 w-4 mr-2" />}
                                      <h4 className="text-sm font-medium">{subchapter.title}</h4>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => {
                                          setSelectedChapter(chapter.id);
                                          setSelectedSubchapter(subchapter.id);
                                        }}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={() => removeSubchapter(chapter.id, subchapter.id)}
                                      >
                                        <Trash2 className="h-3 w-3 text-destructive" />
                                      </Button>
                                    </div>
                                  </div>

                                  {subchapter.expanded && subchapter.sections.length > 0 && (
                                    <div className="pl-6 mt-2 space-y-1">
                                      {subchapter.sections.map(section => (
                                        <div key={section.id} className="flex items-center justify-between text-xs">
                                          <span>{section.title}</span>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6"
                                            onClick={() => removeSection(chapter.id, subchapter.id, section.id)}
                                          >
                                            <Trash2 className="h-3 w-3 text-destructive" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <Button onClick={handleSave} className="w-full">
              Save Course Structure
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <ChapterForm onAdd={addChapter} />
          
          {selectedChapter && getSelectedChapter() && (
            <>
              <Separator />
              <SubchapterForm 
                chapterTitle={getSelectedChapter()?.title || ''} 
                onAdd={(subchapter) => addSubchapter(selectedChapter, subchapter)} 
              />
            </>
          )}
          
          {selectedChapter && selectedSubchapter && getSelectedSubchapter() && (
            <>
              <Separator />
              <SectionForm 
                subchapterTitle={getSelectedSubchapter()?.title || ''} 
                onAdd={(section) => addSection(selectedChapter, selectedSubchapter, section)} 
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseStructureBuilder; 