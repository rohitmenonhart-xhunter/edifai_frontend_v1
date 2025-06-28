import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { IQuiz, IQuizQuestion } from '@/services/quizService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface QuizFormProps {
  initialQuiz?: IQuiz;
  courseId: string;
  onSave: (quizData: Partial<IQuiz>) => Promise<void>;
  onCancel: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({
  initialQuiz,
  courseId,
  onSave,
  onCancel
}) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // Form state
  const [formData, setFormData] = useState<Partial<IQuiz>>({
    courseId,
    title: '',
    description: '',
    timeLimit: 30,
    passingScore: 70,
    questions: [],
    isPublished: false
  });

  // Question state
  const [currentQuestion, setCurrentQuestion] = useState<Partial<IQuizQuestion>>({
    questionText: '',
    options: [
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false }
    ],
    explanation: '',
    points: 1
  });
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  // Initialize form with quiz data if editing
  useEffect(() => {
    if (initialQuiz) {
      setFormData({
        ...initialQuiz,
        courseId
      });
    }
  }, [initialQuiz, courseId]);

  // Handle input change for form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle number input change with validation
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
      setFormData(prev => ({ ...prev, [name]: numberValue }));
    }
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle switch toggle
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPublished: checked }));
  };

  // Handle question input change
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({ ...prev, [name]: value }));
  };

  // Handle question number input change
  const handleQuestionNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
      setCurrentQuestion(prev => ({ ...prev, [name]: numberValue }));
    }
  };

  // Handle option text change
  const handleOptionTextChange = (index: number, value: string) => {
    setCurrentQuestion(prev => {
      const updatedOptions = [...(prev.options || [])];
      updatedOptions[index] = { ...updatedOptions[index], optionText: value };
      return { ...prev, options: updatedOptions };
    });
  };

  // Handle correct option selection
  const handleCorrectOptionChange = (index: number, checked: boolean) => {
    setCurrentQuestion(prev => {
      const updatedOptions = [...(prev.options || [])].map((option, i) => ({
        ...option,
        isCorrect: i === index ? checked : option.isCorrect
      }));
      return { ...prev, options: updatedOptions };
    });
  };

  // Add new option
  const handleAddOption = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), { optionText: '', isCorrect: false }]
    }));
  };

  // Remove option
  const handleRemoveOption = (index: number) => {
    if ((currentQuestion.options?.length || 0) <= 2) {
      toast.error('A question must have at least 2 options');
      return;
    }

    setCurrentQuestion(prev => {
      const updatedOptions = [...(prev.options || [])].filter((_, i) => i !== index);
      return { ...prev, options: updatedOptions };
    });
  };

  // Add or update question
  const handleSaveQuestion = () => {
    // Validate question
    if (!currentQuestion.questionText) {
      toast.error('Question text is required');
      return;
    }

    // Check if at least one option is marked as correct
    const hasCorrectOption = currentQuestion.options?.some(option => option.isCorrect);
    if (!hasCorrectOption) {
      toast.error('At least one option must be marked as correct');
      return;
    }

    // Check if all options have text
    const emptyOptions = currentQuestion.options?.filter(option => !option.optionText.trim());
    if (emptyOptions && emptyOptions.length > 0) {
      toast.error('All options must have text');
      return;
    }

    const questionData: IQuizQuestion = {
      questionText: currentQuestion.questionText || '',
      options: currentQuestion.options || [],
      explanation: currentQuestion.explanation,
      points: currentQuestion.points || 1
    };

    if (isEditingQuestion && editingQuestionIndex !== null) {
      // Update existing question
      const updatedQuestions = [...(formData.questions || [])];
      updatedQuestions[editingQuestionIndex] = questionData;
      setFormData(prev => ({ ...prev, questions: updatedQuestions }));
    } else {
      // Add new question
      setFormData(prev => ({ 
        ...prev, 
        questions: [...(prev.questions || []), questionData] 
      }));
    }

    // Reset form
    resetQuestionForm();
  };

  // Reset question form
  const resetQuestionForm = () => {
    setCurrentQuestion({
      questionText: '',
      options: [
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false }
      ],
      explanation: '',
      points: 1
    });
    setIsEditingQuestion(false);
    setEditingQuestionIndex(null);
  };

  // Edit question
  const handleEditQuestion = (index: number) => {
    const question = formData.questions?.[index];
    if (question) {
      setCurrentQuestion(question);
      setIsEditingQuestion(true);
      setEditingQuestionIndex(index);
    }
  };

  // Delete question
  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = formData.questions?.filter((_, i) => i !== index) || [];
    setFormData(prev => ({ ...prev, questions: updatedQuestions }));
  };

  // Save quiz
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title) {
      toast.error('Quiz title is required');
      setActiveTab('details');
      return;
    }

    if (!formData.description) {
      toast.error('Quiz description is required');
      setActiveTab('details');
      return;
    }

    if (!formData.questions || formData.questions.length === 0) {
      toast.error('At least one question is required');
      setActiveTab('questions');
      return;
    }

    try {
      setLoading(true);
      await onSave(formData);
      toast.success(`Quiz ${initialQuiz ? 'updated' : 'created'} successfully`);
    } catch (error) {
      console.error('Error saving quiz:', error);
      toast.error(`Failed to ${initialQuiz ? 'update' : 'create'} quiz`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        {initialQuiz ? 'Edit Quiz' : 'Create New Quiz'}
      </h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="details">Quiz Details</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quiz Title*
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter quiz title"
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Limit (minutes)*
              </label>
              <Input
                name="timeLimit"
                type="number"
                value={formData.timeLimit}
                onChange={handleNumberChange}
                placeholder="Enter time limit in minutes"
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passing Score (%)*
              </label>
              <Input
                name="passingScore"
                type="number"
                value={formData.passingScore}
                onChange={handleNumberChange}
                placeholder="Enter passing score percentage"
                className="w-full"
                min="0"
                max="100"
                required
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                  Published
                </Label>
                <Switch
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Published quizzes are visible to enrolled students
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter quiz description"
              className="w-full h-32"
              required
            />
          </div>
          
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setActiveTab('questions')}
              className="ml-2"
            >
              Next: Add Questions
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="questions">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="text-md font-medium mb-3">
              {isEditingQuestion ? 'Edit Question' : 'Add New Question'}
            </h3>
            
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text*
                </label>
                <Textarea
                  name="questionText"
                  value={currentQuestion.questionText}
                  onChange={handleQuestionChange}
                  placeholder="Enter question text"
                  className="w-full h-20"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points
                </label>
                <Input
                  name="points"
                  type="number"
                  value={currentQuestion.points}
                  onChange={handleQuestionNumberChange}
                  placeholder="Enter points for this question"
                  className="w-full"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options*
                </label>
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Checkbox
                      checked={option.isCorrect}
                      onCheckedChange={(checked) => handleCorrectOptionChange(index, checked as boolean)}
                      className="mr-2"
                    />
                    <Input
                      value={option.optionText}
                      onChange={(e) => handleOptionTextChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveOption(index)}
                      className="ml-2 h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddOption}
                  className="mt-1"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Explanation (Optional)
                </label>
                <Textarea
                  name="explanation"
                  value={currentQuestion.explanation}
                  onChange={handleQuestionChange}
                  placeholder="Enter explanation for the correct answer"
                  className="w-full h-20"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              {isEditingQuestion && (
                <Button
                  variant="outline"
                  onClick={resetQuestionForm}
                  className="mr-2"
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleSaveQuestion}
                className="bg-[#8A63FF] hover:bg-[#7A53EF]"
              >
                <Save className="mr-2 h-4 w-4" />
                {isEditingQuestion ? 'Update Question' : 'Add Question'}
              </Button>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="font-medium mb-3">Quiz Questions</h3>
          {formData.questions && formData.questions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Options</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.questions.map((question, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {question.questionText}
                    </TableCell>
                    <TableCell>{question.options.length} options</TableCell>
                    <TableCell>{question.points}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditQuestion(index)}
                        className="h-8 w-8 p-0 mr-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuestion(index)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 text-center py-4">No questions added yet</p>
          )}
          
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => setActiveTab('details')}
            >
              Back to Details
            </Button>
            <div>
              <Button
                variant="outline"
                onClick={onCancel}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-[#8A63FF] hover:bg-[#7A53EF]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Quiz
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuizForm; 