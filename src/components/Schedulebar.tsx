import React from 'react';

type ScheduleItem = {
  id: number;
  time: string;
  title: string;
  subtitle: string;
  label: string;
};

const scheduleData: ScheduleItem[] = [
  {
    id: 1,
    time: '10 am - 11 am',
    title: 'Introduction class',
    subtitle: 'Meeting',
    label: '10 AM',
  },
  {
    id: 2,
    time: '10 am - 11 am',
    title: 'Fundamentals and basics',
    subtitle: 'Module 2',
    label: '12 PM',
  },
  {
    id: 3,
    time: '10 am - 11 am',
    title: 'AWS Basics',
    subtitle: 'Module 4',
    label: '03 PM',
  },
];

const SideSchedule = () => {
  const hours = ['10 AM', '11 AM', '12 PM', '01 PM', '02 PM', '03 PM', '04 PM'];

  return (
    <div className="w-full max-w-xs mx-auto bg-white p-4 rounded-lg shadow" style={{marginLeft:"74%",position:"relative",bottom:"330px"}}>
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-semibold text-violet-700">Today's Schedule</h2>
        <button className="text-sm border border-violet-200 px-2 py-1 rounded-md text-violet-600">
            <select>
                <option>Weekly</option>
                <option>Daily</option>
            </select>
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-4">05 - Jun - 2025</p>

      {/* Day Tabs */}
      <div className="flex justify-between items-center bg-gray-100 rounded-lg overflow-hidden mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <button
            key={i}
            className={`flex-1 py-2 text-sm font-medium ${
              i === 0 ? 'bg-violet-500 text-white' : 'text-gray-700'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="space-y-4">
        {hours.map((hour) => {
          const item = scheduleData.find((i) => i.label === hour);
          return (
            <div key={hour}>
              <p className="text-sm text-gray-600 font-semibold mb-1">{hour}</p>
              <div className="h-[1px] bg-gray-200 mb-1" />
              {item && (
                <div className="border border-violet-100 rounded-xl p-3 shadow-sm">
                  <p className="text-xs font-semibold text-gray-800">{item.subtitle}</p>
                  <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                  <p className="text-xs text-blue-500">{item.time}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideSchedule;
