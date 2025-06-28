import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseStructureBuilder from "@/components/admin/CourseStructureBuilder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Navbar from '@/components/Navbar';
import courseStructureService, { CourseStructure } from "@/services/courseStructureService";
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { checkIsAdmin } from '@/utils/roleUtils';
import { useUser } from '@clerk/clerk-react';

const CourseStructurePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [courseStructure, setCourseStructure] = useState<CourseStructure | null>(null);
  
  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const adminStatus = await checkIsAdmin();
        setIsAdmin(adminStatus);
        if (!adminStatus) {
          toast.error('You do not have permission to access this page');
          navigate('/');
        } else {
          loadCourseStructure();
        }
      }
    };
    
    checkAdmin();
  }, [user, courseId, navigate]);
  
  const loadCourseStructure = async () => {
    if (!courseId) return;
    
    try {
      setLoading(true);
      const structure = await courseStructureService.getCourseStructure(courseId);
      setCourseStructure(structure);
    } catch (error) {
      console.error('Error loading course structure:', error);
      toast.error('Failed to load course structure');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveStructure = async (structure: CourseStructure) => {
    if (!courseId) return;
    
    try {
      await courseStructureService.saveCourseStructure(courseId, structure);
      toast.success('Course structure saved successfully');
    } catch (error) {
      console.error('Error saving course structure:', error);
      toast.error('Failed to save course structure');
    }
  };
  
  const navigateBack = () => {
    navigate(`/admin/courses/${courseId}`);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <Spinner className="h-8 w-8" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center"
          onClick={navigateBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Course Structure Builder</CardTitle>
            <CardDescription>
              Create and manage the hierarchical structure of your course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Build your course by adding chapters, subchapters, and sections. The structure will be used for AI-powered content generation.
            </p>
            
            <CourseStructureBuilder 
              courseId={courseId} 
              onSave={handleSaveStructure}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseStructurePage; 