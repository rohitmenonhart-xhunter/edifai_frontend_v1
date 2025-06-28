import React, { useState } from "react";
import { LuArrowRightToLine } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";
import ScheduleMonth from "./ScheduleMonth";
import ScheduleWeek from "./ScheduleWeek";
import ScheduleDaily from "./ScheduleDaily";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const ScheduleOverview = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("year"); // 'year', 'month', 'week', 'daily'
  const currentYear = currentDate.getFullYear();


  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const activityItems = [
    {
      title: "Former Survey",
      dueDate: "20/12/2023",
      time: "08:00",
      description:
        "Lorem Ipsum has been the industry's standard andard dummystandard dummy",
      color: "bg-blue-100 border-l-blue-400",
    },
    {
      title: "Former Survey",
      dueDate: "20/12/2023",
      time: "11:00",
      description:
        "Lorem Ipsum has been the industry's standard andard dummystandard dummy",
      color: "bg-orange-100 border-l-orange-400",
    },
    {
      title: "Former Survey",
      dueDate: "20/12/2023",
      time: "14:00",
      description:
        "Lorem Ipsum has been the industry's standard andard dummystandard dummy",
      color: "bg-purple-100 border-l-purple-400",
    },
    {
      title: "Former Survey",
      dueDate: "29/12/2023",
      time: "17:00",
      description:
        "Lorem Ipsum has been the industry's standard andard dummystandard dummy",
      color: "bg-green-100 border-l-green-400",
    },
    {
      title: "Former Survey",
      dueDate: "28/12/2023",
      time: "19:00",
      description:
        "Lorem Ipsum has been the industry's standard andard dummystandard dummy",
      color: "bg-red-100 border-l-red-400",
    },
  ];

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getStartDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday

  const renderYearMonth = (monthIndex) => {
    const monthName = months[monthIndex];
    const daysInMonth = getDaysInMonth(currentYear, monthIndex);
    const startDayOffset =
      (getStartDayOfMonth(currentYear, monthIndex) + 6) % 7; // Adjust to make Monday the first day (0-indexed)

    const today = new Date();
    const days = [];

    for (let i = 0; i < startDayOffset; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        month: monthIndex,
        year: currentYear,
        isCurrentMonth: true,
      });
    }

    const remainingCells = 42 - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(null);
    }

    const getDayClass = (dayObj) => {
      let classes = "p-1 text-center text-[10px]";
      if (dayObj) {
        const fullDate = new Date(dayObj.year, dayObj.month, dayObj.date);
        if (
          fullDate.getDate() === today.getDate() &&
          fullDate.getMonth() === today.getMonth() &&
          fullDate.getFullYear() === today.getFullYear()
        ) {
          classes += " bg-blue-600 text-white rounded-full";
        }
        const hasActivity = activityItems.some((item) => {
          const [dayStr, monthStr, yearStr] = item.dueDate.split("/");
          const itemDate = new Date(
            parseInt(yearStr),
            parseInt(monthStr) - 1,
            parseInt(dayStr)
          );
          return (
            itemDate.getDate() === dayObj.date &&
            itemDate.getMonth() === dayObj.month &&
            itemDate.getFullYear() === dayObj.year
          );
        });
        if (hasActivity) {
          classes += " border border-purple-600 text-purple-600 rounded-full";
        }
      }
      return classes;
    };

    return (
      <div className="bg-white lg:h-[98%] lg:text-[2px] rounded-lg xl:p-2 shadow-sm w-full h-full ">
        <h3
          className="text-sm font-bold lg:p-1 font-semibold mb-1 text-center text-black-700 "
          style={{
            fontFamily: "Euclid-medium",
           }}
        >
          {monthName}
        </h3>
        <div className="grid grid-cols-7 text-center text-[10px] text-gray-500 mb-1 font-bold">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div key={i} className="xl:text-[9px] 2xl:text-xs 3xl:text-sm">{day}</div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between   text-center text-[10px]  lg:text-[8px] xl:text-[10px] 2xl:text-xs 3xl:text-sm text-black 3xl:h-[200px]">
          {days.map((dayObj, index) => (
            <div key={`${monthName}-${index}`}  className={`lg:h-4 lg:w-4 2xl:h-7 xl:h-6 xl:w-6 2xl:w-7 3xl:h-8 3xl:w-8 ${getDayClass(dayObj)}`}>
              {dayObj ? dayObj.date : ""}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handlePrev = () => {
    setCurrentDate((prevDate) => {
      if (currentView === "year") {
        return new Date(
          prevDate.getFullYear() - 1,
          prevDate.getMonth(),
          prevDate.getDate()
        );
      } else if (currentView === "month") {
        return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      } else if (currentView === "week") {
        return new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          prevDate.getDate() - 7
        );
      } else if (currentView === "daily") {
        return new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          prevDate.getDate() - 1
        );
      }
      return prevDate;
    });
  };

  const handleNext = () => {
    setCurrentDate((prevDate) => {
      if (currentView === "year") {
        return new Date(
          prevDate.getFullYear() + 1,
          prevDate.getMonth(),
          prevDate.getDate()
        );
      } else if (currentView === "month") {
        return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      } else if (currentView === "week") {
        return new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          prevDate.getDate() + 7
        );
      } else if (currentView === "daily") {
        return new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          prevDate.getDate() + 1
        );
      }
      return prevDate;
    });
  };

  const handleViewChange = (event) => {
    setCurrentView(event.target.value);
  };

  // Function to cycle through views when the icon is clicked
  const handleIconClick = () => {
    const views = ["year", "month", "week", "daily"];
    const currentIndex = views.indexOf(currentView);
    const nextIndex = (currentIndex + 1) % views.length; // Cycle through views
    setCurrentView(views[nextIndex]);
  };

  const currentMonthName = months[currentDate.getMonth()];

  return (
    <div
      className=" bg-gray-100 min-h-screen flex space-x-4 w-full pt-9 overflow-x-auto x ;"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex-grow bg-white xl:h-[800px] lg:h-[640px] 3xl:h-[100%]  rounded-lg shadow-sm p-4   ">
        <div className="flex justify-between items-center mb-4 ">
          <div className="flex items-center gap-x-4">
            <button
              className="px-4  py-2 bg-blue-600 text-white rounded-md font-medium text-sm "
              onClick={handleTodayClick}
              style={{
                fontFamily: "Euclid-medium",
              }}
            >
              Today
            </button>

            <button
              className="text-gray-500  hover:text-gray-800 text-2xl opacity-70 transition-transform "
              onClick={handlePrev}
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              className="text-gray-500  hover:text-gray-800 text-2xl opacity-70 transition-transform "
              onClick={handleNext}
            >
              <MdKeyboardArrowRight />
            </button>

            <span className="text-md font-semibold">
              {currentView === "year" && currentYear}
              {currentView === "month" &&
                `${months[currentDate.getMonth()]} ${currentYear}`}
              {currentView === "week" &&
                `Week of ${currentDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}`}
              {currentView === "daily" &&
                currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </span>
          </div>
          <div className="flex items-center space-x-4 ">
            <select
              className="flex items-center gap-1 px-3 py-2 border border-[#B0BEDC] rounded-md text-[#6C7A96] text-sm font-medium bg-white hover:bg-gray-100"
              value={currentView}
              onChange={handleViewChange}
            >
              <option value="year">Year</option>
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="daily">Daily</option>
            </select>
            <button className="flex items-center gap-1 px-3 py-2 border border-[#B0BEDC] rounded-md text-[#6C7A96] text-sm font-medium bg-white hover:bg-gray-100">
              <CiFilter size={18} strokeWidth={1} />
              <span>Filter</span>
            </button>

            <button
              className="text-[#6C7A96]  text-lg"
              onClick={handleIconClick}
            >
              <LuArrowRightToLine size={24} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 lg:p-1  3xl:h-[90%]  ">
          {currentView === "year" &&
            Array.from({ length: 12 }, (_, i) => renderYearMonth(i))}
          {currentView === "month" && (
            <ScheduleMonth
              currentDate={currentDate}
              activityItems={activityItems}
            />
          )}
          {currentView === "week" && (
            <ScheduleWeek
              currentDate={currentDate}
              activityItems={activityItems}
            />
          )}
          {currentView === "daily" && (
            <ScheduleDaily
              currentDate={currentDate}
              activityItems={activityItems}
            />
          )}
        </div>
      </div>

      {/* Hide sidebar when in daily view */}
      {currentView !== "daily" && (
        <div
          className="lg:w-48 xl:w-72 flex-shrink-0 space-y-4 sticky top-0  overflow-x-auto  "
          style={{ scrollbarWidth: "none" }}
        >
          <div className="bg-white rounded-lg shadow-sm p-4 ">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800 text-purple-700">
                Schedule
              </h2>
              <select className="px-2 py-1 rounded-md border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Monthly</option>
              </select>
            </div>
            <p className="text-xs text-gray-500 mb-3  ">
              {currentMonthName}, {currentYear}
            </p>
            <div
              className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-1 text-purple-700 "
              style={{
                fontFamily: "Euclid-medium",
              }}
            >
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
              <div>Su</div>
            </div>
            <div className="grid grid-cols-7 text-center text-xs">
              {[
                ...Array(
                  getDaysInMonth(currentYear, currentDate.getMonth())
                ).keys(),
              ].map((day) => (
                <div
                  key={`small-cal-${day + 1}`}
                  className={`p-1 rounded-full ${
                    day + 1 === currentDate.getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear()
                      ? "bg-purple-600 text-white"
                      : ""
                  } ${
                    activityItems.some((item) => {
                      const [dayStr, monthStr, yearStr] =
                        item.dueDate.split("/");
                      const itemDate = new Date(
                        parseInt(yearStr),
                        parseInt(monthStr) - 1,
                        parseInt(dayStr)
                      );
                      return (
                        itemDate.getDate() === day + 1 &&
                        itemDate.getMonth() === currentDate.getMonth() &&
                        itemDate.getFullYear() === currentDate.getFullYear()
                      );
                    })
                      ? "border border-purple-600 text-purple-600"
                      : ""
                  }`}
                >
                  {day + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 3xl:h-[100%]">
            <div className="flex justify-between items-center mb-3">
              <h2
                className="text-lg font-semibold text-gray-800"
                style={{
                  fontFamily: "Euclid-medium",
                }}
              >
                Today's Activity
              </h2>
              <span className="text-gray-500 text-xs">(20)</span>
            </div>
            <div className="space-y-3">
              {activityItems.map((activity, index) => (
                <div
                  key={index}
                  className={`border-l-4 ${activity.color} p-3 rounded-r-md `}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-sm text-gray-800">
                      {activity.title}
                    </h3>
                    <span className="text-xs text-gray-600">
                      Due date: {activity.dueDate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleOverview;