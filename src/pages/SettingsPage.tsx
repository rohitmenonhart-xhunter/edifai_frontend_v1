import React, { useState, useEffect } from 'react';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileTopNavbar from '../components/ProfileTopNavbar';
import SettingsTabs from '../components/SettingsTab';
import RightSideBar from '../components/RightSideBar';
import { getUserProfile } from '@/services/profileService';

interface UserData {
  name: string;
  email?: string;
  role?: string;
}

const SettingsPage = () => {
  const [user, setUser] = useState<UserData>({
    name: "Student",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await getUserProfile();
        if (userData) {
          setUser({
            name: userData.name || "Student",
            email: userData.email,
            role: userData.role
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    // <div className="flex flex-col h-screen  bg-gray-100 ">
    //   <div className=" sticky top-0 z-50  ">
    //     <ProfileTopNavbar userName={user.name} />
    //   </div>
    //   <div className="flex flex-1 overflow-hidden justify-between px-16 w-full h-screen " >
    //     <div className="w-0.5/5 sticky top-0 h-screen  pt-8">
    //       <ProfileSidebar user={user} />
    //     </div>
    //     <div className="w-3/5 overflow-y-auto sticky top-0 flex justify-center pt-8" style={{scrollbarWidth:'none'}}>
    //       <SettingsTabs />
    //     </div>        
    //     <div className="w-1/5 sticky top-0 h-screen pt-8">
    //       <RightSideBar /> 

 <div className="flex flex-col h-screen  bg-gray-100 ">
      <div className=" sticky top-0 z-50  ">
        <ProfileTopNavbar userName={user.name}/>
      </div>
      <div className="flex flex-1 overflow-hidden  justify-between px-16 w-full h-screen " >
        <div className="w-0.5/5 sticky top-0 h-screen  pt-8">
        <ProfileSidebar user={user}/>
        </div>
        <div className="w-3/5 overflow-y-auto sticky top-0 flex justify-center pt-8" style={{scrollbarWidth:'none'}}>
        <SettingsTabs />
        </div>        
        <div className="w-1/5 sticky top-0 h-screen pt-8">
        <RightSideBar /> 
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;