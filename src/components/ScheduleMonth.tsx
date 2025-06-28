import React from 'react';

interface ActivityItem {
  title: string;
  dueDate: string; // Start date of the event (DD/MM/YYYY)
  endDate?: string; // Optional end date for multi-day events (DD/MM/YYYY)
  time: string;
  description: string;
  color: string; // e.g., 'bg-blue-500' for the event bar
}

interface DayObj {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
}

interface ScheduleMonthProps {
  currentDate: Date;
  activityItems: ActivityItem[];
}

const months = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'
];

const daysOfWeek = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday'
];

const ScheduleMonth: React.FC<ScheduleMonthProps> = ({ currentDate, activityItems }) => {
  const getDaysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate();
  const getStartDayOfMonth = (year: number, month: number): number => new Date(year, month, 1).getDay();

  const renderMonth = (monthIndex: number): JSX.Element => {
    const monthName = months[monthIndex];
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(year, monthIndex);
    // Start day with Sunday as the first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const startDay = getStartDayOfMonth(year, monthIndex);
    const startDayOffset = startDay; // No adjustment needed since Sunday is the first day

    const today = new Date();
    const days: DayObj[] = [];

    // Calculate previous month's days to fill the empty cells at the start
    const prevMonth = monthIndex === 0 ? 11 : monthIndex - 1;
    const prevMonthYear = monthIndex === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
    const prevMonthStartDate = daysInPrevMonth - startDayOffset + 1;

    // Add days from the previous month
    for (let i = 0; i < startDayOffset; i++) {
      const date = prevMonthStartDate + i;
      days.push({
        date,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false,
      });
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        month: monthIndex,
        year,
        isCurrentMonth: true,
      });
    }

    // Calculate next month's days to fill the remaining cells
    const nextMonth = monthIndex === 11 ? 0 : monthIndex + 1;
    const nextMonthYear = monthIndex === 11 ? year + 1 : year;
    const remainingCells = 42 - days.length;

    // Add days from the next month
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: i,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false,
      });
    }

    const getDayClass = (dayObj: DayObj): string => {
      let classes = 'p-2 text-sm h-24 w-full flex flex-col justify-start items-start relative'; // Adjusted padding, height, and alignment
      const fullDate = new Date(dayObj.year, dayObj.month, dayObj.date);

      // Highlight today with a blue background
      if (
        fullDate.getDate() === today.getDate() &&
        fullDate.getMonth() === today.getMonth() &&
        fullDate.getFullYear() === today.getFullYear()
      ) {
        classes += ' bg-blue-100';
      }

      // Gray out days that are not in the current month
      if (!dayObj.isCurrentMonth) {
        classes += ' text-gray-400';
      }

      return classes;
    };

    const getActivityMarkers = (dayObj: DayObj): JSX.Element[] => {
      const activitiesOnDay = activityItems.filter(item => {
        const [startDayStr, startMonthStr, startYearStr] = item.dueDate.split('/');
        const startDate = new Date(parseInt(startYearStr), parseInt(startMonthStr) - 1, parseInt(startDayStr));

        // If the event spans multiple days, check if this day falls within the range
        let endDate = startDate;
        if (item.endDate) {
          const [endDayStr, endMonthStr, endYearStr] = item.endDate.split('/');
          endDate = new Date(parseInt(endYearStr), parseInt(endMonthStr) - 1, parseInt(endDayStr));
        }

        const currentDate = new Date(dayObj.year, dayObj.month, dayObj.date);
        return currentDate >= startDate && currentDate <= endDate;
      });

      return activitiesOnDay.map((activity, index) => {
        const dotColor = activity.color || 'bg-gray-400'; // Use the color directly (e.g., 'bg-blue-500')
        return (
          <div
            key={`activity-bar-${dayObj.date}-${index}`}
            className={`${dotColor} w-full h-6 mt-1 rounded text-xs text-white flex items-center px-1`}
          >
            {activity.title}
          </div>
        );
      });
    };

    const getDisplayText = (dayObj: DayObj): string => {
      const paddedDate = dayObj.date < 10 ? `0${dayObj.date}` : dayObj.date;
      if (dayObj.isCurrentMonth) {
        return paddedDate.toString();
      } else {
        return `${months[dayObj.month]} ${paddedDate}`;
      }
    };

    return (
      <div className="bg-white rounded-lg shadow col-span-4">
        {/* Days of the week header */}
        <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500">
          {daysOfWeek.map((day, i) => (
            <div key={`day-header-${i}`} className="p-2 border border-gray-300">
              {day}
            </div>
          ))}
        </div>
        {/* Days grid */}
        <div className="grid grid-cols-7 text-sm">
          {days.map((dayObj, index) => (
            <div
              key={`${monthName}-${dayObj.date}-${dayObj.month}-${dayObj.year}`}
              className={`border border-gray-300 ${getDayClass(dayObj)}`}
            >
              <span>{getDisplayText(dayObj)}</span>
              {/* Activity markers (bars) */}
              <div className="mt-2 w-full">
                {getActivityMarkers(dayObj)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return renderMonth(currentDate.getMonth());
};

export default ScheduleMonth;