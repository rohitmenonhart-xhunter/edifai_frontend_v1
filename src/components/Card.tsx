import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, BookOpen } from "lucide-react";

// Import course images
import course1 from "../Assets/icons/course1.svg";
import course2 from "../Assets/icons/course2.svg";
import course3 from "../Assets/icons/course3.svg";
import course4 from "../Assets/icons/course4.svg";
import course5 from "../Assets/icons/course5.svg";
import course6 from "../Assets/icons/course6.svg";

// Course images mapping
const courseImages = [course1, course2, course3, course4, course5, course6];

export interface Course {
  image: string;
  title: string;
  instructor: string;
  // description: string;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  price: number;
  originalPrice: number;
  badge?: string;
  category?: string;
  _id?: string;
}

interface CardProps {
  course: Course;
}

const Recard: React.FC<CardProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/carddetail', { state: { course } });
  };

  // Check if this is a book/PDF course
  const isBookOrPDF = 
    course.title?.includes("PDF") || 
    course.title?.includes("Book") ||
    course.category === "books" || 
    course.instructor === "Self-paced";
    
  // Get a random course image from the imported images
  const getRandomCourseImage = () => {
    const randomIndex = Math.floor(Math.random() * courseImages.length);
    return courseImages[randomIndex];
  };

  return (
    <div
     className="bg-white rounded-2xl flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer  lg:w-[220px] lg:h-[350px] xl:w-[250px] xl:h-[400px] 2xl:w-[290px] 2xl:h-[500px]  3xl:h-[617px] 3xl:w-[380px] my-5" 
    > 
      <img
        src={getRandomCourseImage()}
        alt={course.title}
         className="w-full lg:h-[45%] xl:h-[45%] 2xl:h-[45%] 3xl:h-[45%] object-cover rounded-[10%] px-4 py-4 pl-4 pr-4 "
      />
      <div className="px-4 py-3 lg:width[400px] flex-1">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
          <div className="flex items-center gap-1">
            <BookOpen className=" lg:w-2 lg:h-2 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 3xl:w-6 3xl:h-6" />
            <span className="lg:text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">{course.category || "Design"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="lg:w-2 lg:h-2 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 3xl:w-6 3xl:h-6" />
            <span className="lg:text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">{course.duration}</span>
          </div>
        </div>
        <div className="text-[17px]  lg:text-[20px] xl:text-[22px] 2xl:text-[24px] 3xl:text-[24px] xl:mt-2 2xl:mt-4 font-medium text-black leading-tight">
          {course.title}
        </div>
        <p className="text-sm lg:text-[10px] xl:text-[12px] 2xl:text-sm 3xl:text-lg lg:mt-2 xl:mt-4 2x:mt-6 text-gray-500  leading-snug">
          {/* Master modern front-end development with this comprehensive React course. You'll learn to build dynamic web applications using components, hooks, routing, and state management tools like Redux. */}

          {/* {course.description} */}
        </p>
      </div>
      <div className="flex justify-end px-4 py-3 border-t lg:mt-0.5 xl:mt-1 2xl:mt-4">
        {isBookOrPDF && (
          <div className="text-sm lg:text-xs xl:text-sm 2xl:text-lg 3xl:text-xl 2xl:mt-4 text-gray-400">
            {course.price > 0 ? (
              <>
                <span className="line-through mr-3 lg:text-[10px] xl:text-xs 2xl:text-sm 3xl:text-lg">${course.originalPrice}</span>
                <span className="text-[#7E74F1] font-semibold">${course.price}</span>
              </>
            ) : (
              <span className="text-[#7E74F1] font-semibold">Free</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recard;
