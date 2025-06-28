import React from 'react';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileTopNavbar from '../components/ProfileTopNavbar';
import EnrolledCourses from '../components/EnrolledCourses';

const CoursesProfilePage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="sticky top-0 z-50">
        <ProfileTopNavbar />
      </div>
      <div className="flex flex-1 overflow-hidden justify-between px-5 w-full h-screen">
        <div className="w-1/5 sticky top-0 h-screen pt-8">
          <ProfileSidebar />
        </div>
        <div className="w-full overflow-x-auto sticky top-0 flex justify-center ml-4" style={{scrollbarWidth:'none'}}>
          <EnrolledCourses />
        </div>                
      </div>
    </div>
  );
};

export default CoursesProfilePage; 