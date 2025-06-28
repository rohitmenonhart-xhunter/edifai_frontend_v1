import React, { memo } from 'react';
import { Search, Bell, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "../Assets/EDIFAI.svg";

interface ProfileTopNavbarProps {
  userName?: string;
}

const ProfileTopNavbar: React.FC<ProfileTopNavbarProps> = memo(({ userName = 'User' }) => {
  return (
    <div className="bg-white p-1 px-16 flex items-center justify-around shadow-md rounded-lg w-full h-20">
      {/* Logo */}
      <Link to="/" className="text-[#8A63FF] font-bold text-[36px]">
        <img src={logo} className="w-[8rem]" alt="EDIFAI Logo" />
      </Link>

      {/* Search Bar */}
      <div className="relative flex-grow mx-[25%]">
        <input
          type="text"
          placeholder="Search Anything here"
          className="w-full py-3 pl-10 pr-4 rounded-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-[#8A63FF] focus:border-transparent"
          aria-label="Search"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* User Icons */}
      <div className="flex items-center space-x-4">
        <Link to="/notifications">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-[#8A63FF] border rounded-[50%] border-[#8A63FF] hover:text-white hover:bg-[#8A63FF]"
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6" />
          </Button>
        </Link>
        
        <Link to="/wishlist">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-[#8A63FF] border rounded-[50%] border-[#8A63FF] hover:bg-[#8A63FF] hover:text-white"
            aria-label="Wishlist"
          >
            <Heart className="h-6 w-6" />
          </Button>
        </Link>

        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#8A63FF] cursor-pointer">
          <img 
            src="/placeholder.svg" 
            alt={`${userName}'s Avatar`} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
});

ProfileTopNavbar.displayName = 'ProfileTopNavbar';

export default ProfileTopNavbar;