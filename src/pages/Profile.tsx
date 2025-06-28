import { useState, useEffect, useMemo } from "react";
import { getUserProfile } from "@/services/profileService";
import { Button } from "@/components/ui/button";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileTopNavbar from "../components/ProfileTopNavbar";
import DashboardOverview from "../components/DashboardOverview";
import RightSideBarComp from "@/components/RightSideBarComp";

interface UserData {
  name: string;
  email?: string;
  role?: string;
}

const Profile = () => {
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
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Memoize components to prevent unnecessary re-renders
  const memoizedSidebar = useMemo(() => <ProfileSidebar user={user} />, [user]);
  const memoizedDashboard = useMemo(() => <DashboardOverview />, []);
  const memoizedRightSidebar = useMemo(() => <RightSideBarComp />, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="sticky top-0 z-50">
        <ProfileTopNavbar userName={user.name} />
      </header>
      
      <main className="flex flex-1 overflow-hidden justify-between w-full">
        {/* Left sidebar */}
        <aside className="w-1/5 h-[90vh] lg:pl-7 xl:pl-9 2xl:pl-16 3xl:pl-24 pt-8">
          {memoizedSidebar}
        </aside>
        
        {/* Main content */}
        <section className="overflow-y-auto h-screen pt-8 flex justify-center" style={{scrollbarWidth:'none'}}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            memoizedDashboard
          )}
        </section>
        
        {/* Right sidebar */}
        <aside className="h-screen pt-8 lg:mr-[22px] xl:mr-[38px] 2xl:mr-[68px] 3xl:mr-[88px]">
          {memoizedRightSidebar}
        </aside>
      </main>
    </div>
  );
};

export default Profile;
