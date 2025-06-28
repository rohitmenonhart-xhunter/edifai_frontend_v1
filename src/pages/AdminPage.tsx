import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkIsAdmin } from '@/utils/roleUtils';
import { useUser } from '@clerk/clerk-react';
import { BookOpen, Users, FileQuestion, BarChart } from 'lucide-react';
import Navbar from '@/components/Navbar';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const adminStatus = await checkIsAdmin();
        setIsAdmin(adminStatus);
        if (!adminStatus) {
          toast.error('You do not have permission to access this page');
          navigate('/');
        }
        setLoading(false);
      }
    };
    
    checkAdmin();
  }, [user, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8A63FF]"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your courses, quizzes, and users</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="p-3 rounded-full bg-purple-100 mb-4">
                <BookOpen className="h-6 w-6 text-[#8A63FF]" />
              </div>
              <CardTitle className="mb-2 text-center">Courses</CardTitle>
              <p className="text-sm text-gray-500 text-center mb-4">Manage all your courses</p>
              <Button 
                className="w-full bg-[#8A63FF] hover:bg-[#7A53EF]"
                onClick={() => navigate('/admin/courses')}
              >
                Manage Courses
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="p-3 rounded-full bg-blue-100 mb-4">
                <FileQuestion className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="mb-2 text-center">Quizzes</CardTitle>
              <p className="text-sm text-gray-500 text-center mb-4">Create and manage quizzes</p>
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => navigate('/admin/courses')}
              >
                View Courses
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="p-3 rounded-full bg-green-100 mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="mb-2 text-center">Users</CardTitle>
              <p className="text-sm text-gray-500 text-center mb-4">Manage system users</p>
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => navigate('/admin/users')}
              >
                Manage Users
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="p-3 rounded-full bg-orange-100 mb-4">
                <BarChart className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="mb-2 text-center">Analytics</CardTitle>
              <p className="text-sm text-gray-500 text-center mb-4">Course and user analytics</p>
              <Button 
                className="w-full"
                variant="outline"
                disabled
              >
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">No recent activities</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full flex justify-between items-center"
                variant="outline"
                onClick={() => navigate('/admin/courses')}
              >
                <span>View All Courses</span>
                <BookOpen className="h-4 w-4" />
              </Button>
              
              <Button 
                className="w-full flex justify-between items-center bg-[#8A63FF] hover:bg-[#7A53EF]"
                onClick={() => navigate('/admin/courses/new')}
              >
                <span>Create New Course</span>
                <BookOpen className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 