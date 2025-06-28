import React from 'react';

interface ActivityItem {
  title: string;
  dueDate: string;
  time: string;
  description: string;
  color: string;
}

interface ScheduleWeekProps {
  currentDate: Date;
  activityItems: ActivityItem[];
}

const ScheduleWeek: React.FC<ScheduleWeekProps> = ({ currentDate, activityItems }) => {
  // Define the start date as November 7, 2023 (Tuesday)
  const startOfWeek = new Date(2023, 10, 7); // Month is 0-indexed, so 10 is November

  // Generate an array of 7 days starting from November 7, 2023
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  // Time slots from 8 AM to 7 PM
  const timeSlots = [
    '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'
  ];

  // Function to get the position and span of an activity
  const getActivityPosition = (activity: ActivityItem) => {
    const [dayStr, monthStr, yearStr] = activity.dueDate.split('/');
    const itemDate = new Date(parseInt(yearStr), parseInt(monthStr) - 1, parseInt(dayStr));
    const [hour, minute] = activity.time.split(':').map(Number);

    // Calculate the day index (0 for Monday, 6 for Sunday)
    const dayIndex = (itemDate.getDay() + 6) % 7;

    // Calculate the top position based on time (8 AM to 7 PM range)
    const startHour = 8; // 8 AM
    const endHour = 19; // 7 PM
    const totalHours = endHour - startHour;
    const hourPosition = hour - startHour + minute / 60;
    const topPosition = (hourPosition / totalHours) * 100; // Percentage

    // For simplicity, assume each activity spans 1 hour
    const height = (1 / totalHours) * 100; // 1 hour height as a percentage

    return { dayIndex, topPosition, height };
  };

  return (
    <div className='flex col-span-7 gap-5 '>
        <div className=" flex flex-col text-right pr-0 "  >
            <div className='mt-5'>
                Time
                </div>
          {timeSlots.map((time, i) => (
            <div
              key={`time-label-${i}`}
              className="text-[10px] text-gray-500 h-12  flex items-center justify-end "
            >
              {time}
            </div>

          ))}
        </div>

        <div className="bg-white rounded-lg  shadow-sm col-span-3 w-full      ">
      {/* Days of the week header */}
      <div className="grid grid-cols-7 text-center font-bold text-gray-500 mb-0 pb-0">
        {/* <div className="col-span-1"></div> */}
        {weekDays.map((day, i) => (
          <div key={`week-day-header-${i}`} className="p-1  pr-10 border border-b-0 border-gray-200">
            <div className="text-xl  text-gray-900">
              {day.toLocaleDateString('en-US', { day: 'numeric' })}
            </div>
            <div className="text-xs font-semibold text-gray-900 uppercase">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
          </div>
        ))}
      </div>
      {/* Time slots and days grid */}
      <div className="grid grid-cols-7 text-center text-sm relative">
        {/* Time labels on the left */}
        {/* Days grid */}
        {weekDays.map((day, dayIndex) => (
          <div
            key={`week-day-${dayIndex}`}
            className="relative h-[700px] w-full border border-gray-200"
          >
            {/* Background grid lines for hours */}
            {timeSlots.map((_, hourIndex) => (
              <div
                key={`hour-line-${hourIndex}`}
                className="absolute w-full border-b border-gray-200"
                style={{ top: `${(hourIndex / (timeSlots.length - 1)) * 100}%` }}
              ></div>
            ))}
            {/* Activities for this day */}
            {activityItems
              .filter(item => {
                const [itemDay, itemMonth, itemYear] = item.dueDate.split('/').map(Number);
                const itemDate = new Date(itemYear, itemMonth - 1, itemDay);
                return itemDate.toDateString() === day.toDateString();
              })
              .map((activity, index) => {
                const { topPosition, height } = getActivityPosition(activity);
                // Extract the background color from activity.color (e.g., 'bg-blue-100')
                const bgColor = activity.color.split(' ').find(cls => cls.startsWith('bg-')) || 'bg-gray-100';
                return (
                  <div
                    key={`activity-${index}`}
                    className={`${bgColor} p-2 rounded-md text-xs absolute w-full border-l-4 border-blue-400`}
                    style={{
                      top: `${topPosition}%`,
                      height: `${height}%`,
                    }}
                  >
                    <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                    <p className="text-gray-600">Due: {activity.dueDate}</p>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ScheduleWeek;