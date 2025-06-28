import React from 'react';
import { IMentor } from '@/services/courseService';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star, BookOpen } from "lucide-react";

interface MentorCardProps {
  mentor: IMentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3">
          <img 
            src={mentor.avatar || '/placeholder-avatar.jpg'} 
            alt={mentor.name} 
            className="w-full h-40 sm:h-full object-cover"
          />
        </div>
        
        <div className="flex flex-col flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{mentor.name}</h3>
              <p className="text-sm font-medium text-primary">{mentor.specialization}</p>
            </div>
            
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{mentor.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-gray-600 line-clamp-3">{mentor.bio}</p>
          </div>
          
          <div className="flex items-center mt-3">
            <BookOpen className="h-4 w-4 text-gray-500" />
            <span className="text-sm ml-1 text-gray-500">{mentor.courses?.length || 0} courses</span>
          </div>
          
          <div className="mt-auto pt-3">
            <Button 
              size="sm"
              variant="outline"
              onClick={() => navigate(`/mentor/${mentor._id}`)}
              className="w-full sm:w-auto"
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MentorCard; 