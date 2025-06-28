import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import quizService, { IQuiz } from '@/services/quizService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CalendarClock, BookOpen, Clock, Award, CheckCircle, LucideIcon } from 'lucide-react';

interface QuizStatusInfo {
  status: 'not-started' | 'in-progress' | 'passed' | 'failed';
  label: string;
  color: string;
  icon: LucideIcon;
}

interface QuizListProps {
  courseId?: string;
}

const QuizList: React.FC<QuizListProps> = ({ courseId }) => {
  const params = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  // Use provided courseId or get from URL params
  const activeCourseId = courseId || params.courseId;
  
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quizStatuses, setQuizStatuses] = useState<Record<string, QuizStatusInfo>>({});
  
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!activeCourseId) return;
      
      try {
        setLoading(true);
        console.log("Fetching quizzes for course:", activeCourseId);
        const quizData = await quizService.getQuizzesByCourse(activeCourseId); // Get all quizzes first
        console.log("All quizzes:", quizData);
        
        // Filter published quizzes on the client side
        const publishedQuizzes = quizData.filter(quiz => quiz.isPublished);
        console.log("Published quizzes:", publishedQuizzes);
        
        setQuizzes(publishedQuizzes);
        
        // Get quiz attempts to determine status
        await fetchQuizAttempts(publishedQuizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        toast.error('Failed to load quizzes');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizzes();
  }, [activeCourseId]);
  
  const fetchQuizAttempts = async (quizzes: IQuiz[]) => {
    const statuses: Record<string, QuizStatusInfo> = {};
    
    // Set default "Not Started" status for all quizzes first
    quizzes.forEach(quiz => {
      statuses[quiz._id] = {
        status: 'not-started',
        label: 'Not Started',
        color: 'bg-gray-100 text-gray-800',
        icon: BookOpen
      };
    });
    
    // Then try to get actual status for each quiz
    for (const quiz of quizzes) {
      try {
        const attempts = await quizService.getQuizAttemptsByQuiz(quiz._id);
        
        if (attempts && attempts.length > 0) {
          // Get the latest attempt
          const latestAttempt = attempts.sort(
            (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
          )[0];
          
          if (latestAttempt && latestAttempt.passed) {
            // Passed
            statuses[quiz._id] = {
              status: 'passed',
              label: 'Passed',
              color: 'bg-green-100 text-green-800',
              icon: CheckCircle
            };
          } else if (latestAttempt) {
            // Failed
            statuses[quiz._id] = {
              status: 'failed',
              label: 'Failed',
              color: 'bg-red-100 text-red-800',
              icon: Clock
            };
          }
        }
        // If no attempts, keep the default "Not Started" status
      } catch (error) {
        console.error(`Error fetching attempts for quiz ${quiz._id}:`, error);
        // Keep the default "Not Started" status for this quiz
      }
    }
    
    setQuizStatuses(statuses);
  };
  
  const handleStartQuiz = (quizId: string) => {
    navigate(`/course/${activeCourseId}/quiz/${quizId}`);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }
  
  // No quizzes at all
  if (quizzes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 mb-2">No published quizzes available for this course yet</p>
          <p className="text-sm text-gray-400">Check back later for assessments</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Course Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => {
          const statusInfo = quizStatuses[quiz._id] || {
            status: 'not-started',
            label: 'Not Started',
            color: 'bg-gray-100 text-gray-800',
            icon: BookOpen
          };
          const StatusIcon = statusInfo.icon;
          
          return (
            <Card key={quiz._id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <Badge className={`${statusInfo.color} mb-2 self-start`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusInfo.label}
                </Badge>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription className="line-clamp-2">{quiz.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{quiz.timeLimit} minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Pass: {quiz.passingScore}%</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarClock className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{quiz.questions.length} questions</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  className="w-full bg-[#8A63FF] hover:bg-[#7A53EF]"
                  onClick={() => handleStartQuiz(quiz._id)}
                >
                  {statusInfo.status === 'not-started' ? 'Start Quiz' : 
                   statusInfo.status === 'passed' ? 'Retake Quiz' : 'Try Again'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuizList; 