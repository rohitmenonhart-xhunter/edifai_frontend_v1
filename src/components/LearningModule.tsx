import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { getCourseById, ICourse, ILesson } from '@/services/courseService';
import { getEnrolledCourses, updateCourseProgress } from '@/services/profileService';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import QuizList from '@/components/QuizList';
import { confetti } from '@/lib/confetti';
import courseStructureService, { CourseStructure, Chapter, Subchapter, Section } from '@/services/courseStructureService';
import { ChevronDown, ChevronRight, BookOpen, FileQuestion, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import quizService from '@/services/quizService';
import { Link } from 'react-router-dom';

const LearningModule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // State for course data
  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for learning module UI
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('structure');
  
  // Course structure data
  const [courseStructure, setCourseStructure] = useState<CourseStructure | null>(null);
  const [loadingStructure, setLoadingStructure] = useState<boolean>(false);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedSubchapters, setExpandedSubchapters] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<{
    chapterIndex: number;
    subchapterIndex: number;
    sectionIndex: number;
    title: string;
    content: string;
  } | null>(null);
  
  // Completed sections tracking
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  // Add these state variables inside the component
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());
  const [quizzesBySubchapter, setQuizzesBySubchapter] = useState<{[key: string]: any[]}>({});
  const [loadingQuizzes, setLoadingQuizzes] = useState<boolean>(false);

  // Fetch course data
  useEffect(() => {
    if (id) {
    fetchCourseData();
      fetchUserQuizProgress();
    }
  }, [id]);

  // Add this new effect to handle course completion state
  useEffect(() => {
    // Only mark as completed if progress is exactly 100%
    if (progress === 100 && !isCompleted) {
      setIsCompleted(true);
      toast.success("Congratulations! You've completed this course!");
      confetti();
    }
  }, [progress]);

  // Refresh quiz attempts when the component is focused (e.g., after completing a quiz)
  useEffect(() => {
    if (!id) return;
    
    const handleFocus = () => {
      console.log('Window focused, refreshing quiz attempts');
      fetchUserQuizProgress();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [id]);

  const fetchCourseData = async () => {
    if (!id) {
      setError('Course ID not found');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const courseData = await getCourseById(id);
      
      if (!courseData) {
        setError('Course not found');
        setLoading(false);
        return;
      }
      
      setCourse(courseData);
      
      // Fetch course structure data
      try {
        setLoadingStructure(true);
        const structureData = await courseStructureService.getCourseStructure(id);
        setCourseStructure(structureData);
        
        // If there are chapters, expand the first one by default
        if (structureData && structureData.chapters && structureData.chapters.length > 0) {
          setExpandedChapters([structureData.chapters[0].id]);
          
          // If the first chapter has subchapters, expand the first one
          if (structureData.chapters[0].subchapters && structureData.chapters[0].subchapters.length > 0) {
            setExpandedSubchapters([structureData.chapters[0].subchapters[0].id]);
            
            // Select the first section by default
            if (structureData.chapters[0].subchapters[0].sections && 
                structureData.chapters[0].subchapters[0].sections.length > 0) {
              const firstSection = structureData.chapters[0].subchapters[0].sections[0];
              setSelectedSection({
                chapterIndex: 0,
                subchapterIndex: 0,
                sectionIndex: 0,
                title: firstSection.title,
                content: firstSection.generatedContent || 'No content available for this section.'
              });
            }
          }
        }
        
        setLoadingStructure(false);
      } catch (structureError) {
        console.error("Error fetching course structure:", structureError);
        setLoadingStructure(false);
      }
      
      // Fetch user's progress for this course
      try {
        const enrolledCourses = await getEnrolledCourses();
        const currentCourse = enrolledCourses.find((course: any) => course.id === id);
        
        if (currentCourse) {
          // Set progress and completion status
          const userProgress = currentCourse.progress || 0;
          setProgress(userProgress);
          setIsCompleted(userProgress === 100);
          
          // If user has progress, select the appropriate lesson
          if (userProgress > 0 && userProgress < 100 && currentCourse.currentLesson !== undefined) {
            setCurrentLessonIndex(currentCourse.currentLesson);
          }
        }
      } catch (err) {
        console.error("Error fetching user progress:", err);
      }
      
    } catch (err: any) {
      console.error('Error fetching course:', err);
      setError(err.message || 'Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user quiz progress for this course
  const fetchUserQuizProgress = async () => {
    try {
      setLoadingQuizzes(true);
      
      // Get all quizzes for this course
      const quizzesResponse = await quizService.getQuizzesByCourse(id);
      console.log('All course quizzes:', quizzesResponse);
      
      // Get all quiz attempts for this course
      const attemptsResponse = await quizService.getUserQuizAttemptsByCourse(id);
      console.log('User quiz attempts:', attemptsResponse);
      
      // Organize quizzes by subchapter title for easier access
      const quizzesBySubchapterMap = new Map();
      
      quizzesResponse.forEach((quiz: any) => {
        const subchapterTitle = quiz.subchapter || 'Uncategorized';
        if (!quizzesBySubchapterMap.has(subchapterTitle)) {
          quizzesBySubchapterMap.set(subchapterTitle, []);
        }
        quizzesBySubchapterMap.get(subchapterTitle).push(quiz);
      });
      
      setQuizzesBySubchapter(Object.fromEntries(quizzesBySubchapterMap));
      
      // Track completed quizzes
      const completedQuizzesSet = new Set<string>();
      
      attemptsResponse.forEach((attempt: any) => {
        // Make sure we're using the correct property to get the quiz ID
        if (attempt.quiz && attempt.quiz._id && attempt.passed) {
          completedQuizzesSet.add(attempt.quiz._id);
          console.log(`Adding completed quiz: ${attempt.quiz._id}`);
        }
      });
      
      console.log('Completed quizzes set:', completedQuizzesSet);
      setCompletedQuizzes(completedQuizzesSet);
      
    } catch (error) {
      console.error('Error fetching quiz progress:', error);
    } finally {
      setLoadingQuizzes(false);
    }
  };

  // Update progress when navigating to a new section
  const updateProgress = async (chapterIndex: number, subchapterIndex: number, sectionIndex: number) => {
    if (!course || !id || !courseStructure) return;
    
    try {
      // Create a unique identifier for this section
      const sectionId = `${chapterIndex}-${subchapterIndex}-${sectionIndex}`;
      
      // Add to completed sections if not already there
      if (!completedSections.has(sectionId)) {
        const newCompletedSections = new Set(completedSections);
        newCompletedSections.add(sectionId);
        setCompletedSections(newCompletedSections);
        
        // Calculate total sections in the course
        let totalSections = 0;
        courseStructure.chapters.forEach(chapter => {
          chapter.subchapters.forEach(subchapter => {
            totalSections += subchapter.sections.length;
          });
        });
        
        // Calculate new progress percentage
        const newProgress = Math.min(Math.round((newCompletedSections.size / totalSections) * 100), 100);
      setProgress(newProgress);
      
        // Update progress in database
        await updateProgressInDatabase(newProgress, chapterIndex, newProgress === 100);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  // Update the progress tracking function
  const updateProgressInDatabase = async (newProgress: number, currentLesson: number, completed: boolean) => {
    if (!id) return;
    
    try {
      const progressData = {
        progress: newProgress,
        currentLesson: currentLesson,
        completed: completed
      };
      
      await updateCourseProgress(id, progressData);
      console.log(`Progress updated to ${newProgress}%`);
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Failed to update your progress");
    }
  };

  // Handle lesson navigation
  const handleSelectLesson = (index: number) => {
    setCurrentLessonIndex(index);
  };

  // Toggle chapter expansion in course structure
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId) 
        : [...prev, chapterId]
    );
  };

  // Toggle subchapter expansion in course structure
  const toggleSubchapter = (subchapterId: string) => {
    setExpandedSubchapters(prev => 
      prev.includes(subchapterId) 
        ? prev.filter(id => id !== subchapterId) 
        : [...prev, subchapterId]
    );
  };

  // Select a section to display its content
  const handleSelectSection = (chapterIndex: number, subchapterIndex: number, sectionIndex: number) => {
    if (!courseStructure) return;
    
    // Check if the chapter and subchapter are unlocked
    const chapterUnlocked = isChapterUnlocked(chapterIndex);
    const subchapterUnlocked = isSubchapterUnlocked(chapterIndex, subchapterIndex);
    
    if (!chapterUnlocked) {
      toast.error("Complete all sections and at least one quiz in the previous chapter to unlock this content");
      return;
    }
    
    if (!subchapterUnlocked) {
      toast.error("Complete all sections and at least one quiz in the previous subchapter to unlock this content");
      return;
    }
    
    const chapter = courseStructure.chapters[chapterIndex];
    const subchapter = chapter.subchapters[subchapterIndex];
    const section = subchapter.sections[sectionIndex];
    
    setSelectedSection({
      chapterIndex,
      subchapterIndex,
      sectionIndex,
      title: section.title,
      content: section.generatedContent || 'No content available for this section.'
    });
    
    // Update progress
    updateProgress(chapterIndex, subchapterIndex, sectionIndex);
  };

  // Add this event handler to handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleBack = () => {
    navigate(`/course/${id}`);
  };

  // Check if a chapter is unlocked
  const isChapterUnlocked = (chapterIndex: number): boolean => {
    if (chapterIndex === 0) return true; // First chapter is always unlocked
    
    // Check if previous chapter is completed
    if (!courseStructure) return false;
    
    const prevChapter = courseStructure.chapters[chapterIndex - 1];
    if (!prevChapter) return true;
    
    // Check if all sections in previous chapter are completed
    let allSectionsCompleted = true;
    prevChapter.subchapters.forEach((subchapter, subchapterIndex) => {
      subchapter.sections.forEach((section, sectionIndex) => {
        const sectionId = `${chapterIndex - 1}-${subchapterIndex}-${sectionIndex}`;
        if (!completedSections.has(sectionId)) {
          allSectionsCompleted = false;
        }
      });
    });
    
    // Check if at least one quiz in the previous chapter is completed
    let hasCompletedAtLeastOneQuiz = false;
    let hasQuizzes = false;
    
    prevChapter.subchapters.forEach((subchapter) => {
      const quizzes = quizzesBySubchapter[subchapter.title] || [];
      if (quizzes.length > 0) {
        hasQuizzes = true;
        const anyQuizCompleted = quizzes.some((quiz: any) => 
          completedQuizzes.has(quiz._id)
        );
        if (anyQuizCompleted) {
          hasCompletedAtLeastOneQuiz = true;
        }
      }
    });
    
    console.log(`Chapter ${chapterIndex} unlock status:`, 
      `All sections completed: ${allSectionsCompleted}, Has quizzes: ${hasQuizzes}, Has completed quiz: ${hasCompletedAtLeastOneQuiz}`);
    
    // If there are no quizzes, only check sections completion
    // If there are quizzes, require at least one quiz to be completed
    return allSectionsCompleted && (!hasQuizzes || hasCompletedAtLeastOneQuiz);
  };

  // Check if a subchapter is unlocked
  const isSubchapterUnlocked = (chapterIndex: number, subchapterIndex: number) => {
    // First subchapter of the first chapter is always unlocked
    if (chapterIndex === 0 && subchapterIndex === 0) return true;
    
    // If the chapter is not unlocked, the subchapter is not unlocked
    if (!isChapterUnlocked(chapterIndex)) return false;
    
    // First subchapter of any unlocked chapter is always unlocked
    if (subchapterIndex === 0) return true;
    
    // For other subchapters, check if the previous subchapter is completed
    const chapter = courseStructure?.chapters[chapterIndex];
    const previousSubchapter = chapter?.subchapters[subchapterIndex - 1];
    
    if (!previousSubchapter) return false;
    
    // Check if all sections in the previous subchapter are completed
    const allSectionsCompleted = previousSubchapter.sections?.every((section: any, sectionIndex: number) => {
      const sectionId = `${chapterIndex}-${subchapterIndex - 1}-${sectionIndex}`;
      return completedSections.has(sectionId);
    }) ?? false;
    
    // Check if at least one quiz in the previous subchapter is completed
    const previousSubchapterTitle = previousSubchapter.title;
    const quizzesForPreviousSubchapter = quizzesBySubchapter[previousSubchapterTitle] || [];
    
    console.log(`Checking quizzes for subchapter "${previousSubchapterTitle}":`, quizzesForPreviousSubchapter);
    
    const hasCompletedQuiz = quizzesForPreviousSubchapter.length === 0 || quizzesForPreviousSubchapter.some(
      (quiz: any) => {
        const isCompleted = completedQuizzes.has(quiz._id);
        console.log(`Quiz ${quiz._id} completion check:`, isCompleted);
        return isCompleted;
      }
    );
    
    console.log(`Subchapter ${chapterIndex}.${subchapterIndex} unlock status:`, 
      `All sections completed: ${allSectionsCompleted}, Has completed quiz: ${hasCompletedQuiz}`);
    
    return allSectionsCompleted && hasCompletedQuiz;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-white items-center justify-center">
        <Spinner className="h-12 w-12 text-[#8A63FF]" />
        <span className="ml-3 text-gray-600">Loading course content...</span>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-screen bg-white items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            {error || 'Course not found'}
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="bg-[#8A63FF] text-white px-4 py-2 rounded-lg hover:bg-[#6D28D9] transition"
          >
            Go Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Render course structure tab content
  const renderCourseStructure = () => {
    if (loadingStructure || loadingQuizzes) {
      return (
        <div className="flex justify-center py-8">
          <Spinner className="h-8 w-8 text-[#8A63FF]" />
          <span className="ml-3 text-gray-600">Loading course structure...</span>
        </div>
      );
    }
    
    if (!courseStructure || !courseStructure.chapters || courseStructure.chapters.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No structured content available for this course.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-2">
        {courseStructure.chapters.map((chapter, chapterIndex) => {
          // Create a unique identifier for this chapter
          const chapterId = chapter.id;
          const isExpanded = expandedChapters.includes(chapterId);
          const unlocked = isChapterUnlocked(chapterIndex);
          
          return (
            <div key={chapterId} className="border rounded-md overflow-hidden">
              <div 
                className={`flex items-center justify-between p-3 ${
                  unlocked ? 'bg-gray-50 cursor-pointer hover:bg-gray-100' : 'bg-gray-100 cursor-not-allowed'
                } transition-colors`}
                onClick={() => unlocked && toggleChapter(chapterId)}
              >
                <div className="flex items-center gap-2">
                  {unlocked ? (
                    isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-600" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    )
                  ) : (
                    <Lock className="h-4 w-4 text-gray-400" />
                  )}
                  <span className={`font-medium ${!unlocked ? 'text-gray-400' : ''}`}>
                    {chapterIndex + 1}. {chapter.title}
                  </span>
            </div>
                
                {!unlocked && (
                  <Badge variant="outline" className="text-gray-400 border-gray-300">
                    Complete previous chapter and one quiz to unlock
                  </Badge>
                )}
          </div>
              
              {isExpanded && unlocked && (
                <div className="pl-4 pr-2 pb-2">
                  {chapter.subchapters.map((subchapter, subchapterIndex) => {
                    // Create a unique identifier for this subchapter
                    const subchapterId = subchapter.id;
                    const isSubExpanded = expandedSubchapters.includes(subchapterId);
                    const subUnlocked = isSubchapterUnlocked(chapterIndex, subchapterIndex);
                    
                    // Check if this subchapter has quizzes
                    const hasQuizzes = (quizzesBySubchapter[subchapter.title]?.length || 0) > 0;
                    const hasCompletedQuiz = hasQuizzes && quizzesBySubchapter[subchapter.title]?.some(
                      (quiz: any) => {
                        // Log the quiz ID and check if it's in the completedQuizzes set
                        const isCompleted = completedQuizzes.has(quiz._id);
                        console.log(`Checking if quiz ${quiz._id} is completed:`, isCompleted, completedQuizzes);
                        return isCompleted;
                      }
                    );
                    
                    return (
                      <div key={subchapterId} className="mt-1 border-l-2 border-gray-200">
                        <div 
                          className={`flex items-center justify-between ml-2 p-2 rounded-md ${
                            subUnlocked ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed bg-gray-50'
                          } transition-colors`}
                          onClick={() => subUnlocked && toggleSubchapter(subchapterId)}
                        >
                          <div className="flex items-center">
                            {subUnlocked ? (
                              isSubExpanded ? (
                                <ChevronDown className="h-4 w-4 text-gray-600 mr-2" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-600 mr-2" />
                              )
                            ) : (
                              <Lock className="h-4 w-4 text-gray-400 mr-2" />
                            )}
                            <span className={`font-medium text-sm ${!subUnlocked ? 'text-gray-400' : ''}`}>
                              {chapterIndex + 1}.{subchapterIndex + 1} {subchapter.title}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {hasQuizzes && (
                              <Badge className={hasCompletedQuiz ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                                {hasCompletedQuiz ? "Quiz Completed" : "Has Quiz"}
                              </Badge>
                            )}
                            
                            {!subUnlocked && (
                              <Badge variant="outline" className="text-gray-400 border-gray-300 text-xs">
                                Locked
                              </Badge>
                            )}
          </div>
        </div>
                        
                        {/* Show quizzes for this subchapter if expanded */}
                        {isSubExpanded && subchapter.sections && (
                          <div className="ml-4 space-y-1">
                            {subchapter.sections.map((section: Section, sectionIndex: number) => {
                              const sectionId = `${chapterId}-${subchapterId}-${sectionIndex}`;
                              const isSelected = selectedSection && 
                                selectedSection.chapterIndex === chapterIndex && 
                                selectedSection.subchapterIndex === subchapterIndex && 
                                selectedSection.sectionIndex === sectionIndex;
                              
                              return (
                                <div 
                                  key={sectionId} 
                                  className={`p-2 rounded-md text-sm ${
                                    subUnlocked 
                                      ? isSelected 
                                        ? 'bg-blue-50 text-blue-700 font-medium' 
                                        : 'hover:bg-gray-50 cursor-pointer'
                                      : 'text-gray-400 cursor-not-allowed'
                                  }`}
                                  onClick={() => handleSelectSection(chapterIndex, subchapterIndex, sectionIndex)}
                                >
                                  {chapterIndex + 1}.{subchapterIndex + 1}.{sectionIndex + 1} {section.title}
                                </div>
                              );
                            })}
                            
                            {/* Display quizzes for this subchapter */}
                            {quizzesBySubchapter[subchapter.title]?.map((quiz: any) => {
                              const isQuizCompleted = completedQuizzes.has(quiz._id);
                              console.log(`Rendering quiz ${quiz._id}, completed:`, isQuizCompleted, completedQuizzes);
                              
                              return (
                                <Link 
                                  key={quiz._id} 
                                  to={`/quiz/${quiz._id}`}
                                  className={`p-2 rounded-md text-sm flex items-center ${
                                    subUnlocked 
                                      ? 'hover:bg-gray-50 cursor-pointer' 
                                      : 'text-gray-400 cursor-not-allowed'
                                  } ${isQuizCompleted ? 'text-green-600' : ''}`}
                                  onClick={(e) => !subUnlocked && e.preventDefault()}
                                >
                                  <FileQuestion className="h-4 w-4 mr-2" />
                                  <span>Quiz: {quiz.title}</span>
                                  {isQuizCompleted && <CheckCircle2 className="h-4 w-4 ml-2 text-green-500" />}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render section content
  const renderSectionContent = () => {
    if (!selectedSection) {
      return (
        <div className="flex flex-col items-center justify-center h-full py-16">
          <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500 text-center">
            Select a section from the course structure to view its content.
          </p>
        </div>
      );
    }

    // Format the content properly
    const formatContent = (content: string) => {
      if (!content) return '';

      // Extract and format metadata from content
      let formattedContent = content;

      // Extract course, chapter, subchapter, section info
      const courseMatch = formattedContent.match(/# Course: ([^\n]+)/);
      const chapterMatch = formattedContent.match(/## Chapter: ([^\n]+)/);
      const subchapterMatch = formattedContent.match(/### Subchapter: ([^\n]+)/);
      const sectionMatch = formattedContent.match(/#### Section: ([^\n]+)/);
      
      // Extract difficulty level
      const difficultyMatch = formattedContent.match(/#### Difficulty Level: ([^\n]+)/);
      const difficulty = difficultyMatch ? difficultyMatch[1] : null;
      
      // Extract learning objectives
      const learningObjectivesMatch = formattedContent.match(/### Learning Objectives:([\s\S]*?)(?=###|$)/);
      const learningObjectives = learningObjectivesMatch ? learningObjectivesMatch[1].trim() : null;

      // Handle numbered headings (e.g. "2. Main Content with Relevant Examples")
      formattedContent = formattedContent.replace(/(\d+)\.\s+([^\n]+)/g, (_, number, title) => {
        return `<h2 class="text-2xl font-bold mt-8 mb-4">${number}. ${title}</h2>`;
      });

      // Handle "What is a `div`?" style headings
      formattedContent = formattedContent.replace(/What is a \`([^`]+)\`\?/g, (_, element) => {
        return `<h3 class="text-xl font-semibold mt-6 mb-3">What is a <code class="bg-gray-100 px-1 py-0.5 rounded">${element}</code>?</h3>`;
      });

      // Handle "The `div`" style text
      formattedContent = formattedContent.replace(/The \`([^`]+)\`/g, (_, element) => {
        return `<p class="my-3">The <code class="bg-gray-100 px-1 py-0.5 rounded">${element}</code></p>`;
      });

      // Handle "`div` element" style text
      formattedContent = formattedContent.replace(/\`([^`]+)\` element/g, (_, element) => {
        return `<code class="bg-gray-100 px-1 py-0.5 rounded">${element}</code> element`;
      });

      // Handle "Key Properties of `div`:" style headings
      formattedContent = formattedContent.replace(/Key Properties of \`([^`]+)\`:/g, (_, element) => {
        return `<h3 class="text-xl font-semibold mt-6 mb-3">Key Properties of <code class="bg-gray-100 px-1 py-0.5 rounded">${element}</code>:</h3>`;
      });

      // Handle bullet points with bold text
      formattedContent = formattedContent.replace(/• (\*\*[^:]+:\*\*) (.*)/g, (_, boldPart, restText) => {
        return `<li class="ml-5 list-disc mb-2"><strong>${boldPart.replace(/\*\*/g, '')}</strong> ${restText}</li>`;
      });

      // Handle the special format with multiple hash symbols
      formattedContent = formattedContent.replace(
        /# Course: ([^\n]+) ## Chapter: ([^\n]+) ### Subchapter: ([^\n]+) #### Section: ([^\n]+) --- #### Difficulty Level: ([^\n]+)/g,
        (_, course, chapter, subchapter, section, difficulty) => {
          return `<div class="mb-4">
            <div class="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-gray-100">Course: ${course}</Badge>
              <Badge variant="outline" className="bg-gray-100">Chapter: ${chapter}</Badge>
              <Badge variant="outline" className="bg-gray-100">Subchapter: ${subchapter}</Badge>
              <Badge variant="outline" className="bg-gray-100">Section: ${section}</Badge>
              <Badge className="bg-blue-100 text-blue-800">Difficulty: ${difficulty}</Badge>
            </div>
          </div>`;
        }
      );

      // Handle learning objectives in special format
      formattedContent = formattedContent.replace(
        /### Learning Objectives: - ([^\n]+) - ([^\n]+)/g,
        (_, obj1, obj2) => {
          return `<div class="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
            <h3 class="text-md font-semibold mb-2">Learning Objectives:</h3>
            <ul class="list-disc pl-5">
              <li>${obj1}</li>
              <li>${obj2}</li>
            </ul>
          </div>`;
        }
      );

      // Remove the metadata headers from the content
      formattedContent = formattedContent
        .replace(/# Course:[^\n]+\n?/g, '')
        .replace(/## Chapter:[^\n]+\n?/g, '')
        .replace(/### Subchapter:[^\n]+\n?/g, '')
        .replace(/#### Section:[^\n]+\n?/g, '')
        .replace(/#### Difficulty Level:[^\n]+\n?/g, '')
        .replace(/### Learning Objectives:[\s\S]*?(?=###|$)/g, '');

      // Format section headings (e.g., "### 1. Introduction" -> proper heading)
      formattedContent = formattedContent.replace(/### (\d+\.\s+.+)/g, (_, title) => {
        return `<h3 class="text-xl font-bold mt-6 mb-3">${title}</h3>`;
      });

      // Format subsection headings
      formattedContent = formattedContent.replace(/#### (.+)/g, (_, title) => {
        return `<h4 class="text-lg font-semibold mt-5 mb-2">${title}</h4>`;
      });

      // Format the special pattern with multiple hash symbols
      formattedContent = formattedContent.replace(
        /# ([^#]+) ## ([^#]+) ### ([^#]+) #### ([^-]+) --- #### ([^\n]+)/g,
        (_, course, chapter, subchapter, section, difficulty) => {
          return `<div class="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <h2 class="text-xl font-bold mb-2">${section.trim()}</h2>
            <div class="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline">Course: ${course.trim()}</Badge>
              <Badge variant="outline">Chapter: ${chapter.trim()}</Badge>
              <Badge variant="outline">Subchapter: ${subchapter.trim()}</Badge>
              <Badge className="bg-blue-100 text-blue-800">Difficulty: ${difficulty.trim()}</Badge>
            </div>
          </div>`;
        }
      );

      // Code blocks
      formattedContent = formattedContent.replace(/```([^`]+)```/g, (_, code) => {
        return `<pre class="bg-gray-100 p-3 rounded-md my-3 overflow-x-auto"><code>${code}</code></pre>`;
      });

      // Inline code (backticks)
      formattedContent = formattedContent.replace(/`([^`]+)`/g, (_, code) => {
        return `<code class="bg-gray-100 px-1 py-0.5 rounded">${code}</code>`;
      });

      // Bold text
      formattedContent = formattedContent.replace(/\*\*([^*]+)\*\*/g, (_, text) => {
        return `<strong>${text}</strong>`;
      });

      // Italic text
      formattedContent = formattedContent.replace(/\*([^*]+)\*/g, (_, text) => {
        return `<em>${text}</em>`;
      });

      // Lists with bullet points
      formattedContent = formattedContent.replace(/• (.+)/g, (_, item) => {
        return `<li class="ml-5 list-disc">${item}</li>`;
      });

      // Lists with dash
      formattedContent = formattedContent.replace(/- (.+)/g, (_, item) => {
        return `<li class="ml-5 list-disc">${item}</li>`;
      });

      // Group list items
      formattedContent = formattedContent.replace(/(<li[^>]*>.*<\/li>)\n(<li[^>]*>)/g, '$1$2');
      formattedContent = formattedContent.replace(/(<li[^>]*>.*<\/li>)(\n\n|\n)(?!<li)/g, '<ul class="my-3">$1</ul>$2');
      formattedContent = formattedContent.replace(/(<li[^>]*>.*<\/li>)$/g, '<ul class="my-3">$1</ul>');

      // Paragraphs
      formattedContent = formattedContent.replace(/\n\n([^<\n][^\n]+)/g, (_, text) => {
        if (!text.startsWith('<')) {
          return `\n\n<p class="my-3">${text}</p>`;
        }
        return `\n\n${text}`;
      });

      return (
        <div>
          {/* Metadata section */}
          <div className="mb-8">
            {difficulty && !formattedContent.includes('Difficulty:') && (
              <div className="mb-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {difficulty} Level
                </Badge>
              </div>
            )}
            
            {learningObjectives && !formattedContent.includes('Learning Objectives:') && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                <h3 className="text-md font-semibold mb-2">Learning Objectives:</h3>
                <div dangerouslySetInnerHTML={{ 
                  __html: learningObjectives
                    .replace(/- /g, '• ')
                    .replace(/\n/g, '<br/>')
                }} />
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
          </div>
        </div>
      );
    };
    
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{selectedSection.title}</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Chapter {selectedSection.chapterIndex + 1}</span>
            <span className="mx-2">•</span>
            <span>Subchapter {selectedSection.subchapterIndex + 1}</span>
            <span className="mx-2">•</span>
            <span>Section {selectedSection.sectionIndex + 1}</span>
          </div>
        </div>
        
        {formatContent(selectedSection.content)}
      </div>
    );
  };

  // Calculate course completion stats
  const calculateCompletionStats = () => {
    if (!courseStructure) return { totalSections: 0, completedSections: 0, percentage: 0 };
    
    let totalSections = 0;
    courseStructure.chapters.forEach(chapter => {
      chapter.subchapters.forEach(subchapter => {
        totalSections += subchapter.sections.length;
      });
    });
    
    const completed = completedSections.size;
    const percentage = totalSections > 0 ? Math.round((completed / totalSections) * 100) : 0;
    
    return { totalSections, completedSections: completed, percentage };
  };

  const stats = calculateCompletionStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Course header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-xl font-bold">{course.title}</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge className="capitalize">{course.level}</Badge>
              <span className="text-sm text-gray-500">{course.category}</span>
            </div>
            
            <div className="flex flex-col sm:items-end">
              <div className="flex items-center mb-1">
                <span className="text-sm font-medium mr-2">Progress</span>
                <span className="text-sm font-semibold text-[#8A63FF]">{stats.percentage}%</span>
              </div>
              <div className="w-full sm:w-48">
                <Progress value={stats.percentage} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        {isCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-green-800">Course Completed!</h3>
                <p className="text-sm text-green-700 mt-0.5">
                  Congratulations! You've mastered all the content in this course.
                </p>
              </div>
              <div className="ml-auto">
                <Button 
                  size="sm"
                  onClick={() => navigate('/profile/courses')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  View Certificate
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="structure" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Course Content
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center">
              <FileQuestion className="h-4 w-4 mr-2" />
              Quizzes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="structure">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course structure sidebar */}
          <div className="lg:col-span-1">
                <Card className="sticky top-4">
              <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Course Structure</CardTitle>
                    <CardDescription>
                      {stats.completedSections} of {stats.totalSections} sections completed
                    </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className="px-4 pb-4">
                        {renderCourseStructure()}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
              {/* Content area */}
          <div className="lg:col-span-2">
                  <Card>
                  <CardContent className="p-6">
                    {renderSectionContent()}
                  </CardContent>
                </Card>
                        </div>
                      </div>
              </TabsContent>
              
              <TabsContent value="quizzes">
                <Card>
                  <CardHeader>
                <CardTitle>Course Quizzes</CardTitle>
                <CardDescription>
                  Test your knowledge with these quizzes
                </CardDescription>
                  </CardHeader>
                  <CardContent>
                <QuizList courseId={id} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

{/* 

            import React, { useState } from 'react';
import CourseIntro from './CourseIntro';
import LessonViewer from './LessonViewer';
import Quiz from './QuizScreen';
import Navbar from './Navbar';
import Uipdf from '../Assets/pdfs/front-end.pdf';
import UserResearchPdf from '../Assets/pdfs/UI_UX_Basics.pdf';
import UxDesignPdf from '../Assets/pdfs/front-end.pdf';
import DoubleDiamondPdf from '../Assets/pdfs/UI_UX_Basics.pdf';
import UiDesignPdf from '../Assets/pdfs/UI_UX_Basics.pdf';
import ResearchMethodsPdf from '../Assets/pdfs/UI_UX_Basics.pdf';
import figma from "../Assets/video/Master Figma UI Design in 15 Minutes _ This Tutorial Is For You!.mp4";
import "../Styles/LearningModule.css";
import frontend from "../Assets/video/Frontend web development - a complete overview.mp4"
import backend from "../Assets/video/Backend web development - a complete overview.mp4"

type VideoContent = {
  title: string;
  duration: string;
  videoSrc: string;
};

type Category = {
  title: string;
  videos: VideoContent[];
  book: string;
};

type Lesson = {
  title: string;
  categories: Category[];
};

interface FlatVideo {
  lessonIndex: number;
  catIndex: number;
  video: VideoContent;
  book: string;
}

const lessonData: Lesson[] = [
  {
    title: 'Lesson 1',
    categories: [
      {
        title: 'Introduction to UI/UX',
        videos: [
          { title: 'Introduction to UI/UX - Part 1', duration: '5:00 min', videoSrc: frontend  },
        ],
        book: Uipdf,
      },
      {
        title: 'What is UI?',
        videos: [
          { title: 'What is UI? - Basics', duration: '15:00 min', videoSrc: figma }, // Use the imported figma video
        ],
        book: UiDesignPdf,
      },
      {
        title: 'What is UX?',
        videos: [
          { title: 'What is UX? - Overview', duration: '5:00 min', videoSrc: backend }, // Updated to a different YouTube video
        ],
        book: UxDesignPdf,
      },
    ],
  },
  {
    title: 'Lesson 2',
    categories: [
      {
        title: 'User Research',
        videos: [
          { title: 'User Research - Part 1', duration: '5:00 min', videoSrc: 'https://www.youtube.com/watch?v=0MLwuhpwRiE' },
        ],
        book: UserResearchPdf,
      },
      {
        title: 'Methods of User Research',
        videos: [
          { title: 'Methods of User Research', duration: '5:00 min', videoSrc: 'https://www.youtube.com/watch?v=4ldPT4nbx5c' },
        ],
        book: ResearchMethodsPdf,
      },
      {
        title: 'Double Diamond Process',
        videos: [
          { title: 'Double Diamond Process', duration: '5:00 min', videoSrc: 'https://www.youtube.com/watch?v=fYOPjWWDZHk' },
        ],
        book: DoubleDiamondPdf,
      },
    ],
  },
];

const LearningModule: React.FC = () => {
  const [isLearningVideoOpen, setIsLearningVideoOpen] = useState(true);
  const [expandedLessons, setExpandedLessons] = useState<number[]>([0]);
  const [expandedCategory, setExpandedCategory] = useState<{ lessonIndex: number; catIndex: number } | null>({ lessonIndex: 0, catIndex: 0 });
  const [selectedTab, setSelectedTab] = useState<'video' | 'book'>('video');
  const [completedVideos, setCompletedVideos] = useState<{ [lessonIndex: number]: number[] }>({ 0: [0, 1, 2] });
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(lessonData[0].categories[0].videos[0]);
  const [selectedBook, setSelectedBook] = useState<string | null>(lessonData[0].categories[0].book);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  const flatVideos: FlatVideo[] = lessonData.flatMap((lesson, lessonIndex) =>
    lesson.categories.flatMap((category, catIndex) =>
      category.videos.map(video => ({
        lessonIndex,
        catIndex,
        video,
        book: category.book,
      }))
    )
  );

  const toggleLesson = (index: number) => {
    setExpandedLessons((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleCategory = (lessonIndex: number, catIndex: number) => {
    if (expandedCategory?.lessonIndex === lessonIndex && expandedCategory?.catIndex === catIndex) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory({ lessonIndex, catIndex });
    }
  };

  const isVideoCompleted = (lessonIndex: number, videoIndex: number) =>
    completedVideos[lessonIndex]?.includes(videoIndex);

  const handleVideoClick = (video: VideoContent, book: string, tab: 'video' | 'book', lessonIndex: number, catIndex: number) => {
    setSelectedVideo(video);
    setSelectedBook(book);
    setSelectedTab(tab);
    setIsQuizActive(false);

    const videoIndex = flatVideos.findIndex(
      (flatVideo) =>
        flatVideo.lessonIndex === lessonIndex &&
        flatVideo.catIndex === catIndex &&
        flatVideo.video === video
    );
    setCurrentVideoIndex(videoIndex);

    if (!expandedLessons.includes(lessonIndex)) {
      setExpandedLessons((prev) => [...prev, lessonIndex]);
    }
    setExpandedCategory({ lessonIndex, catIndex });
  };

  const handleQuizClick = () => {
    setIsQuizActive(true);
    setSelectedVideo(null);
    setSelectedBook(null);
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      const newIndex = currentVideoIndex - 1;
      const { lessonIndex, catIndex, video, book } = flatVideos[newIndex];
      handleVideoClick(video, book, 'video', lessonIndex, catIndex);
    }
  };

  const handleNext = () => {
    if (currentVideoIndex < flatVideos.length - 1) {
      const newIndex = currentVideoIndex + 1;
      const { lessonIndex, catIndex, video, book } = flatVideos[newIndex];
      handleVideoClick(video, book, 'video', lessonIndex, catIndex);
    }
  };

  const handleBack = () => {
    setSelectedVideo(null);
    setSelectedBook(null);
    setIsQuizActive(false);
    setCurrentVideoIndex(0);
    setExpandedLessons([0]);
    setExpandedCategory({ lessonIndex: 0, catIndex: 0 });
  };

  return (
    <div className="flex min-h-screen bg-white p-4">
     
      <div className="Left Sidebar bg-white rounded-2xl border border-violet-300 shadow-md ml-4 mt-4 mr-0 w-96">
        <div className="flex justify-between items-center p-5">
          <h2 className="learing text-xl font-semibold text-gray-800">Learning</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        
        <div className={`Learning Videos Section border rounded-lg mx-6 mb-4 ${isLearningVideoOpen ? 'border-purple-500' : 'border-gray-200'}`}>
          <button
            onClick={() => setIsLearningVideoOpen((prev) => !prev)}
            className="w-full flex justify-between items-center text-left py-3 px-4 rounded hover:bg-white transition"
          >
            <div>
              <p className="font-medium text-gray-700 text-base">Learning Videos</p>
              <p className="text-sm text-gray-500">{flatVideos.length} Videos</p>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform ${isLearningVideoOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isLearningVideoOpen && (
            <div className="px-4 pb-4">
              {lessonData.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="mb-4">
                  <button
                    onClick={() => toggleLesson(lessonIndex)}
                    className="w-full flex justify-between items-center text-left py-3 px-3 rounded hover:bg-white transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-violet-500 rounded-full p-0.5">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-800 font-medium text-base">{lesson.title}</span>
                    </div>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${expandedLessons.includes(lessonIndex) ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="w-full h-px bg-gray-300 rounded-full mt-2"></div>

                  {expandedLessons.includes(lessonIndex) && (
                    <div className="mt-3 border border-violet-200 rounded-md p-3 text-base">
                      <ul className="space-y-3">
                        {lesson.categories.map((category, catIndex) => (
                          <li key={catIndex}>
                            <div
                              className="flex justify-between items-center cursor-pointer"
                              onClick={() => toggleCategory(lessonIndex, catIndex)}
                            >
                              <div className="flex items-center space-x-3">
                                {isVideoCompleted(lessonIndex, catIndex * 100) ? (
                                  <svg
                                    className="w-5 h-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-5 h-5 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.06v7.879a1 1 0 001.234.97l6.518-1.709a1 1 0 00.748-.97v-2.121a1 1 0 00-.748-.971z"
                                    />
                                  </svg>
                                )}
                                <span className="text-base">{category.title}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-gray-500 text-sm">{category.videos[0].duration}</span>
                                <svg
                                  className={`w-5 h-5 transform transition-transform ${
                                    expandedCategory?.lessonIndex === lessonIndex && expandedCategory?.catIndex === catIndex
                                      ? 'rotate-180'
                                      : ''
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                            <div className="w-full h-px bg-gray-300 rounded-full mt-1 mb-3"></div>
                            {expandedCategory?.lessonIndex === lessonIndex && expandedCategory?.catIndex === catIndex && (
                              <div className="ml-8 mt-3">
                                <div className="flex bg-white rounded-full p-1 mb-4 w-48 border border-gray-200">
                                  {category.videos.map((video, vidIndex) => (
                                    <div key={vidIndex} className="relative flex w-full rounded-full bg-white">
                                      <div
                                        className={`absolute w-1/2 h-full rounded-full bg-violet-600 transition-transform duration-300 ${
                                          selectedTab === 'video' && selectedVideo === video ? 'translate-x-0' : 'translate-x-full'
                                        }`}
                                      ></div>
                                      <button
                                        onClick={() => handleVideoClick(video, category.book, 'video', lessonIndex, catIndex)}
                                        className={`relative z-10 flex-1 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                                          selectedTab === 'video' && selectedVideo === video ? 'text-white' : 'text-gray-700'
                                        }`}
                                      >
                                        Video
                                      </button>
                                      <button
                                        onClick={() => handleVideoClick(video, category.book, 'book', lessonIndex, catIndex)}
                                        className={`relative z-10 flex-1 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                                          selectedTab === 'book' && selectedVideo === video ? 'text-white' : 'text-gray-700'
                                        }`}
                                      >
                                        Book
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                      {selectedTab === 'book' && selectedVideo && (
                        <div className="text-gray-600 mt-3 text-base">
                         
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

       
        <div className="Quiz Section border border-gray-200 rounded-lg mx-6 mb-4">
          <button
            onClick={handleQuizClick}
            className="w-full flex justify-between items-center text-left py-3 px-4 rounded hover:bg-white transition opacity-60 cursor-not-allowed"
          >
            <div>
              <p className="font-medium text-gray-700 text-base">Quiz</p>
              <p className="text-sm text-gray-500">1 Assessment</p>
            </div>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="#4C1D95"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 9V7a5 5 0 10-10 0v2H5v11a2 2 0 002 2h10a2 2 0 002-2V9h-2zM9 7a3 3 0 116 0v2H9V7z"
                fill="#4C1D95"
              />
            </svg>
          </button>
        </div>

        <div className="Claim Your Course Certificate Section border border-gray-200 rounded-lg mx-6 mb-4 opacity-60 cursor-not-allowed">
          <button className="w-full flex justify-between items-center text-left py-3 px-4 rounded hover:bg-white transition">
            <div>
              <p className="font-medium text-gray-700 text-base">Claim your course certificate</p>
              <p className="text-sm text-gray-500">1 Assessment, New ass</p>
            </div>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="#4C1D95"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 9V7a5 5 0 10-10 0v2H5v11a2 2 0 002 2h10a2 2 0 002-2V9h-2zM9 7a3 3 0 116 0v2H9V7z"
                fill="#4C1D95"
              />
            </svg>
          </button>
        </div>

        
        <div className="Learning Materials Section border border-gray-200 rounded-lg mx-6 mb-6">
          <button className="w-full flex justify-between items-center text-left py-3 px-4 rounded hover:bg-white transition">
            <div>
              <p className="font-medium text-gray-700 text-base">Learning Materials</p>
              <p className="text-sm text-gray-500">1 Resource</p>
            </div>
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

    
      <div className="Right Side Content flex-1 p-4 m-4 bg-white rounded-2xl border border-gray-200  shadow-md flex items-center justify-center min-h-[calc(100vh-2rem)]">
        {isQuizActive ? (
          <div className="quiz-com w-full h-full">
            <Quiz />
          </div>
        ) : selectedTab === 'video' && selectedVideo ? (
          <div className="video-com w-full h-full">
            <CourseIntro
              courseTitle="UI/UX Designer Tutorial"
              lessonTitle={
                lessonData[expandedCategory?.lessonIndex || 0].categories[
                  expandedCategory?.catIndex || 0
                ].title
              }
              videoSrc={
                lessonData[expandedCategory?.lessonIndex || 0].categories[
                  expandedCategory?.catIndex || 0
                ].videos[0]?.videoSrc // Pass the first video's videoSrc
              }
              onBack={handleBack}
              onPrevious={currentVideoIndex > 0 ? handlePrevious : undefined}
              onNext={currentVideoIndex < flatVideos.length - 1 ? handleNext : undefined}
            />
          </div>
        ) : selectedTab === 'book' && selectedVideo && selectedBook ? (
          <div className="book-com w-full h-full">
            <LessonViewer config={{ bookSrc: selectedBook }} />
          </div>
        ) : (
          <div className="text-gray-500 text-center">Please select a video or book to view content.</div>
        )} */}
      </div>
    </div>
  );
};

export default LearningModule;