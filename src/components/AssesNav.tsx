import React, { useEffect, useState } from 'react';
import LearningModule from './LearningModule'; // Stub for LearningModule (replace with actual implementation if available)
import { useNavigate } from 'react-router-dom';


// ClipboardIcon Component
const ClipboardIcon: React.FC = () => (
  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v2m-7-9v2a2 2 0 002 2h14a2 2 0 002-2v-2M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);

// CheckCircleIcon Component
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`w-5 h-5 text-green-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

// FileTextIcon Component
const FileTextIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`w-5 h-5 text-blue-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
  </svg>
);

// APlusIcon Component
const APlusIcon: React.FC = () => (
  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

// Assessment and Projects Components
type AssessmentStatus = 'completed' | 'Submitted' | 'Failed' | 'In Progress';

interface Assessment {
  id: number;
  type: 'Assessment' | 'Project';
  number: number;
  title: string;
  score: string;
  status: AssessmentStatus;
  date: string;
}

interface AssessmentRowProps {
  assessment: Assessment;
}

const AssessmentRow: React.FC<AssessmentRowProps> = ({ assessment }) => {
  const getStatusDisplay = (status: AssessmentStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center text-green-600 font-medium">
            <CheckCircleIcon className="mr-1" /> completed
          </span>
        );
      case 'Submitted':
        return (
          <span className="flex items-center text-blue-600 font-medium">
            <FileTextIcon className="mr-1" /> Submitted
          </span>
        );
      case 'Failed':
        return (
          <span className="flex items-center text-red-600 font-medium">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Failed
          </span>
        );
      case 'In Progress':
        return (
          <span className="flex items-center text-yellow-600 font-medium">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            In Progress
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-2 pr-4">
        <APlusIcon />
        <span className="text-gray-700 font-medium whitespace-nowrap">
          {assessment.type} {assessment.number}
        </span>
      </div>
      <div className="text-gray-800 font-medium px-4">{assessment.title}</div>
      <div className="text-gray-600 text-sm px-4 whitespace-nowrap">{assessment.score}</div>
      <div className="px-4 whitespace-nowrap">{getStatusDisplay(assessment.status)}</div>
      <div className="text-gray-500 text-sm pl-4 whitespace-nowrap text-right">{assessment.date}</div>
    </div>
  );
};

// Main DashboardPage Component
type Course = {
  image: string;
  title: string;
  progress: number;
  duration: string;
  status: string;
};

type Props = {
  selectedCourse: Course;
};
const DashboardPage: React.FC<Props> = ({selectedCourse}) => {
  const [showAssessments, setShowAssessments] = useState(false);
  const [completed,setCompleted] = useState(false)

  const initialAssessments: Assessment[] = [
    { id: 1, type: 'Assessment', number: 1, title: 'Foundation of AWS', score: '(80/100)', status: 'completed', date: 'May 7, 2025 11:00 AM' },
    { id: 2, type: 'Assessment', number: 2, title: 'Core AWS Services', score: '(80/100)', status: 'completed', date: 'May 7, 2025 11:00 AM' },
    { id: 3, type: 'Assessment', number: 3, title: 'Storage Solutions', score: '(80/100)', status: 'completed', date: 'May 7, 2025 11:00 AM' },
    { id: 4, type: 'Project', number: 1, title: 'Databases in AWS', score: 'Reviewed', status: 'Submitted', date: 'May 7, 2025 11:00 AM' },
    { id: 5, type: 'Assessment', number: 4, title: 'Cost Optimization', score: '(80/100)', status: 'completed', date: 'May 7, 2025 11:00 AM' },
  ];

  const handleToggleAssessments = () => {
    setShowAssessments((prevState) => !prevState);
  };

useEffect(()=>{
   if(selectedCourse?.status ==="100%"){
  setCompleted(true)
 }else{
  setCompleted(false)
 }
},[selectedCourse])

const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Top Action Buttons */}
      <div className="bg-white p-4 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 shadow-sm">
        <div>
          <button
            className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 text-sm hover:bg-blue-50 transition-colors mb-2 sm:mb-0"
         onClick={() => {
              navigate('/learningoverview');
              window.scrollTo(0, 0);
            }}
          >
      
            Start Over Again
          </button>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Certificate
          </button>
          <button
            onClick={handleToggleAssessments}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ClipboardIcon />
            Assessments & Projects
          </button>
        </div>
      </div>
        

      <div className="container mx-auto p-6 md:p-10 lg:p-12">
        {/* Course Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              {selectedCourse?.title}
              <CheckCircleIcon className="ml-3 text-lg" />
              <span className="text-base font-normal text-green-600 ml-1">{selectedCourse?.status ==="100%"?"Completed":selectedCourse?.status}</span>
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-sm">
            <span className="text-purple-700 font-semibold mr-1">Technology :</span>
            <span className="mr-3">By KenyWhite In Business, IT & Software,</span>
            <span className="ml-1 text-gray-600">4.8 (280)</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Last Visited: Sept 12, 2024</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Course Progress and Suggested Next */}
          <div className="lg:col-span-1 space-y-8">
            {/* Complete Few Courses Card */}
            <div className="relative p-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg shadow-lg text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/hexagons.png)', backgroundSize: '100px' }}></div>
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-2">Complete Few Courses</h2>
                <p className="text-sm text-purple-200 mb-4">To Unlock Overall Certificate</p>
                <p className="text-4xl font-bold mb-4">02/10</p>
                <div className="w-full bg-purple-400 h-2 rounded-full mb-6">
                  <div className="bg-white h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
                <button className="px-6 py-2 bg-white text-purple-700 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  Start Now
                </button>
                <img src="https://i.imgur.com/8Q9P7Lg.png" alt="Trophy" className="absolute bottom-0 right-0 w-32 h-32 opacity-80" />
                <img src="https://i.imgur.com/Q2y2c6M.png" alt="Trophy" className="absolute bottom-0 right-16 w-24 h-24 opacity-80" />
              </div>
            </div>

            {/* Suggested Next Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Suggested Next</h3>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <img
                  src="https://via.placeholder.com/400x200/333333/ff0000?text=Hexagon+Pattern"
                  alt="AWS Certified Solutions Architect"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">AWS Certified Solutions Architect</h4>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>3 Months</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-green-500 font-bold text-sm mr-2">↑ 50%</span>
                  <div className="flex-grow bg-gray-200 h-2 rounded-full">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Conditional Assessments & Projects, Overview, Mentor, Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Assessments & Projects Section */}
            {showAssessments && (
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Assessments & Projects</h2>
                <div className="overflow-x-auto">
                  <div className="min-w-[600px] md:min-w-full">
                    {initialAssessments.map((assessment) => (
                      <AssessmentRow key={assessment?.id} assessment={assessment} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Overview Section */}
            {!showAssessments && (
              <section className="bg-white p-6 rounded-lg shadow-md border border-blue-500 border-dashed">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Magnadui ullamcorper bibendum dictum aliquam commodo. Etiam condimentum amet porttitor aliquet egestas amet in.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Morbi iaculis duis in feugiat in lacus netus lacus. Ut aliquam nisi fringilla enim pharetra. A sit sit nulla sed. Quis cras sensus non malesuada leo facilisi at consectetur eget. Turpis blandit et nam neque augue. Facilisis parturient dictum non lacus auctor quisque. Sapien justo sed sed. Rutrum odio channel et diam lobortis dui sapien iaculis. Etiam tellus urna malesuada sit leo amet. Libero ornare tristique neque dis in duis. Placerat elit vivamus euismod sit.
                </p>
              </section>
            )}

            {/* Mentor Section */}
            {!showAssessments && (
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Mentor</h2>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Mentor Pensive-Tesla"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Pensive-Tesla</h3>
                    <div className="flex space-x-3 text-gray-500 text-sm mt-1">
                      <a href="#" className="hover:text-blue-600">Facebook</a>
                      <a href="#" className="hover:text-blue-600">X (Twitter)</a>
                      <a href="#" className="hover:text-blue-600">Email</a>
                      <a href="#" className="hover:text-blue-600">Website</a>
                    </div>
                    <p className="text-gray-700 text-sm mt-2 max-w-lg">
                      For React Native, we decided to use web paradigm for this where you can nest text to achieve the same effect.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Reviews Section */}
            {!showAssessments && (
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                  <div className="flex items-end mb-4 sm:mb-0">
                    <span className="text-6xl font-bold text-gray-900">5.0</span>
                    <div className="ml-3">
                      <span className="text-gray-500 text-sm block mt-1">6 ratings</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    Write A Review
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;