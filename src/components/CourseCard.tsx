import React from 'react';
import { ICourse } from '@/services/courseService';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Tag, Star, Users } from "lucide-react";

// Import course images
import course1 from "../Assets/icons/course1.svg";
import course2 from "../Assets/icons/course2.svg";
import course3 from "../Assets/icons/course3.svg";
import course4 from "../Assets/icons/course4.svg";
import course5 from "../Assets/icons/course5.svg";
import course6 from "../Assets/icons/course6.svg";

// Course images mapping
const courseImages = [course1, course2, course3, course4, course5, course6];

interface CourseCardProps {
  course: ICourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  // Format duration from minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
  };

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
    <Card className="overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
      <div className="relative">
        <img 
          src={getRandomCourseImage()}
          alt={course.title} 
          className="h-48 w-full object-cover"
        />
        {course.discount && (
          <div className="absolute top-0 right-0 bg-red-600 text-white p-1 px-2 text-xs font-bold">
            {course.discount}% OFF
          </div>
        )}
      </div>
      
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg line-clamp-2 flex-1">{course.title}</h3>
          <div className="flex items-center ml-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm ml-1">{course.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 pb-0">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{course.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            {formatDuration(course.duration)}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Tag className="h-3 w-3 mr-1" />
            {course.level}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Users className="h-3 w-3 mr-1" />
            {course.enrolledUsers?.length || 0} students
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-3 flex justify-between items-center">
        <div>
          {course.discount ? (
            <div className="flex items-center">
              <span className="text-lg font-bold text-primary">${discountedPrice.toFixed(2)}</span>
              <span className="text-xs line-through ml-2 text-gray-500">${course.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-primary">${course.price.toFixed(2)}</span>
          )}
        </div>
        
        <Button 
          size="sm" 
          onClick={() => navigate(`/course/${course._id}`)}
        >
          View Course
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;