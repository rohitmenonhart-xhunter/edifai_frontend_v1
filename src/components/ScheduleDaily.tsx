import React from "react";

interface ActivityItem {
  title: string;
  dueDate: string;
  time: string;
  description: string;
  color: string;
}

interface ScheduleDailyProps {
  currentDate: Date;
  activityItems: ActivityItem[];
}

const ScheduleDaily: React.FC<ScheduleDailyProps> = ({
  currentDate,
  activityItems,
}) => {
  // Times from 3 PM to 8 PM
  const timeSlots = ["3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"];

  // Filter today's activities
  const activitiesForDay = activityItems.filter((item) => {
    const [dayStr, monthStr, yearStr] = item.dueDate.split("/");
    const itemDate = new Date(
      parseInt(yearStr),
      parseInt(monthStr) - 1,
      parseInt(dayStr)
    );
    return (
      itemDate.getDate() === currentDate.getDate() &&
      itemDate.getMonth() === currentDate.getMonth() &&
      itemDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const startHour = 15; // 3 PM
  const endHour = 20; // 8 PM
  const totalHours = endHour - startHour;

  return (
    <div
      className="w-[1060px] flex-1 bg-white p-2 overflow-auto"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Header---------- */}
      <div className="flex items-center justify-between  ml-14 border border-b-0   ">
        <div>
          <div className="pl-4">
            <p className=" text-4xl font-semibold text-black ">
              {currentDate.toLocaleDateString("en-US", { day: "numeric" })}
            </p>
            <h2 className="text-ms font-semibold text-black">
              {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
            </h2>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="relative rounded-lg h-[600px] ">
        {/* Time Labels */}
        <div className="absolute left-0 w-14 text-right pr-2 z-10  ">
          {timeSlots.map((time, i) => (
            <div
              key={i}
              className="h-[100px] text-xs text-black font-semibold flex items-start justify-end pt-1 mb-4"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Grid Lines */}
        <div className="ml-14 h-full relative border-l border-gray-200 border-r ">
          {timeSlots.map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border border-gray-200 border-b-0 "
              style={{ top: `${(i / totalHours) * 100}%` }}
            ></div>
          ))}

          {/* Events */}
          {activitiesForDay.map((activity, index) => {
            const [startTime, endTime] = activity.time.split("-");
            const [startHourNum, startMin] = startTime.split(":").map(Number);
            const [endHourNum, endMin] = endTime.split(":").map(Number);

            const startOffset = startHourNum + startMin / 60 - startHour;
            const endOffset = endHourNum + endMin / 60 - startHour;

            const top = (startOffset / totalHours) * 100;
            const height = ((endOffset - startOffset) / totalHours) * 100;

            return (
              <div
                key={index}
                className={`${activity.color} absolute left-16 right-4 rounded-lg p-2 text-xs text-gray-700 border-l-4 border-blue-500 shadow`}
                style={{
                  top: `${top}%`,
                  height: `${height}%`,
                }}
              >
                <p className="font-semibold">{activity.title}</p>
                <p className="text-gray-600 text-[10px]">{activity.time}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDaily;
