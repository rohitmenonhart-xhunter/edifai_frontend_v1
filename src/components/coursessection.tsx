"use client";

import { useState, useEffect } from "react";
import {
  Monitor,
  PenTool,
  Briefcase,
  Megaphone,
  Camera,
  PlayCircle,
  ArrowUp,
  BookOpen,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import courseService, { ICourse } from "@/services/courseService";
import { toast } from "sonner";

// Import course images
import course1 from "../Assets/icons/course1.svg";
import course2 from "../Assets/icons/course2.svg";
import course3 from "../Assets/icons/course3.svg";
import course4 from "../Assets/icons/course4.svg";
import course5 from "../Assets/icons/course5.svg";
import course6 from "../Assets/icons/course6.svg";

// Course images mapping
const courseImages = [course1, course2, course3, course4, course5, course6];

// Recard component - Updated to use real course data
function Recard({ course }: { course: ICourse }) {
  const navigate = useNavigate();

  // Format duration from minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
  };

  // Calculate discount percentage if available
  const discountPercent = course.discount ? `${course.discount}% OFF` : null;
  
  // Calculate discounted price
  const discountedPrice = course.discount 
    ? course.price - (course.price * (course.discount / 100))
    : course.price;
    
  // Get a random course image from the imported images
  const getRandomCourseImage = () => {
    const randomIndex = Math.floor(Math.random() * courseImages.length);
    return courseImages[randomIndex];
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer lg:w-[215px] lg:h-[350px] xl:w-[250px] xl:h-[400px] 2xl:w-[290px] 2xl:h-[500px] 3xl:h-[500px] 3xl:w-[380px] lg:my-2 xl:my-5"
      onClick={() => navigate(`/course/${course._id}`)}
    >
      <img
        src={getRandomCourseImage()}
        alt={course.title}
        className="w-full lg:h-[45%] xl:h-[45%] 2xl:h-[45%] 3xl:h-[45%] object-cover rounded-[10%] px-4 py-4 pl-4 pr-4"
      />
      <div className="px-4 py-[1rem]">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
          <div className="flex items-center space-x-1">
            <BookOpen className="lg:w-2 lg:h-2 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 3xl:w-6 3xl:h-6" />
            <span className="lg:text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">{course.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="lg:w-2 lg:h-2 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 3xl:w-6 3xl:h-6" />
            <span className="lg:text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">{formatDuration(course.duration)}</span>
          </div>
        </div>
        <h3 className="min-h-[3rem] lg:text-lg xl:text-[22px] 2xl:text-[24px] 3xl:text-[24px] xl:mt-2 2xl:mt-4 font-medium text-gray-900 leading-tight">
          {course.title}
        </h3>
        <p className="text-sm lg:text-[10px] xl:text-[12px] 2xl:text-sm 3xl:text-[1rem] xl:mt-2 2xl:mt-6 text-[#696984] leading-snug">
          {course.description}
        </p>
        <div className="flex items-center justify-end px-0 py-1 lg:mt-0.5 xl:mt-1 2xl:mt-4">
          <div className="lg:text-xs xl:text-sm 2xl:text-lg 3xl:text-xl 2xl:mt-4 text-gray-400">
            {course.discount && (
              <span className="line-through mr-2 lg:text-[10px] xl:text-[10px] 2xl:text-xs 3xl:text-sm">
                ${course.price.toFixed(2)}
              </span>
            )}
            <span className="lg:text-[15px] xl:text-sm 2xl:text-base 3xl:text-lg font-bold text-purple-600">
              ${discountedPrice.toFixed(2)}
            </span>
          </div>
        </div>
        {discountPercent && (
          <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {discountPercent}
          </span>
        )}
      </div>
    </div>
  );
}

// Dummy category data - keep this
const categories = [
  { id: "all", label: "All Courses", icon: <Monitor className="w-5 h-5" /> },
  { id: "IoT", label: "IoT", icon: <Monitor className="w-5 h-5" /> },
  { id: "UI/UX", label: "UI/UX", icon: <PenTool className="w-5 h-5" /> },
  { id: "Full Stack", label: "Full Stack", icon: <Briefcase className="w-5 h-5" /> },
  { id: "Mechanical", label: "Mechanical", icon: <Megaphone className="w-5 h-5" /> }
];

export default function CategoryTabsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await courseService.getCourses();
        setCourses(data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to fetch courses. Please try again later.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on the active category
  const filteredCourses = activeCategory === "all" 
    ? courses 
    : courses?.filter(course => course?.category === activeCategory) || [];

  return (
    <section className="bg-white py-10 px-5">
      <div className="text-center mb-12">
        <h2 className="lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-5xl font-medium">
          Explore Our Top Courses
            </h2>
        <p className="lg:text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl font-normal text-gray-500 my-4 max-w-3xl mx-auto">
          Discover our interactive courses taught by industry experts
            </p>
          </div>

      {/* Category Buttons */}
      <div className="flex justify-center flex-wrap items-center gap-2 mb-10">
        {categories.map((category) => (
              <button
                    key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 py-2 px-5 rounded-full transition-colors ${
              activeCategory === category.id
                ? "text-[#8A63FF] bg-gradient-to-b from-transparent from-49.76% via-transparent to-[rgba(138,99,255,0.24)] border-b-2 border-[#8A63FF]"
                : "text-gray-500 hover:text-[#8A63FF]"
            }`}
          >
            <span className="hidden sm:inline-block">{category.icon || <Monitor className="w-5 h-5" />}</span>
                    <span>{category.label}</span>
          </button>
                ))}
              </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
      ) : filteredCourses?.length > 0 ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCourses?.map((course) => (
              <Recard key={course._id} course={course} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold">No courses found</h3>
          <p className="text-gray-500 mt-2">
            No courses available in this category
          </p>
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white border border-gray-300 hover:border-purple-600 hover:text-purple-600 transition-colors"
        >
          <span className="text-lg font-bold">View All</span>
          <ArrowUp className="rotate-45" />
        </Link>
      </div>
    </section>
  );
}