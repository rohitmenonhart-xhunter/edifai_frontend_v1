import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizForm from '@/components/QuizForm';
import { IQuiz } from '@/services/quizService';
import { createQuiz, updateQuiz, getQuizzesByCourse, deleteQuiz } from '@/services/quizService';
import { getCourseById } from '@/services/courseService';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkIsAdmin } from '@/utils/roleUtils';
import { useUser } from '@clerk/clerk-react';

const AdminQuizPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [courseLoading, setCourseLoading] = useState<boolean>(true);
  const [courseName, setCourseName] = useState<string>('');
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingQuiz, setEditingQuiz] = useState<IQuiz | null>(null);
  const [quizToDelete, setQuizToDelete] = useState<IQuiz | null>(null);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const adminStatus = await checkIsAdmin();
        setIsAdmin(adminStatus);
        if (!adminStatus) {
          toast.error('You do not have permission to access this page');
          navigate('/');
        }
      }
    };
    
    checkAdmin();
  }, [user, navigate]);

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return;
      
      try {
        setCourseLoading(true);
        const courseData = await getCourseById(courseId);
        setCourseName(courseData.title);
      } catch (error) {
        console.error('Error fetching course details:', error);
        toast.error('Failed to load course details');
      } finally {
        setCourseLoading(false);
      }
    };
    
    fetchCourseDetails();
  }, [courseId]);

  // Fetch quizzes for the course
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!courseId) return;
      
      try {
        setLoading(true);
        const quizData = await getQuizzesByCourse(courseId);
        setQuizzes(quizData);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        toast.error('Failed to load quizzes');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizzes();
  }, [courseId]);

  // Handle creating a new quiz
  const handleCreateQuiz = async (quizData: Partial<IQuiz>) => {
    if (!courseId) return;
    
    try {
      await createQuiz({ ...quizData, courseId });
      setShowForm(false);
      
      // Refresh quiz list
      const updatedQuizzes = await getQuizzesByCourse(courseId);
      setQuizzes(updatedQuizzes);
      
      toast.success('Quiz created successfully');
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast.error('Failed to create quiz');
      throw error;
    }
  };

  // Handle updating an existing quiz
  const handleUpdateQuiz = async (quizData: Partial<IQuiz>) => {
    if (!editingQuiz?._id) return;
    
    try {
      await updateQuiz(editingQuiz._id, quizData);
      setShowForm(false);
      setEditingQuiz(null);
      
      // Refresh quiz list
      const updatedQuizzes = await getQuizzesByCourse(courseId!);
      setQuizzes(updatedQuizzes);
      
      toast.success('Quiz updated successfully');
    } catch (error) {
      console.error('Error updating quiz:', error);
      toast.error('Failed to update quiz');
      throw error;
    }
  };

  // Handle deleting a quiz
  const handleDeleteQuiz = async () => {
    if (!quizToDelete?._id) return;
    
    try {
      await deleteQuiz(quizToDelete._id);
      
      // Refresh quiz list
      const updatedQuizzes = await getQuizzesByCourse(courseId!);
      setQuizzes(updatedQuizzes);
      
      toast.success('Quiz deleted successfully');
    } catch (error) {
      console.error('Error deleting quiz:', error);
      toast.error('Failed to delete quiz');
    } finally {
      setQuizToDelete(null);
    }
  };

  // Handle edit button click
  const handleEditClick = (quiz: IQuiz) => {
    setEditingQuiz(quiz);
    setShowForm(true);
  };

  // Handle cancel button click
  const handleCancel = () => {
    setShowForm(false);
    setEditingQuiz(null);
  };

  // Handle save quiz (either create or update)
  const handleSaveQuiz = async (quizData: Partial<IQuiz>) => {
    if (editingQuiz) {
      await handleUpdateQuiz(quizData);
    } else {
      await handleCreateQuiz(quizData);
    }
  };

  // Navigate back to admin course page
  const navigateBack = () => {
    navigate(`/admin/courses/${courseId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center"
        onClick={navigateBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Course
      </Button>

      {courseLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Quizzes for {courseName}</h1>
          <p className="text-gray-500">Manage course quizzes and assessments</p>
        </div>
      )}

      {!showForm ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Course Quizzes</h2>
            <Button 
              className="bg-[#8A63FF] hover:bg-[#7A53EF]"
              onClick={() => setShowForm(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Quiz
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spinner className="h-8 w-8" />
            </div>
          ) : quizzes.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Time Limit</TableHead>
                      <TableHead>Passing Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizzes.map((quiz) => (
                      <TableRow key={quiz._id}>
                        <TableCell className="font-medium">{quiz.title}</TableCell>
                        <TableCell>{quiz.questions.length}</TableCell>
                        <TableCell>{quiz.timeLimit} min</TableCell>
                        <TableCell>{quiz.passingScore}%</TableCell>
                        <TableCell>
                          {quiz.isPublished ? (
                            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                              Draft
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(quiz)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{quiz.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() => {
                                    setQuizToDelete(quiz);
                                    handleDeleteQuiz();
                                  }}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-500 mb-4">No quizzes found for this course</p>
                <Button 
                  className="bg-[#8A63FF] hover:bg-[#7A53EF]"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Quiz
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <QuizForm
          initialQuiz={editingQuiz || undefined}
          courseId={courseId!}
          onSave={handleSaveQuiz}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AdminQuizPage; 