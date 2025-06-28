// import React, { useState } from "react";
// import NavDashboardPage from "./AssesNav";
// import CoursePageLayout from "./ui/CoursePageLayout";
// import SideSchedule from "./Schedulebar";
// import LearningOverview from "./LearningOverview";
// import CourseDashboardPage from "./CompletedCourse";
// import OngoingCourseDashboardPage from "./OngoingCourse";
// import DashboardCard from "./DashboardCard";
// import sort from "../Assets/icons/sort.svg";

// type Course = {
//   id: string;
//   image: string;
//   title: string;
//   progress: number;
//   duration: string;
//   status: string;
// };

// interface childProps {
//   sendMessage: (course: Course) => void;
// }

// const CoursesOverview: React.FC<childProps> = ({ sendMessage }) => {
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState<"title" | "progress">("title");

//   const courses: Course[] = [
//     {
//       id: "1",
//       image: "https://via.placeholder.com/150",
//       title: "AWS Solutions Architect",
//       progress: 50,
//       duration: "1 Month",
//       status: "50%",
//     },
//     {
//       id: "2",
//       image: "https://via.placeholder.com/150",
//       title: "Azure Fundamentals",
//       progress: 100,
//       duration: "1 Month",
//       status: "Completed",
//     },
//     {
//       id: "3",
//       image: "https://via.placeholder.com/150",
//       title: "Google Cloud Basics",
//       progress: 75,
//       duration: "1 Month",
//       status: "75%",
//     },
//     {
//       id: "4",
//       image: "https://via.placeholder.com/150",
//       title: "Google Cloud Advanced",
//       progress: 75,
//       duration: "1 Month",
//       status: "75%",
//     },
//     {
//       id: "5",
//       image: "https://via.placeholder.com/150",
//       title: "DevOps Essentials",
//       progress: 75,
//       duration: "1 Month",
//       status: "75%",
//     },
//     {
//       id: "6",
//       image: "https://via.placeholder.com/150",
//       title: "Kubernetes Basics",
//       progress: 75,
//       duration: "1 Month",
//       status: "75%",
//     },
//   ];

//   // Filter and sort courses
//   const filteredCourses = courses
//     .filter((course) =>
//       course.title.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortBy === "progress") {
//         return b.progress - a.progress;
//       }
//       return a.title.localeCompare(b.title);
//     });

//   if (selectedCourse) {
//     if (selectedCourse.status === "Completed") {
//       return (
//         <CourseDashboardPage
//           course={selectedCourse}
//           onBack={() => setSelectedCourse(null)}
//         />
//       );
//     } else {
//       return (
//         <OngoingCourseDashboardPage
//           course={selectedCourse}
//           onBack={() => setSelectedCourse(null)}
//         />
//       );
//     }
//   }

//   const handleSelectedCourse = (course: Course) => {
//     setSelectedCourse(course);
//     sendMessage(course);
//   };

//   return (
//     <div className="h-full bg-gray-100 font-sans text-gray-800 w-full flex flex-col justify-between items-center">
//       <div className="w-full flex items-center justify-between mb-3 px-4">
//         <h1 className="text-2xl font-bold text-[#8A63FF]">
//           My Courses ({filteredCourses.length})
//         </h1>
//         <div className="flex items-center gap-4">
//          <div className="relative">
//            <input
//             type="text"
//             placeholder="Search courses..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className=" pl-10 pr-3 py-2 w-[550px] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 "
//           />
//           <svg
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//          </div>
//           <div className="relative">
//             <select
//               value={sortBy}
//               onChange={(e) =>
//                 setSortBy(e.target.value as "title" | "progress")
//               }
//               className="pl-8 pr-3 py-2 w-[100px] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//             >
//               <option value="title">Sort by</option>
//               <option value="progress">Sort by Progress</option>
//             </select>
//             <svg
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 4h13M3 8h9M3 12h6m4 0l3-3m0 0l3 3m-3-3v12"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-wrap justify-center">
//         {filteredCourses.map((course) => (
//           <div
//             key={course.id}
//             onClick={() => handleSelectedCourse(course)}
//             className="cursor-pointer w-[30%] m-2"
//           >
//             <DashboardCard course={course} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoursesOverview;



import React, { useState } from "react";
import NavDashboardPage from "./AssesNav";
import CoursePageLayout from "./ui/CoursePageLayout";
import SideSchedule from "./Schedulebar";
import LearningOverview from "./LearningOverview";
import CourseDashboardPage from "./CompletedCourse";
import OngoingCourseDashboardPage from "./OngoingCourse";
import DashboardCard from "./DashboardCard";
import course1 from '../Assets/icons/course1.svg'
import course2 from '../Assets/icons/course2.svg'
import course3 from '../Assets/icons/course3.svg'
import course4 from '../Assets/icons/course4.svg'
import course5 from '../Assets/icons/course5.svg'
import course6 from '../Assets/icons/course6.svg'

type Course = {
  id: string;
  image: string;
  title: string;
  progress: number;
  duration: string;
  status: string;
};

// income changes
// interface User {
//   name: string;
//   learningHours: number;
//   certificatesEarned: number;
//   coursesEnrolled: number;
//   progress: number;
// }

interface childProps {
  sendMessage: (course: Course) => void;
}

// Category data for All, Ongoing, and Completed
const categories = [
  { id: "all", label: "All" },
  { id: "ongoing", label: "Ongoing Courses" },
  { id: "completed", label: "Completed Courses" },
];

const CoursesOverview: React.FC<childProps> = ({ sendMessage }) => {

  // income changes
  //   const user: User = {
  //   name: 'Jack',
  //   learningHours: 22,
  //   certificatesEarned: 7,
  //   coursesEnrolled: 50,
  //   progress: 50,
  // };
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "progress">("title");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses: Course[] = [
    {
      id: "1",
      image: "https://via.placeholder.com/150",
      // image: course1,
      title: "AWS Solutions Architect",
      progress: 50,
      duration: "1 Month",
      status: "50%",
    },
    {
      id: "2",
      image: "https://via.placeholder.com/150",
      // image: course2,
      title: "Azure Fundamentals",
      progress: 100,
      duration: "1 Month",
      status: "Completed",
    },
    {
      id: "3",
      image: "https://via.placeholder.com/150",
      // image: course3,
      title: "Google Cloud Basics",
      progress: 75,
      duration: "1 Month",
      status: "75%",
    },
    {
      id: "4",
      image: "https://via.placeholder.com/150",
      // image: course4,
      title: "Google Cloud Advanced",
      progress: 75,
      duration: "1 Month",
      status: "75%",
    },
    {
      id: "5",
      image: "https://via.placeholder.com/150",
      // image: course5,
      title: "DevOps Essentials",
      progress: 75,
      duration: "1 Month",
      status: "75%",
    },
    {
      id: "6",
      image: "https://via.placeholder.com/150",
      // image: course6,
      title: "Kubernetes Basics",
      progress: 75,
      duration: "1 Month",
      status: "75%",
    },
  ];

  // Filter and sort courses
  const filteredCourses = courses
    .filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((course) => {
      if (selectedCategory === "all") return true;
      if (selectedCategory === "ongoing") return course.status !== "Completed";
      if (selectedCategory === "completed") return course.status === "Completed";
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "progress") {
        return b.progress - a.progress;
      }
      return a.title.localeCompare(b.title);
    });

  if (selectedCourse) {
    if (selectedCourse.status === "Completed") {
      return (
        <CourseDashboardPage
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
        />
      );
    } else {
      return (
        <OngoingCourseDashboardPage
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
        />
      );
    }
  }

  const handleSelectedCourse = (course: Course) => {
    setSelectedCourse(course);
    sendMessage(course);
  };

  return (

    // current changes
    // <div className="h-full bg-gray-100 font-sans text-gray-800 w-full flex flex-col justify-between items-center">
    //   <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex items-center justify-between mb-4 pt-6">
    //       <h1 className="text-2xl font-bold text-[#8A63FF]">
    <div className="h-[80vh] overflow-y-auto  lg:w-[530px] xl:w-[700px] 2xl:w-[775px] 3xl:w-[1008px] py-1 " style={{ scrollbarWidth: "none" }}>
      <h1 className="text-3xl font-bold text-[#8A63FF] lg:ml-5 lg:mb-3 xl:mb-6">Hello {user.name} 👋</h1>

      <div className="w-full max-w-7xl mx-auto  px-2 ">
        <div className="flex items-center justify-between mb-4 pt-6 ">
          <h1 className="lg:text-sm 2xl:text-xl 3xl:text-2xl font-bold text-black">
            My Courses ({filteredCourses.length})
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-3 py-2 lg:w-[290px] lg:placeholder:text-sm xl:w-[420px] 2xl:w-[450px] 3xl:w-[500px] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "title" | "progress")
                }
                className="pl-8 pr-3 py-2 lg:w-[90px] xl:w-[90px] 2xl:w-[100px] text-xs border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="title" className="lg:text-xs xl:text-lg">Sort by</option>
                <option value="progress">Sort by Progress</option>
              </select>
              <svg
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9M3 12h6m4 0l3-3m0 0l3 3m-3-3v12"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start space-x-6 border-b border-gray-200 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative flex items-center space-x-2 text-sm font-medium py-2 px-4 transition-colors ${
                selectedCategory === category.id
                  ? "text-[#8A63FF] bg-gradient-to-b from-transparent from-49.76% via-transparent to-[rgba(138,99,255,0.24)] border-b-2 border-[#8A63FF] font-bold"
                  : "text-gray-500 hover:text-[#8A63FF]"
              }`}
            >
              <span>{category.label}</span>
              {/* <span
                className={`absolute bottom-0 left-0 w-full h-1 rounded-t-lg transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#E5E1FF] to-[#C8BFFF]"
                    : "bg-transparent"
                }`}
              /> */}
            </button>
          ))}
        </div>

          <div className="w-full">
        <div className="flex flex-wrap justify-start lg:p-0  p-1  w-full">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => handleSelectedCourse(course)}
                className="lg:mx-1 xl:mx-1 3xl:mx-2"
              >
                <DashboardCard course={course} />
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center w-full">
              No courses available for this category.
            </p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesOverview; 