import React from 'react';
import QuizAttemptComponent from '@/components/QuizAttempt';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const QuizAttempt: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <QuizAttemptComponent />
      </main>
      <Footer />
    </div>
  );
};

export default QuizAttempt; 