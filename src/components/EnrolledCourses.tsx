import React, { useState, useEffect } from 'react';
import { getEnrolledCourses } from '@/services/profileService';
import DashboardCard from './DashboardCard';

interface Course {
  id: string;
  title: string;
  duration: string;
  progress: number;
  image: string;
  status: string;
}

const EnrolledCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await getEnrolledCourses();
        setCourses(coursesData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
        setError('Failed to fetch enrolled courses. Using demo data.');
        setCourses([]); // Explicitly set empty to use demo data
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Demo courses data in case the API is not yet available
  const demoCourses = [
    { id: '1', image: '/src/Assets/icons/course1.svg', title: 'AWS Solutions Architect', progress: 50, duration: '1 Month', status: '50%' },
    { id: '2', image: '/src/Assets/icons/course2.svg', title: 'Azure Fundamentals', progress: 100, duration: '1 Month', status: 'Completed' },
    { id: '3', image: '/src/Assets/icons/course3.svg', title: 'Google Cloud Basics', progress: 75, duration: '1 Month', status: '75%' },
    { id: '4', image: '/src/Assets/icons/course4.svg', title: 'Google Cloud Advanced', progress: 75, duration: '1 Month', status: '75%' },
    { id: '5', image: '/src/Assets/icons/course5.svg', title: 'DevOps Essentials', progress: 75, duration: '1 Month', status: '75%' },
    { id: '6', image: '/src/Assets/icons/course6.svg', title: 'Kubernetes Basics', progress: 75, duration: '1 Month', status: '75%' },
  ];

  const coursesToDisplay = courses.length > 0 ? courses : demoCourses;

  return (
    <div className="w-full px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Courses</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="text-gray-500">Loading courses...</span>
        </div>
      ) : error ? (
        <div>
          <div className="text-amber-500 text-center mb-4">{error}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoCourses.map((course) => (
              <DashboardCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      ) : coursesToDisplay.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Courses Found</h3>
          <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesToDisplay.map((course) => (
            <DashboardCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses; 