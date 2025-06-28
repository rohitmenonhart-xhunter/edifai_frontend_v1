import React, { useState, useEffect } from 'react';
import { getUserSchedule } from '@/services/profileService';
import ScheduleCalendar from './ScheduleCalendar';
import { format } from 'date-fns';
import { ScheduleEvent } from '@/services/profileService';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

const ProfileSchedule: React.FC = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const scheduleData = await getUserSchedule();
        setEvents(scheduleData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching schedule events:', err);
        setError('Failed to fetch schedule events. Using demo data.');
        setEvents([]); // Explicitly set empty to use demo data
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Filter events for the selected date
  const filteredEvents = events.filter(event => {
    if (!event.dueDate) return false;
    
    try {
      const [dayStr, monthStr, yearStr] = event.dueDate.split('/');
      const eventDate = new Date(
        parseInt(yearStr),
        parseInt(monthStr) - 1,
        parseInt(dayStr)
      );
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      );
    } catch (e) {
      console.error('Error parsing event date:', e);
      return false;
    }
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Mock event colors for demo
  const eventColors = [
    'bg-blue-100 border-l-blue-400',
    'bg-orange-100 border-l-orange-400',
    'bg-purple-100 border-l-purple-400',
    'bg-green-100 border-l-green-400',
    'bg-red-100 border-l-red-400'
  ];

  // For demo purposes - these would come from the backend
  const demoEvents = [
    {
      _id: '1',
      title: 'AWS Solutions Architect Session',
      dueDate: format(selectedDate, 'dd/MM/yyyy'),
      time: '08:00',
      description: 'Learning module about cloud architecture and solutions design patterns',
      color: eventColors[0],
      userId: 'user123'
    },
    {
      _id: '2',
      title: 'Azure Fundamentals Quiz',
      dueDate: format(selectedDate, 'dd/MM/yyyy'),
      time: '11:00',
      description: 'Complete the module quiz to test your knowledge of Azure services',
      color: eventColors[1],
      userId: 'user123'
    },
    {
      _id: '3',
      title: 'Google Cloud Study Group',
      dueDate: format(selectedDate, 'dd/MM/yyyy'),
      time: '14:00',
      description: 'Join the virtual study group to discuss cloud deployment strategies',
      color: eventColors[2],
      userId: 'user123'
    }
  ];

  const eventsToDisplay = events.length > 0 ? filteredEvents : demoEvents;

  return (
    <div className="h-full flex">
      <div className="h-full w-full px-6 py-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Schedule</h1>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" /> Add Event
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Calendar Section */}
          <div className="lg:w-1/3">
            <ScheduleCalendar onDateSelect={handleDateSelect} />
          </div>
          
          {/* Events List Section */}
          <div className="lg:w-2/3 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Events for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <span className="text-gray-500">Loading events...</span>
              </div>
            ) : error ? (
              <div>
                <div className="text-amber-500 text-center mb-4">{error}</div>
                <div className="space-y-4">
                  {demoEvents.map((event, index) => (
                    <div 
                      key={event._id || index} 
                      className={`border-l-4 ${event.color} p-4 rounded-r-md`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-lg text-gray-800">
                          {event.title}
                        </h3>
                        <span className="text-sm font-semibold text-gray-600">
                          {event.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : eventsToDisplay.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No events scheduled for this day
              </div>
            ) : (
              <div className="space-y-4">
                {eventsToDisplay.map((event, index) => (
                  <div 
                    key={event._id || index} 
                    className={`border-l-4 ${event.color || eventColors[index % eventColors.length]} p-4 rounded-r-md`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-lg text-gray-800">
                        {event.title}
                      </h3>
                      <span className="text-sm font-semibold text-gray-600">
                        {event.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSchedule; 