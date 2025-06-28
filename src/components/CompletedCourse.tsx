import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mentor from "../Assets/Image-60.png";
import Completed from "../Assets/icons/Completed.svg";
import star from "../Assets/icons/Star.svg";
import like from '../Assets/icons/Like.svg'
import dislike from '../Assets/icons/Dislike.svg'
import Aplus from '../Assets/icons/A-plus.svg'
import Submitted from "../Assets/icons/Submitted.svg";
import Assessment from "../Assets/icons/Assesment.svg";
import Facebook from '../Assets/icons/Facebook.svg'
import X from "../Assets/icons/X.svg"
import youtube from "../Assets/icons/Youtube.svg"
import Instagram from '../Assets/icons/Instagram.svg'
import startoverAgaing from '../Assets/icons/Start-over-again.svg'
import download from '../Assets/icons/Download.svg'


const APlusIcon: React.FC = () => (
  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const FileTextIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`w-5 h-5 text-blue-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
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
          <span className="flex items-center  font-medium">
            <img src={Completed} className="mr-1" style={{height:'20px'}} alt="" /> completed
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
    <div className="lg:flex lg:py-1 lg:text-[10px] lg:w-[445px] xl:flex xl:py-1 xl:w-[570px]  2xl:flex  2xl:w-[750px] 2xl:text-[12px] 3xl:flex 3xl:py-2 justify-between 3xl:w-[800px] 3xl:text-[15px] border-b border-gray-300 flex  last:border-b-0">
      <div className="flex items-center space-x-2 pr-4 justify-items-start lg:w-24  xl:w-28 2xl:w-36 3xl:w-36">
        <img src={Aplus} alt="" />
        <span className="text-gray-700 font-medium whitespace-nowrap lg:text-[9px]  xl:text-[11px] 2xl:text-[15px]  3xl:text-[16px] 3xl:w-36 ">
          {assessment.type} {assessment.number}
        </span>
      </div>
      <div className="text-gray-700 font-medium flex justify-center items-center lg:text-[9px] lg:w-24  xl:text-[11px] xl:w-28  2xl:text-[14px] 2xl:w-36  3xl:text-[15px]  3xl:w-36">
        {assessment.title}
      </div>
      <div className="text-gray-600 flex justify-center items-center lg:text-[9px] lg:w-12 xl:text-[11px] xl:w-16 2xl:text-[14px]  2xl:w-24  3xl:text-[15px] 3xl:w-24 ">
        {assessment.score}
      </div>
      <div className="flex justify-start lg:text-[9px]  lg:w-20 xl:text-[11px] 2xl:text-[14px] xl:w-28  2xl:w-32 3xl:text-[15px]  3xl:w-36">
        {getStatusDisplay(assessment.status)}
      </div>
      <div className="text-gray-500 flex justify-start items-center lg:text-[9px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px]  3xl:w-40">
        {assessment.date}
      </div>
    </div>
  );
};

type Course = {
  id: string;
  image: string;
  title: string;
  progress: number;
  duration: string;
  status: string;
};

// --- Reusable SVG Icons ---
const DownloadIcon: React.FC = () => (
  <svg
    className="w-4 h-4 mr-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    ></path>
  </svg>
);

const RestartIcon: React.FC = () => (
  <svg
    className="w-7 h-6 mr-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4V1L8 5l4 4V6a6 6 0 016 6 6 6 0 11-6-6"
    />
  </svg>
);


const ClipboardIcon: React.FC = () => (
  <svg
    className="w-4 h-4 mr-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 17v2m-7-9v2a2 2 0 002 2h14a2 2 0 002-2v-2M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <svg
    className={`w-5 h-5 text-green-500 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const ThumbsUpIcon: React.FC = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H6v-4h1v4H6l-3.5-7A2 2 0 014.764 10H10l-1-7h10l1-7H14a2 2 0 012 2v4a2 2 0 01-2 2H10a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v3z"
    ></path>
  </svg>
);

const ThumbsDownIcon: React.FC = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14H5.236a2 2 0 01-1.789-2.894l-3.5-7A2 2 0 018.736 3H18v4h-1V3h-1l3.5 7A2 2 0 0119.236 14H14l1 7h-10l-1 7H10a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v3z"
    ></path>
  </svg>
);

const StarRating: React.FC<{
  rating: number;
  maxStars?: number;
  size?: "small" | "medium" | "large";
}> = ({ rating, maxStars = 5, size = "medium" }) => {
  const starSize = {
    small: "w-3 h-3",
    medium: "w-4 h-4",
    large: "w-5 h-5",
  };

  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={index}
            className={`${starSize[size]} ${
              starValue <= rating ? "text-yellow-400" : "text-gray-300"
            } fill-current`}
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

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className=" py-6 first:border-t-0">
      <div className="flex items-start space-x-4">
        <img
          src={mentor}
          alt={`Avatar of ${review.reviewerName}`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">
                {review.reviewerName}
              </h4>
              <StarRating rating={review.rating} size="small" />
            </div>
            <div className="flex space-x-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <img src={like} alt="" className="hover:bg-blue-500" />
                <span>{review.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-red-500">
                <img src={dislike} alt="" className="hover:bg-red-600" />
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


// --- Main CourseDashboardPage Component ---
const CourseDashboardPage: React.FC<{course: Course; onBack: () => void }> = ({
  course,
  onBack,
}) => {
  const [showAssessments, setShowAssessments] = useState(false);

  const initialReviews: Review[] = [
    {
      id: 1,
      reviewerName: "Narendra",
      rating: 5,
      title: "Excellent Content and Mentorship!",
      content: `This ${course?.title} course provided a deep dive into the subject matter. The explanations were clear, and the practical exercises were very helpful. Narendra's insights were invaluable, making complex topics easy to grasp. Highly recommend!`,
      likes: 12,
      dislikes: 0,
    },
    {
      id: 2,
      reviewerName: "Priya S.",
      rating: 4,
      title: "Very Informative, but a bit fast-paced",
      content: `The ${course?.title} content is top-notch and covers a wide range of topics. I found some sections moved a bit quickly for a beginner, but re-watching the lectures helped. Overall, a great resource for learning.`,
      likes: 8,
      dislikes: 1,
    },
    {
      id: 3,
      reviewerName: "Amit K.",
      rating: 5,
      title: "Revolutionary concepts taught clearly",
      content: `I've been looking for a course like ${course?.title} for a long time. The way complex concepts are broken down is fantastic. The mentor is truly an expert and makes learning enjoyable. Five stars!`,
      likes: 20,
      dislikes: 0,
    },
    {
      id: 4,
      reviewerName: "Deepa V.",
      rating: 5,
      title: "Highly Recommended for practical knowledge",
      content: `The practical examples and real-world applications discussed in ${course?.title} are incredibly useful. It's not just theoretical; you actually learn how to implement these concepts. The mentor's experience shines through.`,
      likes: 15,
      dislikes: 0,
    },
    {
      id: 5,
      reviewerName: "Rajesh M.",
      rating: 5,
      title: "Transformative Learning Experience",
      content: `This ${course?.title} course has transformed my understanding of the subject. The modules are well-structured, and the assignments challenge you to apply what you've learned. Kudos to the entire team!`,
      likes: 10,
      dislikes: 0,
    },
    {
      id: 6,
      reviewerName: "Sarita L.",
      rating: 5,
      title: "Best decision for my career growth",
      content: `Enrolling in ${course?.title} was one of the best decisions for my career. The skills I've gained are directly applicable to my work, and I feel much more confident. Thank you for such a valuable program!`,
      likes: 18,
      dislikes: 0,
    },
  ];

  const initialAssessments: Assessment[] = [
    {
      id: 1,
      type: "Assessment",
      number: 1,
      title: "Foundation of AWS",
      score: "(80/100)",
      status: "completed",
      date: "May 7, 2025 11:00 AM",
    },
    {
      id: 2,
      type: "Assessment",
      number: 2,
      title: "Core AWS Services",
      score: "(80/100)",
      status: "completed",
      date: "May 7, 2025 11:00 AM",
    },
    {
      id: 3,
      type: "Assessment",
      number: 3,
      title: "Storage Solutions",
      score: "(80/100)",
      status: "completed",
      date: "May 7, 2025 11:00 AM",
    },
    {
      id: 4,
      type: "Assessment",
      number: 1,
      title: "Databases in AWS",
      score: "Reviewed",
      status: "completed",
      date: "May 7, 2025 11:00 AM",
    },
    {
      id: 5,
      type: "Assessment",
      number: 4,
      title: "Cost Optimization",
      score: "(80/100)",
      status: "completed",
      date: "May 7, 2025 11:00 AM",
    },
  ];

  const handleToggleAssessments = () => {
    setShowAssessments((prevState) => !prevState);
  };

  const [loadedReviewsCount, setLoadedReviewsCount] = useState(3);
  const navigate = useNavigate();

  const handleLoadMore = () => {
    setLoadedReviewsCount((prevCount) =>
      Math.min(prevCount + 3, initialReviews.length)
    );
  };

  const reviewCounts: { [key: number]: number } = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  initialReviews.forEach((review) => {
    if (reviewCounts[review.rating] !== undefined) {
      reviewCounts[review.rating]++;
    }
  });

  const totalRatings = initialReviews.length;
  const averageRating =
    totalRatings > 0
      ? (
          initialReviews.reduce((sum, review) => sum + review.rating, 0) /
          totalRatings
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 w-full">
      {/* Back Button */}
      <div className="container mx-auto p-6 w-full ">
        <button
          onClick={onBack}
          className="mb-4 text-purple-600 hover:underline xl:text-lg 2xl:text-xl 3xl:text-2xl"
        >
          ← Courses
        </button>

        {/* Top Section: Course Info (Left) and Progress/Suggested (Right) */}
        <div className="flex space-x-6">
          {/* Left: Course Info and Actions */}
         <div className="flex-grow">
           <div className="space-y-6">
            <h1 className="text-2xl font-bold flex items-center">
              {course?.title}
              <span className="text-base font-normal text-green-600 ml-1 flex items-center">
                {/* <CheckCircleIcon className="ml-3 text-lg" /> */}
                <img src={Completed} className="mr-1" alt="" />
                {course?.status === "100%" ? "Completed" : course?.status}
              </span>
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-sm">
              <span className="text-purple-700 font-semibold mr-1">
                Technology:
              </span>
              <span className="mr-3">
                By KenyWhite In Business, IT & Software,
              </span> <span>|</span>
              <span className="flex ml-2">
                <img src={star} alt="" />
                <span className="ml-1 text-gray-600">
                4.8 (280)</span>
              </span>
              
            </div>
            <p className="text-gray-500 text-sm">Last Visited: Sept 12, 2024</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                className="lg:w-36 lg:text-[10px]  xl:w-42 xl:text-[12px] 2xl:w-48 2xl:text-[16px] 3xl:w-60 3xl:text-[18px] px-4 py-2 rounded-md border border-blue-600 text-white bg-violet-500 text-sm flex items-center justify-center transition-colors"
                onClick={() => {
                  navigate("/learningoverview");
                  window.scrollTo(0, 0);
                }}
              >
                <img src={startoverAgaing} alt="" className="mr-2" />
                Start Over Again
              </button>
              <button className="lg:w-40 lg:text-[10px] xl:w-48 xl:text-[12px] 2xl:w-52 2xl:text-[16px] 3xl:w-56 3xl:text-[18px]  px-4 py-2 rounded-md border border-blue-600 text-blue-600 text-sm flex items-center justify-center transition-colors">
                <img src={download} alt="" className="mr-1" />
                Download Certificate
              </button>
              <button
                className="lg:w-44 lg:text-[10px] xl:w-42 xl:text-[12px] 2xl:w-60 2xl:text-[16px] 3xl:w-64 3xl:text-[18px] px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                onClick={handleToggleAssessments}
              >
                <img src={Assessment} alt="" className="mr-1" />
                Assessments & Projects</button>
            </div>

            {/* overview section */}
            <section className=" p-1 rounded-lg w-full border ">
            {showAssessments && (
              <section className=" p-1 rounded-lg mb-5">
                <h2 className="text-2xl font-semibold mb-4">Assessments & Projects</h2>
                <div className="lg:overflow-x-auto">
                  <div className="2xl:w-[650px] lg:w-[450px]">
                    {initialAssessments.map((assessment) => (
                      <AssessmentRow key={assessment.id} assessment={assessment} />
                    ))}
                  </div>
                </div>
              </section>
            )}
            <section>
                <h2 className="text-2xl font-semibold mb-4 lg:text-red-400 xl:text-blue-400">Overview</h2>
              <p
                className="text-gray-700 leading-relaxed mb-4">
                {course?.title} is a comprehensive course designed to provide
                in-depth knowledge and practical skills. This program covers
                essential concepts, hands-on projects, and real-world
                applications to ensure you are well-prepared for your career.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Duration: {course?.duration}. Status: {course?.status}.
              </p>
              </section>         

            </section>

            {/* Mentor section */}
            <section className="p-6 rounded-lg ">
              <h2 className="text-2xl font-semibold mb-4">Mentor</h2>
              <div className="flex items-center space-x-4">
                <img
                  src={mentor}
                  alt="Mentor Pensive-Tesla"
                  className="w-25 h-25 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Pensive-Tesla
                  </h3>
                  <div className="flex space-x-3 text-gray-500 text-sm mt-1">
                    <img src={Facebook} alt="" />
                      <img src={X} alt="" />
                      <img src={Instagram} alt="" />
                      <img src={youtube} alt="" />
                  </div>
                  <p className="text-gray-700 text-sm mt-2 max-w-lg">
                    Expert mentor for {course?.title}, with extensive experience
                    in delivering practical and engaging content.
                  </p>
                </div>
              </div>
            </section>
          </div>
         
         </div>


          {/* Right: Course Progress and Suggested Next */}
          {/* <div className="lg:col-span-1 space-y-8">
            <div className="relative p-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg shadow-lg text-white overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "url(https://www.transparenttextures.com/patterns/hexagons.png)",
                  backgroundSize: "100px",
                }}
              ></div>
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-2">
                  Course Completed!
                </h2>
                <p className="text-sm text-purple-200 mb-4">{course.title}</p>
                <p className="text-4xl font-bold mb-4">100%</p>
                <div className="w-full bg-purple-400 h-2 rounded-full mb-6">
                  <div
                    className="bg-white h-full rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <button className="px-6 py-2 bg-white text-purple-700 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  View Certificate
                </button>
                <img
                  src="https://i.imgur.com/8Q9P7Lg.png"
                  alt="Trophy"
                  className="absolute bottom-0 right-0 w-32 h-32 opacity-80"
                />
                <img
                  src="https://i.imgur.com/Q2y2c6M.png"
                  alt="Trophy"
                  className="absolute bottom-0 right-16 w-24 h-24 opacity-80"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Suggested Next
              </h3>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <img
                  src="https://via.placeholder.com/400x200/333333/ff0000?text=Hexagon+Pattern"
                  alt="AWS Certified Solutions Architect"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  AWS Certified Solutions Architect
                </h4>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>3 Month</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-green-500 font-bold text-sm mr-2">
                    ↑ 50%
                  </span>
                  <div className="flex-grow bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-purple-600 h-full rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Bottom Section: Overview, Mentor, Reviews */}
       <div className="space-y-8 mt-8">
          {/* Reviews Section */}
          <section className="rounded-lg  w-full">
            <div className="p-0  mb-5 border">
              <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
              <div className="bg-white p-4 shadow-md rounded-md items-center">
                <div className="flex  justify-between items-center mb-1 w-full  ">

                {/*Rating */}
                <div className="flex flex-col mr-5 mb-4 sm:mb-0">
                  <span className="ml-1 text-2xl font-bold text-gray-900">
                    {averageRating}
                  </span>
                  <div className="ml-1 ">
                    <StarRating
                      rating={Math.round(parseFloat(averageRating))}
                      size="medium"
                    />
                    <span className="text-gray-500 text-sm block mt-1">
                      {totalRatings} ratings
                    </span>
                  </div>
                </div>
                 <div className="mb-0 w-4/6 p-4  ">
                {Object.entries(reviewCounts)
                  .sort(
                    ([ratingA], [ratingB]) =>
                      parseInt(ratingB) - parseInt(ratingA)
                  )
                  .map(([rating, count]) => (
                    <div key={rating} className="flex items-center mb-2 ">
                      <span className="text-gray-700 w-8 font-medium">
                        {rating}
                      </span>
                      <img src={star} alt="" />
                      <div className="flex-grow bg-gray-200 h-2 rounded-full mx-3">
                        <div
                          className="bg-violet-500 h-full rounded-full"
                          style={{
                            width: `${
                              (count /
                                (Math.max(...Object.values(reviewCounts)) ||
                                  1)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-gray-600">{count}</span>
                    </div>
                  ))}
              </div>
              <button className="px-6 py-2 ml-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                  Write A Review
                </button>
                
                 </div>
              
              </div>
              
            </div>

            <div className="p-6">
              {initialReviews.slice(0, loadedReviewsCount).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {loadedReviewsCount < initialReviews.length && (
              <div className="text-center mt-6">
                <button
                  onClick={handleLoadMore}
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

export default CourseDashboardPage;