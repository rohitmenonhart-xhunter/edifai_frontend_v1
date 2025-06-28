import React from "react";

import uparrow from "../Assets/uparrow.svg";
import clock from "../Assets/clock.svg";
import Completed from '../Assets/icons/Completed.svg';
import defaultCourseImage from '../Assets/icons/course1.svg';

interface CourseProps {
  id: string;
  title: string;
  duration: string;
  progress: number;
  image?: string;
  status: string;
}

interface DashboardCardProps {
  course: CourseProps;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ course }) => {
  // Check if course object exists
  if (!course) {
    return null;
  }

  // Get status from course or calculate it from progress
  const status = course.status || (course.progress === 100 ? "Completed" : `${course.progress}%`);

  return (
    <div className="rounded-[20px] lg:mb-4 xl:mb-4 2xl:mb-4 3xl:mb-5 flex justify-center items-center shadow-lg overflow-hidden  lg:h-[255px] lg:w-[160px]  xl:h-[295px] xl:w-[213px] 2xl:h-[305px] 2xl:w-[240px]  3xl:w-[309px] 3xl:h-[335px] ">
      <div className="lg:w-[155px] lg:h-[245px] xl:w-[195px] xl:h-[275px] 2xl:w-[219px] 2xl:h-[285px] 3xl:w-[269px] 3xl:h-[295px] ">
        <div className="overflow-y-hidden lg:h-[105px] xl:h-[130px] 2xl:h-[150px] 3xl:h-[50%]  w-full">
          <img
            src={course.image || defaultCourseImage}
            alt={course.title || "Course"}
            className="object-cover w-full h-full rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultCourseImage;
            }}
          />
        </div>
        <div className="lg:h-[50px] xl:h-[70px] 2xl:h-[80px] 3xl:h-[97px] mt-4 ">
        <h3 className="font-semibold h-[40px]  lg:text-[13px] xl:text-[14px] text-gray-900">
            {course.title || "Untitled Course"}
          </h3>
        <div className="w-15 h-11  flex items-center  justify-start gap-x-3 ">
          <img src={clock} className="lg:h-[15px] xl:h-[17px] xl:w-[15px] 2xl:h-[19px] 2xl:w-[17px] 3xl:h-[21px] 3xl:w-[19px] mr-1" />
            <p className="text-gray-600 lg:text-[10px] xl:text-[11px] 2xl:text-[12px] ">{course.duration || "N/A"}</p>
          </div>
          {status === "Completed" ? (
            <div className="flex">
              <img src={Completed} className="mr-2 lg:h-[18px] lg:w-[18px] xl:h-[20px] xl:w-[20px] 2xl:h-[22px] 2xl:w-[22px] 3xl:h-[24px] 3xl:w-[24px] " alt="Completed" /> 
              <p className="lg:text-[14px] xl:text-[16px] text-gray-500"> 
                Complete
              </p>
            </div>
          ) : (
            <div>
              <div className="lg:w-[40px] lg:h-[14px] xl:w-[44px] xl:h-[16px] 2xl:w-[48px] 2xl:h-[18px] 3xl:w-[54px] 3xl:h-[20px]  bg-[#8A63FF] rounded-lg  flex items-center justify-center mb-2">
                <img src={uparrow} className="p-1" alt="Progress" />
                <p className="lg:text-[10px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[13px] text-white  font-semibold">
                  {course.progress || 0}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-[#8A63FF] lg:h-[6px] xl:h-[7px] 2xl:h-[7px] 3xl:h-[8px] w-full rounded-full"  
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
 