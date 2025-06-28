// DashboardPage.tsx
import React, { useState } from 'react';

// --- Reusable SVG Icons ---
const DownloadIcon: React.FC = () => (
  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
  </svg>
);

const ClipboardIcon: React.FC = () => (
  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v2m-7-9v2a2 2 0 002 2h14a2 2 0 002-2v-2M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);

const ThumbsUpIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H6v-4h1v4H6l-3.5-7A2 2 0 014.764 10H10l-1-7h10l1-7H14a2 2 0 012 2v4a2 2 0 01-2 2H10a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v3z"></path>
  </svg>
);

const ThumbsDownIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3H18v4h-1V3h-1l3.5 7A2 2 0 0119.236 14H14l1 7h-10l-1 7H10a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v3z"></path>
  </svg>
);

const CheckCircleIcon: React.FC = () => (
  <svg className={`w-5 h-5 text-green-500 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const FileTextIcon: React.FC = () => (
  <svg className={`w-5 h-5 text-blue-500 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
  </svg>
);

const APlusIcon: React.FC = () => (
  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
); // This is a generic info icon, you might need a custom A+ SVG


// --- StarRating Component ---
interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'small' | 'medium' | 'large';
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5, size = 'medium' }) => {
  const starSize = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };

  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={index}
            className={`${starSize[size]} ${starValue <= rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .587l3.668 7.424 8.219 1.194-5.967 5.819 1.406 8.188L12 18.896l-7.326 3.856 1.406-8.188-5.967-5.819 8.219-1.194L12 .587z" />
          </svg>
        );
      })}
    </div>
  );
};

// --- ReviewCard Component ---
interface Review {
  id: number;
  reviewerName: string;
  rating: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="border-t border-gray-200 py-6 first:border-t-0">
      <div className="flex items-start space-x-4">
        <img
          src="https://via.placeholder.com/48" // Placeholder avatar
          alt={`Avatar of ${review.reviewerName}`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">{review.reviewerName}</h4>
              <StarRating rating={review.rating} size="small" />
            </div>
            <div className="flex space-x-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <ThumbsUpIcon />
                <span>{review.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-red-500">
                <ThumbsDownIcon />
                <span>{review.dislikes}</span>
              </button>
            </div>
          </div>
          <h5 className="font-medium text-gray-800 mb-1">{review.title}</h5>
          <p className="text-gray-600 text-sm">{review.content}</p>
        </div>
      </div>
    </div>
  );
};

// --- Assessment and Projects Components ---
type AssessmentStatus = 'completed' | 'Submitted' | 'Failed' | 'In Progress';

interface Assessment {
  id: number;
  type: 'Assessment' | 'Project';
  number: number;
  title: string;
  score: string; // e.g., "(80/100)" or "Reviewed"
  status: AssessmentStatus;
  date: string; // e.g., "May 7, 2025 11:00 AM"
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
            {/* You might want a different icon for failed */}
            <CheckCircleIcon className="mr-1 transform rotate-45" /> Failed
          </span>
        );
      case 'In Progress':
        return (
          <span className="flex items-center text-yellow-600 font-medium">
             {/* You might want a different icon for in progress */}
            <CheckCircleIcon className="mr-1 opacity-50" /> In Progress
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center py-3 border-b border-gray-100 last:border-b-0">
      {/* Icon and Type */}
      <div className="flex items-center space-x-2 pr-4">
        <APlusIcon /> {/* Represents the A+ icon */}
        <span className="text-gray-700 font-medium whitespace-nowrap">
          {assessment.type} {assessment.number}
        </span>
      </div>

      {/* Title */}
      <div className="text-gray-800 font-medium px-4">{assessment.title}</div>

      {/* Score */}
      <div className="text-gray-600 text-sm px-4 whitespace-nowrap">{assessment.score}</div>

      {/* Status */}
      <div className="px-4 whitespace-nowrap">{getStatusDisplay(assessment.status)}</div>

      {/* Date */}
      <div className="text-gray-500 text-sm pl-4 whitespace-nowrap text-right">
        {assessment.date}
      </div>
    </div>
  );
};


// --- Main DashboardPage Component ---
const AssessmentDashboardPage: React.FC = () => {
  const initialReviews: Review[] = [
    {
      id: 1,
      reviewerName: 'Narendra',
      rating: 5,
      title: 'Excellent Content and Mentorship!',
      content: 'This course provided a deep dive into the subject matter. The explanations were clear, and the practical exercises were very helpful. Narendra\'s insights were invaluable, making complex topics easy to grasp. Highly recommend!',
      likes: 12,
      dislikes: 0,
    },
    {
      id: 2,
      reviewerName: 'Priya S.',
      rating: 4,
      title: 'Very Informative, but a bit fast-paced',
      content: 'The content is top-notch and covers a wide range of topics. I found some sections moved a bit quickly for a beginner, but re-watching the lectures helped. Overall, a great resource for learning.',
      likes: 8,
      dislikes: 1,
    },
    {
      id: 3,
      reviewerName: 'Amit K.',
      rating: 5,
      title: 'Revolutionary concepts taught clearly',
      content: 'I\'ve been looking for a course like this for a long time. The way complex concepts are broken down is fantastic. The mentor is truly an expert and makes learning enjoyable. Five stars!',
      likes: 20,
      dislikes: 0,
    },
    {
      id: 4,
      reviewerName: 'Deepa V.',
      rating: 5,
      title: 'Highly Recommended for practical knowledge',
      content: 'The practical examples and real-world applications discussed in this program are incredibly useful. It\'s not just theoretical; you actually learn how to implement these concepts. The mentor\'s experience shines through.',
      likes: 15,
      dislikes: 0,
    },
    {
      id: 5,
      reviewerName: 'Rajesh M.',
      rating: 5,
      title: 'Transformative Learning Experience',
      content: 'This platform has transformed my understanding of the subject. The modules are well-structured, and the assignments challenge you to apply what you\'ve learned. Kudos to the entire team!',
      likes: 10,
      dislikes: 0,
    },
    {
      id: 6,
      reviewerName: 'Sarita L.',
      rating: 5,
      title: 'Best decision for my career growth',
      content: 'Enrolling in this course was one of the best decisions for my career. The skills I\'ve gained are directly applicable to my work, and I feel much more confident. Thank you for such a valuable program!',
      likes: 18,
      dislikes: 0,
    },
  ];

  const initialAssessments: Assessment[] = [
    { id: 1, type: 'Assessment', number: 1, title: 'Foundation of AWS', score: '(80/100)', status: 'completed', date: 'May 7, 2025 11:00 AM' },
    { id: 2, type: 'Assessment', number: 2, title: 'Core AWS Services', score: '(80/100)', status: 'completed', date: 'May 7, 2025 11:00 AM' },
    { id: 3, type: 'Assessment', number: 2, title: 'Storage Solutions', score: '(80/100)', status: 'completed', date: 'May 7, 2025 11:00 AM' },
    { id: 4, type: 'Project', number: 1, title: 'Databases in AWS', score: 'Reviewed', status: 'Submitted', date: 'May 7, 2025 11:00 AM' },
    { id: 5, type: 'Assessment', number: 4, title: 'Cost Optimization', score: '(80/100)', status: 'completed', date: 'May 7, 2025 11:00 AM' },
  ];

  const [loadedReviewsCount, setLoadedReviewsCount] = useState(3);

  const handleLoadMoreReviews = () => {
    setLoadedReviewsCount(prevCount => Math.min(prevCount + 3, initialReviews.length));
  };

  const reviewCounts: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  initialReviews.forEach(review => {
    if (reviewCounts[review.rating] !== undefined) {
      reviewCounts[review.rating]++;
    }
  });

  const totalRatings = initialReviews.length;
  const averageRating = totalRatings > 0
    ? (initialReviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Top Action Buttons (from Screenshot 2) */}
      <div className="bg-white p-4 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 shadow-sm">
        <button className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 text-sm hover:bg-blue-50 transition-colors mb-2 sm:mb-0">
          Start Over Again
        </button>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
            <DownloadIcon />
            Download Certificate
          </button>
          {/* This button would typically navigate to the Assessments & Projects view */}
          <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ClipboardIcon />
            Assessments & Projects
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column for Course Progress and Suggested Next */}
        <div className="lg:col-span-1 space-y-8">
          {/* Complete Few Courses Card */}
          <div className="relative p-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg shadow-lg text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/hexagons.png)', backgroundSize: '100px' }}></div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold mb-2">Complete Few Courses</h2>
              <p className="text-sm text-purple-200 mb-4">To Unlock over all Certificate</p>
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
                alt="AWS Certified solutions Architect"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">AWS Certified solutions Architect</h4>
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>3 Month</span>
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

        {/* Right Column for Overview, Mentor, Reviews, and now Assessments & Projects */}
        <div className="lg:col-span-2 space-y-8">
          {/* Assessments & Projects Section (NEW) */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Assessments & Projects</h2>
            <div className="overflow-x-auto"> {/* Enable horizontal scrolling for small screens */}
              <div className="min-w-[600px] md:min-w-full"> {/* Ensure min-width for columns */}
                {initialAssessments.map(assessment => (
                  <AssessmentRow key={assessment.id} assessment={assessment} />
                ))}
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section className="bg-white p-6 rounded-lg shadow-md border border-blue-500 border-dashed">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Magnadui ullamcorper bibendum dictum aliquam commodo. Etiam condimentum amet porttitor aliquet egestas amet in.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Morbi iaculis duis in feugiat in lacus netus lacus. Ut aliquam nisi fringilla enim pharetra. A sit sit nulla sed. Quis cras sensus non malesuada leo facilisi at consectetur eget. Turpis blandit et nam neque augue. Facilisis parturient dictum non lacus auctor quisque. Sapien justo sed sed. Rutrum odio channel et diam lobortis dui sapien iaculis. Etiam tellus urna malesuada sit leo amet. Libero ornare tristique neque dis in duis. Placerat elit vivamus euismod sit.
            </p>
          </section>

          {/* Mentor Section */}
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

          {/* Reviews Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <div className="flex items-end mb-4 sm:mb-0">
                <span className="text-6xl font-bold text-gray-900">{averageRating}</span>
                <div className="ml-3">
                  <StarRating rating={Math.round(parseFloat(averageRating))} size="medium" />
                  <span className="text-gray-500 text-sm block mt-1">{totalRatings} ratings</span>
                </div>
              </div>
              <button className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                Write A Review
              </button>
            </div>
            <div className="mb-8">
              {Object.entries(reviewCounts)
                .sort(([ratingA], [ratingB]) => parseInt(ratingB) - parseInt(ratingA))
                .map(([rating, count]) => (
                  <div key={rating} className="flex items-center mb-2">
                    <span className="text-gray-700 w-8 font-medium">{rating}</span>
                    <StarRating rating={1} size="small" />
                    <div className="flex-grow bg-gray-200 h-2 rounded-full mx-3">
                      <div
                        className="bg-yellow-500 h-full rounded-full"
                        style={{ width: `${(count / (Math.max(...Object.values(reviewCounts)) || 1)) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-600">{count}</span>
                  </div>
                ))}
            </div>
            <div>
              {initialReviews.slice(0, loadedReviewsCount).map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {loadedReviewsCount < initialReviews.length && (
              <div className="text-center mt-6">
                <button
                  onClick={handleLoadMoreReviews}
                  className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AssessmentDashboardPage;