import React, { useState, useEffect } from 'react';
type Option = {
  id: string;
  text: string;
};
type Question = {
  id: number;
  text: string;
  options: Option[];
};

// 20 questions to match the image
const questions: Question[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  text: `Question ${i + 420}: Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur... Lorem ipsum dolor sit amet consectetur...Lorem ipsum dolor sit amet consectetur... Lorem ipsum dolor sit amet consectetur ?`,
  options: [
    { id: 'A', text: 'Lorem ipsum dolor sit amet consectetur.' },
    { id: 'B', text: 'Lorem ipsum dolor sit amet consectetur.' },
    { id: 'C', text: 'Lorem ipsum dolor sit amet consectetur.' },
    { id: 'D', text: 'Lorem ipsum dolor sit amet consectetur.' },
    { id: 'E', text: 'Lorem ipsum dolor sit amet consectetur.' },
  ],
}));

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [visited, setVisited] = useState<boolean[]>(Array(questions.length).fill(false));
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSecondsElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const updatedVisited = [...visited];
    updatedVisited[currentQuestion] = true;
    setVisited(updatedVisited);
  }, [currentQuestion]);
  const handleOptionSelect = (optionId: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = optionId;
    setAnswers(updatedAnswers);
  };

  // Timer format to HH:MM:SS
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600)
      .toString()
      .padStart(2, '0');
    const mins = Math.floor((secs % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const sec = (secs % 60).toString().padStart(2, '0');
    return `${hours}:${mins}:${sec}`;
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  const getStatusColor = (index: number) => {
    if (answers[index]) return 'bg-purple-600 border-purple-600 text-black'; // Answered: purple background, black text
    if (visited[index]) return 'border-purple-400 text-black'; // Viewed: purple border, black text
    return 'bg-gray-300 text-black'; // Not attended: gray background, black text
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-100%">
      {/* Quiz Content */}
      <div className="w-full md:w-4/6 p-4">
        <div className="bg-white rounded-xl p-6 h-full">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-2">UI/UX Designing Quiz</h1>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">{Math.round(progressPercent)}%</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">
              Question {currentQuestion + 420}:
            </p>
            <div className="text-sm flex items-center space-x-1">
              <span>:mantelpiece_clock:</span>
              <span className="text-green-600 font-semibold">{formatTime(secondsElapsed)}</span>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{questions[currentQuestion].text}</p>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((opt) => (
              <div
                key={opt.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border cursor-pointer ${
                  answers[currentQuestion] === opt.id
                    ? 'bg-purple-50 border-purple-300'
                    : 'bg-white border-gray-200'
                }`}
                onClick={() => handleOptionSelect(opt.id)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${
                    answers[currentQuestion] === opt.id
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'text-purple-600 border-purple-600'
                  }`}
                >
                  {opt.id}
                </div>
                <p>{opt.text}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4 items-center pt-6">
            <button
              className="px-6 py-1 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 disabled:opacity-50"
              onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              className="px-6 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="w-full md:w-2/5 p-6">
        <div className="bg-white rounded-xl shadow-md p-7 h-full">
          <h2 className="font-bold text-lg mb-4">Section: Question</h2>
          <div className="grid grid-cols-5 gap-5 mb-4">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-full border font-semibold flex items-center justify-center text-sm ${getStatusColor(index)} ${
                  currentQuestion === index ? 'ring-2 ring-purple-400' : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center space-x-7">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-black border border-purple-600">
                <span>A</span>
              </div>
              <span className="text-sm mt-2">Answered</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-purple-400 flex items-center justify-center text-black">
                <span>A</span>
              </div>
              <span className="text-sm mt-2">Viewed</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-black">
                <span>A</span>
              </div>
              <span className="text-sm mt-2">NotViewed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
