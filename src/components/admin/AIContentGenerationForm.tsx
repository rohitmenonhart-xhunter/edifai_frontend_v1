import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, BookOpen, Plus, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from 'react-router-dom';
import courseService from '@/services/courseService';
import { toast } from 'sonner';
import ChapterSubchapterForm from './ChapterSubchapterForm';

interface AIContentGenerationFormProps {
  onComplete: (courseId: string) => void;
}

// Define the level type to match ICourse
type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

// Define Chapter interface to match ChapterSubchapterForm
interface Chapter {
  title: string;
  description: string;
  subchapters: {
    title: string;
    description: string;
  }[];
}

const AIContentGenerationForm: React.FC<AIContentGenerationFormProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseLevel, setCourseLevel] = useState<CourseLevel>('intermediate');
  const [createdCourse, setCreatedCourse] = useState<any>(null);
  const [generationStatus, setGenerationStatus] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [courseStructure, setCourseStructure] = useState<Chapter[]>([]);

  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (!courseTitle.trim()) {
        toast.error("Please enter a course title");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setLoading(true);
      try {
        // Step 1: Create a new course
        setGenerationStatus('Creating course...');
        setGenerationProgress(10);
        
        const courseData = {
          title: courseTitle,
          description: courseDescription || `${courseTitle} - AI generated course`,
          level: courseLevel,
          category: 'AI Generated',
          price: 0,
          discount: 0,
          duration: 60, // Default duration in minutes
          thumbnail: 'https://via.placeholder.com/400x200?text=AI+Course',
          tags: ['AI Generated'],
          lessons: [] // Empty lessons array
        };
        
        await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for UI feedback
        
        // Use the service to create course instead of direct fetch
        const courseResponse = await courseService.createCourse(courseData);
        if (!courseResponse || !courseResponse._id) {
          throw new Error('Failed to create course');
        }
        
        const course = courseResponse;
        console.log('Created course with ID:', course._id);
        setCreatedCourse(course);
        setGenerationProgress(30);
        
        // Step 2: Prepare course structure with chapters and subchapters from the form
        setGenerationStatus('Creating course structure...');
        
        // Transform the course structure into the required format
        const apiCourseStructure = {
          chapters: courseStructure.map((chapter, chapterIndex) => ({
            title: chapter.title,
            description: chapter.description || `Chapter ${chapterIndex + 1} of ${courseTitle}`,
            order: chapterIndex + 1,
            subchapters: chapter.subchapters.map((subchapter, subchapterIndex) => ({
              title: subchapter.title,
              description: subchapter.description || `${subchapter.title} - Subchapter of ${chapter.title}`,
              order: subchapterIndex + 1,
              sections: [
                {
                  title: 'Introduction',
                  description: `Introduction to ${subchapter.title}`,
                  order: 1,
                  learningObjectives: ['Understand the basics', 'Identify key concepts']
                }
              ]
            }))
          }))
        };
        
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        await new Promise(resolve => setTimeout(resolve, 800)); // Small delay for UI feedback
        setGenerationProgress(50);
        
        // Call API to create course structure
        const structureResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/courses/${course._id}/create-structure`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(apiCourseStructure)
        });
        
        if (!structureResponse.ok) {
          const errorData = await structureResponse.json();
          console.error('Structure creation error:', errorData);
          throw new Error(`Failed to create course structure: ${errorData.message || structureResponse.statusText}`);
        }
        
        const structureData = await structureResponse.json();
        console.log('Course structure created:', structureData);
        
        // Small delay before showing content generation
        await new Promise(resolve => setTimeout(resolve, 500));
        setGenerationProgress(60);
        
        // Step 3: Generate content
        setGenerationStatus('Generating content with AI...');
        
        // Update progress periodically to show the user something is happening
        const progressInterval = setInterval(() => {
          setGenerationProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + 1;
          });
        }, 3000); // Update every 3 seconds to simulate progress
        
        // Actual API call for generating content
        const generateResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/courses/${course._id}/generate-all-content`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ forceRegenerate: true })
        });
        
        // Clear the interval when done
        clearInterval(progressInterval);
        
        if (!generateResponse.ok) {
          const errorData = await generateResponse.json();
          console.error('Content generation error:', errorData);
          throw new Error(`Failed to generate content: ${errorData.message || generateResponse.statusText}`);
        }
        
        const generateData = await generateResponse.json();
        console.log('Content generation complete:', generateData);
        
        setGenerationStatus('Content generation complete!');
        setGenerationProgress(100);
        
        // Wait a moment before showing success screen
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentStep(3);
        
      } catch (error) {
        console.error('Error during content generation:', error);
        toast.error(`Error: ${error instanceof Error ? error.message : 'Failed to generate course content'}`);
        setGenerationStatus('Error generating content. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleViewCourse = () => {
    try {
      if (createdCourse && createdCourse._id) {
        console.log("Navigating to course with ID:", createdCourse._id);
        
        // Show a loading toast
        toast.info("Preparing to view course...", { duration: 2000 });
        
        // Add a delay to ensure the course structure is fully processed
        setTimeout(() => {
          onComplete(createdCourse._id);
        }, 2000);
      } else {
        console.error("Created course not found or missing ID");
        toast.error("Course creation incomplete or failed");
      }
    } catch (error) {
      console.error("Error in handleViewCourse:", error);
      toast.error("Failed to navigate to course details");
    }
  };

  const handleEditStructure = () => {
    if (createdCourse && createdCourse._id) {
      navigate(`/admin/courses/${createdCourse._id}/structure`);
    }
  };

  const handleStructureSubmit = (structure: Chapter[]) => {
    setCourseStructure(structure);
    handleNextStep();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
            AI Course Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex-1 text-center">
                <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-1 ${
                  currentStep === step ? 'bg-primary text-white' : 
                  currentStep > step ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {currentStep > step ? '✓' : step}
                </div>
                <div className="text-xs">
                  {step === 1 ? 'Course Details' : step === 2 ? 'Course Structure' : 'Review'}
                </div>
              </div>
            ))}
          </div>

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="courseTitle">Course Title</Label>
                <Input
                  id="courseTitle"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="Enter a title for your course"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="courseDescription">Course Description (Optional)</Label>
                <Textarea
                  id="courseDescription"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Describe what students will learn in this course"
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="courseLevel">Course Level</Label>
                <select
                  id="courseLevel"
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(e.target.value as CourseLevel)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <Alert className="bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <AlertDescription>
                  In the next step, you'll define chapters and subchapters. Our AI will generate content based on these titles.
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-end mt-6">
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={loading}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200 mb-4">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <AlertDescription>
                  Define your course structure by adding chapters and subchapters. Our AI will generate 
                  content and quizzes for each subchapter automatically.
                </AlertDescription>
              </Alert>
              
              <ChapterSubchapterForm 
                onSubmit={handleStructureSubmit}
                isLoading={loading}
              />
              
              {loading && generationStatus && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${generationProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-1">{generationStatus}</p>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 text-center">
              <div className="py-8">
                <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-10 w-10 text-green-600" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Course Generation Complete!</h3>
                <p className="text-gray-600 mb-4">
                  Your course "{courseTitle}" has been created with {courseStructure.length} chapters and {
                    courseStructure.reduce((total, chapter) => total + chapter.subchapters.length, 0)
                  } subchapters.
                  All content has been automatically generated using AI.
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {courseStructure.map((chapter, index) => (
                    <Badge key={index} variant="secondary" className="text-xs py-1">
                      {chapter.title}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-sm text-gray-500 mb-6">
                  You can now view your course or edit the structure to refine the content.
                </p>
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={handleViewCourse} 
                    className="bg-[#8A63FF] hover:bg-[#7A53EF]"
                  >
                    View Course
                  </Button>
                  <Button variant="outline" onClick={handleEditStructure}>
                    Edit Structure
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContentGenerationForm; 