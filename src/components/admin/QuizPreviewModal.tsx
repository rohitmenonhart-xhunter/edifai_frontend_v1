import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IQuiz } from '@/services/quizService';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

interface QuizPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: IQuiz;
}

const QuizPreviewModal: React.FC<QuizPreviewModalProps> = ({
  isOpen,
  onClose,
  quiz,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{quiz.title}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">{quiz.questions.length} Questions</Badge>
              <Badge variant="outline">Time Limit: {quiz.timeLimit} minutes</Badge>
              <Badge variant="outline">Passing Score: {quiz.passingScore}%</Badge>
              <Badge className={quiz.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {quiz.isPublished ? "Published" : "Draft"}
              </Badge>
            </div>
            <p className="mt-2 text-sm">{quiz.description}</p>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {quiz.questions.map((question, qIndex) => (
            <div key={qIndex} className="border rounded-md p-4">
              <h3 className="font-medium mb-2">
                Question {qIndex + 1}: {question.questionText}
              </h3>
              
              <div className="space-y-2 ml-4 mb-3">
                {question.options.map((option, oIndex) => (
                  <div 
                    key={oIndex} 
                    className={`flex items-center p-2 rounded ${
                      option.isCorrect ? 'bg-green-50 border border-green-200' : ''
                    }`}
                  >
                    {option.isCorrect ? (
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                    ) : (
                      <span className="h-4 w-4 mr-2" />
                    )}
                    <span>{option.optionText}</span>
                  </div>
                ))}
              </div>
              
              {question.explanation && (
                <div className="mt-3 pt-3 border-t text-sm">
                  <p className="font-medium text-gray-700">Explanation:</p>
                  <p className="text-gray-600">{question.explanation}</p>
                </div>
              )}
              
              <div className="mt-2 text-sm text-gray-500">
                Points: {question.points}
              </div>
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizPreviewModal; 