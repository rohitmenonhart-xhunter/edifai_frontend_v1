import React, { memo, useMemo } from 'react';

// Schedule data type
interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  duration: string;
}

const RightSideBarComp: React.FC = memo(() => {
  // Memoize schedule data to prevent recreating on each render
  const schedule = useMemo<ScheduleItem[]>(() => [
    {
      time: "10 AM",
      title: "Meeting",
      description: "Introduction class",
      duration: "10 AM - 11 AM",
    },
    { time: "11 PM", title: "", description: "", duration: "" },
    {
      time: "12 PM",
      title: "Module 4",
      description: "AWS Basics",
      duration: "12 PM - 01 PM",
    },
    { time: "01 PM", title: "", description: "", duration: "" },
    { time: "02 PM", title: "", description: "", duration: "" },
    {
      time: "03 PM",
      title: "Module 4",
      description: "AWS Basics",
      duration: "03 PM - 04 PM",
    },
    { time: "04 PM", title: "", description: "", duration: "" },
  ], []);

  // Memoize day buttons to prevent recreating on each render
  const weekDays = useMemo(() => ["S", "M", "T", "W", "T", "F", "SA"], []);

  return (
    <div className="lg:h-[80vh] lg:w-[230px] xl:h-[80vh] xl:w-[260px] 2xl:h-[80vh] 2xl:w-[330px] 3xl:w-[380px] 3xl:h-[80vh]">
      {/* fixed  top-32  right-8 */}
      {/* Today's Schedule */}
      <div
        className="overflow-y-auto  bg-white p-6 rounded-[16px] shadow-md col-span-1 lg:h-[80vh] xl:h-[80vh] 2xl:h-[80vh] 3xl:h-[80vh] "
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex justify-between items-center mb-4 w-full ">
          <h2 className="text-xl font-bold text-[#8A63FF] lg:text-[12px] xl:text-[12px] 2xl:text-base 3xl:text-xl">
            Today's Schedule
          </h2>
          <select 
            className="text-[#8A63FF] border border-[#8A63FF] rounded-md px-1 py-1 lg:w-[57px] lg:h-[18px] xl:w-[67px] xl:h-[22px] 2xl:w-[77px] 2xl:h-[27px] lg:text-[7px] xl:text-[9px] 2xl:text-[11px] 3xl:text-[12px]"
            aria-label="View schedule by"
          >
            <option>Weekly</option>
          </select>
        </div>
        <p className="text-gray-500 text-sm mb-4 lg:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[14px]">
          14 - May - 2025
        </p>
        <div className="flex space-x-1 mb-6 bg-[#F3F3F3] font-mont 2xl:w-full p-2 rounded-md"> 
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`lg:w-4 lg:h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 flex items-center lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px] p-5  justify-center rounded-sm ${
                day === "S" ? "bg-[#8A63FF] text-white" : "text-black"
              }`}   
            >
              {day}
            </div>
          ))}
        </div>
        <div className="space-y-1  ">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex items-start py-2 lg:h-[50px] xl:h-[60px] 2xl:h-[70px] 3xl:h-[80px]  "
            > 
              <div className="w-[15%] ">
                <p className="text-black text-sm w-16 flex-shrink-0 lg:text-[9px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[14px]  ">
                  {item.time}
                </p>
              </div>
              <div className="border-t border-gray-400 ml-4 py-1  mt-2 lg:h-[54px] xl:h-[63px] 2xl:h-[73px] 3xl:h-[83px]  w-[85%]   ">
                <div
                className={`${
                  item.description ? "border  border-[#8A63FF]" : ""
                } rounded-[20px] lg:h-full lg:w-[140px] xl:h-full xl:w-[180px] 2xl:h-full 2xl:w-[200px] 3xl:h-full 3xl:w-[223px] xl:py-2 px-4 3xl:ml-6`}
              >
                <h3 className="font-semibold text-black  lg:text-[7px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[11px]">
                  {item.title}
                </h3>
                <p className="text-black text-sm lg:text-[9px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[14px] w-fit">
                  {item.description}{" "}
                </p>
                <p className="text-gray-500 text-xs lg:text-[7px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[11px]">
                  {item.duration}
                </p>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

RightSideBarComp.displayName = 'RightSideBarComp';

export default RightSideBarComp;
