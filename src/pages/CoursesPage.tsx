// CoursesPage.tsx
import React, { useState } from 'react';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileTopNavbar from '../components/ProfileTopNavbar';
import CoursesOverview from '../components/CoursesOverview';
import RightSideBarComp from '@/components/RightSideBarComp';
import RightSideBar from '@/components/RightSideBar';

const CoursesPage = () => {
  type Course = {
    id: string;
    image: string;
    title: string;
    progress: number;
    duration: string;
    status: string;
  };

  const [messageFromChild, setMessageFromChild] = useState<Course | null>(null);

  const handleChildMessage = (course: Course) => {
    setMessageFromChild(course);
  };

  return (  
    <div className="flex flex-col h-screen  bg-gray-100 ">
      <div className=" sticky top-0 z-50  ">
        <ProfileTopNavbar />
      </div>
      <div className="flex flex-1 overflow-hidden  justify-between px-5 w-full h-screen " >
        <div className="w-1/5 sticky top-0 h-[90vh] lg:pl-1 xl:pl-4 2xl:pl-12 3xl:pl-20  pt-8">
        <ProfileSidebar />
        </div>
        <div className="overflow-y-auto h-screen pt-8 sticky top-0 flex justify-center " style={{scrollbarWidth:'none'}}>
        <CoursesOverview sendMessage={handleChildMessage}/>
        </div>        
        <div className="sticky top-0 h-screen pt-8 lg:mr-[22px] xl:mr-[38px] 2xl:mr-[68px] 3xl:mr-[88px]">
        {messageFromChild?.status ==='Completed'?(
          <RightSideBar/>
        ):(
          <RightSideBarComp /> 
          
        )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;



