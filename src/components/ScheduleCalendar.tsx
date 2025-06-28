import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { getUserSchedule } from '@/services/profileService';
import { format } from 'date-fns';

interface ScheduleCalendarProps {
  onDateSelect?: (date: Date) => void;
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ onDateSelect }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const scheduleData = await getUserSchedule();
        setEvents(scheduleData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching schedule events:', err);
        setError('Failed to fetch schedule events');
        setEvents([]); // Use demo events through parent component
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Function to check if a date has events
  const hasEvents = (day: Date) => {
    // If no actual events, mark demo days for visual feedback
    if (events.length === 0) {
      // Mark the current date and a few surrounding dates as having events
      const today = new Date();
      const diff = Math.abs(day.getTime() - today.getTime());
      const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return diffDays < 5; // Mark days within 5 days of today
    }

    return events.some(event => {
      if (!event.dueDate) return false;

      try {
        const [dayStr, monthStr, yearStr] = event.dueDate.split('/');
        const eventDate = new Date(
          parseInt(yearStr),
          parseInt(monthStr) - 1,
          parseInt(dayStr)
        );
        return (
          eventDate.getDate() === day.getDate() &&
          eventDate.getMonth() === day.getMonth() &&
          eventDate.getFullYear() === day.getFullYear()
        );
      } catch (e) {
        console.error('Error parsing event date:', e);
        return false;
      }
    });
  };

  // Custom day render to highlight days with events
  const renderDay = (day: Date) => {
    const hasEventOnDay = hasEvents(day);
    return (
      <div 
        className={`relative w-full h-full flex items-center justify-center ${
          hasEventOnDay ? 'border border-purple-600 rounded-full text-purple-600' : ''
        }`}
      >
        {format(day, 'd')}
        {hasEventOnDay && (
          <div className="absolute bottom-0 w-1 h-1 bg-purple-600 rounded-full"></div>
        )}
      </div>
    );
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate && onDateSelect) {
      onDateSelect(newDate);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-purple-700">
          Schedule
        </h2>
      </div>
      <p className="text-xs text-gray-500 mb-3">
        {date ? format(date, 'MMMM, yyyy') : ''}
      </p>
      
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <span className="text-gray-500">Loading calendar...</span>
        </div>
      ) : (
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          className="border-none"
          components={{
            DayContent: (props) => renderDay(props.date)
          }}
        />
      )}
      
      {error && (
        <p className="text-xs text-amber-500 mt-2 text-center">
          Using demo data. {error}
        </p>
      )}
    </div>
  );
};

export default ScheduleCalendar; 