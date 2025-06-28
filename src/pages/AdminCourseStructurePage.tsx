import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, FileText, ListChecks, Plus, Sparkles, Eye, FileQuestion } from 'lucide-react';
import courseStructureService, { CourseStructure, Chapter, Subchapter, Section } from '@/services/courseStructureService';
import courseService from '@/services/courseService';
import authService from '@/services/authService';
import quizService, { IQuiz } from '@/services/quizService';
import { Badge } from '@/components/ui/badge';
import SectionContentModal from '@/components/admin/SectionContentModal';
import QuizPreviewModal from '@/components/admin/QuizPreviewModal';

// Interface for our component's state that includes both _id and id fields
interface ExtendedChapter extends Chapter {
  _id?: string;
}

interface ExtendedSubchapter extends Subchapter {
  _id?: string;
  quizzes?: IQuiz[];
}

interface ExtendedSection extends Section {
  _id?: string;
  generatedContent?: string;
}

interface ExtendedCourseStructure extends CourseStructure {
  _id?: string;
  courseId?: string;
}

const AdminCourseStructurePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const [courseStructure, setCourseStructure] = useState<ExtendedCourseStructure | null>(null);
  const [activeTab, setActiveTab] = useState('structure');
  const [expandedChapters, setExpandedChapters] = useState<{ [key: string]: boolean }>({});
  const [expandedSubchapters, setExpandedSubchapters] = useState<{ [key: string]: boolean }>({});
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null);
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  
  // Modal state for viewing section content
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [selectedSectionTitle, setSelectedSectionTitle] = useState('');
  const [selectedSectionContent, setSelectedSectionContent] = useState<string | undefined>('');
  const [loadingContent, setLoadingContent] = useState(false);
  
  // Modal state for viewing quiz content
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz | null>(null);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData.data.role === 'admin') {
          setIsAdmin(true);
          fetchCourseData();
        } else {
          toast.error('You do not have permission to access this page');
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Authentication error');
        navigate('/LoginPage');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigate, courseId]);

  // Get an ID from a chapter, subchapter, or section (handles both id and _id)
  const getItemId = (item: any): string => {
    return item.id || item._id || '';
  };

  // Fetch course data
  const fetchCourseData = async () => {
    try {
      setLoading(true);
      
      // Fetch course details
      const courseData = await courseService.getCourseById(courseId || '');
      setCourse(courseData);
      
      // Fetch course structure
      const structureData = await courseStructureService.getCourseStructure(courseId || '');
      console.log('Fetched course structure:', structureData);
      
      if (structureData) {
        setCourseStructure(structureData);
        
        // Initialize expanded state
        if (structureData.chapters) {
          const chaptersState = structureData.chapters.reduce<{ [key: string]: boolean }>((acc, chapter) => {
            const chapterId = getItemId(chapter);
            if (chapterId) {
              acc[chapterId] = true; // Set all chapters expanded by default
            }
            return acc;
          }, {});
          setExpandedChapters(chaptersState);
          
          const subchaptersState = structureData.chapters.reduce<{ [key: string]: boolean }>((acc, chapter) => {
            chapter.subchapters.forEach(subchapter => {
              const subchapterId = getItemId(subchapter);
              if (subchapterId) {
                acc[subchapterId] = false; // Set all subchapters collapsed by default
              }
            });
            return acc;
          }, {});
          setExpandedSubchapters(subchaptersState);
        }
      } else {
        console.log('No course structure data found');
      }
      
      // Fetch quizzes
      await fetchQuizzes();
      
    } catch (error) {
      console.error('Error fetching course data:', error);
      toast.error('Failed to load course data');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch quizzes for the course
  const fetchQuizzes = async () => {
    try {
      setLoadingQuizzes(true);
      const quizzesData = await quizService.getQuizzesByCourse(courseId || '');
      setQuizzes(quizzesData);
      console.log('Fetched quizzes:', quizzesData);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      toast.error('Failed to load quizzes');
    } finally {
      setLoadingQuizzes(false);
    }
  };
  
  // Get quizzes for a specific subchapter
  const getSubchapterQuizzes = (subchapterTitle: string): IQuiz[] => {
    return quizzes.filter(quiz => 
      quiz.title.toLowerCase().includes(subchapterTitle.toLowerCase())
    );
  };

  // Toggle chapter expansion
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  // Toggle subchapter expansion
  const toggleSubchapter = (subchapterId: string) => {
    setExpandedSubchapters(prev => ({
      ...prev,
      [subchapterId]: !prev[subchapterId]
    }));
  };
  
  // View section content
  const viewSectionContent = (section: ExtendedSection) => {
    setSelectedSectionTitle(section.title);
    setLoadingContent(true);
    setIsContentModalOpen(true);
    
    // If we have generatedContent in the section, use it directly
    if (section.generatedContent) {
      setSelectedSectionContent(section.generatedContent);
      setLoadingContent(false);
    } else {
      // Otherwise, display a message
      setSelectedSectionContent('No content available for this section.');
      setLoadingContent(false);
    }
  };
  
  // View quiz content
  const viewQuizContent = (quiz: IQuiz) => {
    setSelectedQuiz(quiz);
    setIsQuizModalOpen(true);
  };

  // Generate content using AI
  const handleGenerateContent = async () => {
    try {
      setLoading(true);
      toast.info('Generating content with AI. This may take a moment...');
      
      // Use API endpoint to generate content
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/courses/${courseId}/generate-all-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ forceRegenerate: true })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate content');
      }
      
      const result = await response.json();
      toast.success(`Content generated successfully! Created ${result.data.generatedQuizzes} quizzes.`);
      
      // Refresh data
      fetchCourseData();
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  // Navigate to course management
  const handleBackToManagement = () => {
    navigate('/admin/courses');
  };

  if (loading && !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <Spinner className="h-12 w-12 text-[#8A63FF]" />
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">You do not have permission to access this page.</p>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={handleBackToManagement}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course Management
        </Button>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{course?.title}</h1>
            <div className="flex items-center mt-1">
              <Badge className="capitalize mr-2">{course?.level}</Badge>
              <span className="text-gray-600">{course?.category}</span>
            </div>
          </div>
          {course?.category === 'AI Generated' && (
            <Button
              onClick={handleGenerateContent}
              className="bg-amber-500 hover:bg-amber-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Regenerate Content
                </>
              )}
            </Button>
          )}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="structure">
              <BookOpen className="mr-2 h-4 w-4" />
              Course Structure
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="structure" className="space-y-6">
            {courseStructure?.chapters?.length ? (
              courseStructure.chapters.map((chapter, chapterIndex) => {
                const chapterId = getItemId(chapter);
                return (
                  <Card key={chapterId || chapterIndex} className="mb-6">
                    <CardHeader 
                      className={`cursor-pointer ${expandedChapters[chapterId] ? 'border-b' : ''}`}
                      onClick={() => toggleChapter(chapterId)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            Chapter {chapterIndex + 1}: {chapter.title}
                          </CardTitle>
                          <CardDescription>{chapter.description}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          toggleChapter(chapterId);
                        }}>
                          {expandedChapters[chapterId] ? 'Collapse' : 'Expand'}
                        </Button>
                      </div>
                    </CardHeader>
                    
                    {expandedChapters[chapterId] && (
                      <CardContent className="pt-4">
                        {chapter.subchapters.map((subchapter, subchapterIndex) => {
                          const subchapterId = getItemId(subchapter);
                          const subchapterQuizzes = getSubchapterQuizzes(subchapter.title);
                          return (
                            <Card key={subchapterId || `${chapterIndex}-${subchapterIndex}`} className="mb-4">
                              <CardHeader 
                                className={`cursor-pointer ${expandedSubchapters[subchapterId] ? 'border-b' : ''}`}
                                onClick={() => toggleSubchapter(subchapterId)}
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <CardTitle className="text-md">
                                      {chapterIndex + 1}.{subchapterIndex + 1}: {subchapter.title}
                                    </CardTitle>
                                    <CardDescription>{subchapter.description}</CardDescription>
                                  </div>
                                  <div className="flex items-center">
                                    {subchapterQuizzes.length > 0 && (
                                      <Badge className="bg-blue-100 text-blue-800 mr-2">
                                        <FileQuestion className="h-3 w-3 mr-1" />
                                        {subchapterQuizzes.length} Quizzes
                                      </Badge>
                                    )}
                                    <Button variant="ghost" size="sm" onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSubchapter(subchapterId);
                                    }}>
                                      {expandedSubchapters[subchapterId] ? 'Collapse' : 'Expand'}
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                              
                              {expandedSubchapters[subchapterId] && (
                                <CardContent>
                                  <div className="mb-4">
                                    <h4 className="text-sm font-semibold mb-2">Sections</h4>
                                    {subchapter.sections.map((section, sectionIndex) => {
                                      const sectionId = getItemId(section);
                                      return (
                                        <Card 
                                          key={sectionId || `${chapterIndex}-${subchapterIndex}-${sectionIndex}`} 
                                          className="mb-2 border-l-4 border-l-[#8A63FF] hover:bg-gray-50 cursor-pointer"
                                          onClick={() => viewSectionContent(section as ExtendedSection)}
                                        >
                                          <CardHeader className="py-3">
                                            <div className="flex justify-between items-center">
                                              <CardTitle className="text-sm">
                                                {chapterIndex + 1}.{subchapterIndex + 1}.{sectionIndex + 1}: {section.title}
                                              </CardTitle>
                                              <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-8 w-8 p-0"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  viewSectionContent(section as ExtendedSection);
                                                }}
                                              >
                                                <Eye className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          </CardHeader>
                                          <CardContent className="pt-0 pb-3">
                                            <p className="text-sm text-gray-600">
                                              {(section as ExtendedSection).generatedContent ? 
                                                `${(section as ExtendedSection).generatedContent.substring(0, 150)}...` :
                                                'No content available'}
                                            </p>
                                          </CardContent>
                                        </Card>
                                      );
                                    })}
                                  </div>
                                  
                                  {subchapterQuizzes.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-semibold mb-2">Quizzes</h4>
                                      {subchapterQuizzes.map((quiz) => (
                                        <Card 
                                          key={quiz._id} 
                                          className="mb-2 border-l-4 border-l-blue-500 hover:bg-gray-50 cursor-pointer"
                                          onClick={() => viewQuizContent(quiz)}
                                        >
                                          <CardHeader className="py-3">
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <CardTitle className="text-sm">{quiz.title}</CardTitle>
                                                <CardDescription className="text-xs">
                                                  {quiz.questions.length} questions | {quiz.timeLimit} min | Pass: {quiz.passingScore}%
                                                </CardDescription>
                                              </div>
                                              <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-8 w-8 p-0"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  viewQuizContent(quiz);
                                                }}
                                              >
                                                <Eye className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          </CardHeader>
                                        </Card>
                                      ))}
                                    </div>
                                  )}
                                </CardContent>
                              )}
                            </Card>
                          );
                        })}
                      </CardContent>
                    )}
                  </Card>
                );
              })
            ) : (
              <Card className="py-12">
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">No course structure yet</h3>
                    <p className="text-gray-500 mb-4">This course doesn't have a structure defined</p>
                    <Button
                      onClick={handleGenerateContent}
                      className="bg-amber-500 hover:bg-amber-600"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Section Content Modal */}
        <SectionContentModal
          isOpen={isContentModalOpen}
          onClose={() => setIsContentModalOpen(false)}
          title={selectedSectionTitle}
          content={selectedSectionContent}
          isLoading={loadingContent}
        />
        
        {/* Quiz Preview Modal */}
        {selectedQuiz && (
          <QuizPreviewModal
            isOpen={isQuizModalOpen}
            onClose={() => setIsQuizModalOpen(false)}
            quiz={selectedQuiz}
          />
        )}
      </div>
    </div>
  );
};

export default AdminCourseStructurePage; 