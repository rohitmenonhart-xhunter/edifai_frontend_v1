import React from "react";
import { GraduationCap, BookOpen, Globe, MessageSquare } from "lucide-react";
import star from "../Assets/stargirl.jpg"; // Ensure the path is correct
import opp from "../Assets/opicon.png";
import learning from "../assests/learn.png";
import global from "../Assets/global.png";
import course from "../Assets/courses.png";
import learn from "../Assets/learning.svg";
import { useNavigate } from "react-router-dom";

import video from "../Assets/about-video/Backend web development - a complete overview.mp4";

const WhyChoose: React.FC = () => {
  const toNavigation = useNavigate();
  return (
    <section className="py-10 h-[80vh] bg-white overflow-hidden relative"> {/* Added relative and overflow-hidden for circles */}
      {/* Concentric Circles Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 ">
        <div className="relative w-[38%]  aspect-square"> {/* Adjust w and max-w for size */}
          <div className="absolute inset-0 rounded-full" style={{ backgroundColor: "#9539E50A" }} ></div>
          <div className="absolute inset-[10%] rounded-full" style={{ backgroundColor: "#0066FF0D" }}></div>
          <div className="absolute inset-[20%] rounded-full" style={{ backgroundColor: "#9539E54A" }}></div>
        </div>
      </div>

      <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 pb-2 h-[100%] relative z-10"> {/* z-10 to bring content above circles */}


        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center w-[100%]  h-[100%]">
          {/* Left Cards Column */}
          <div className="flex flex-col gap-6  h-full  justify-end pb-[20%] items-end "> {/* items-end to push cards to the right (closer to center) */}
            {/* Courses Card */}
            <div className="w-[70%] grid grid-cols-1 bg-white rounded-3xl lg:p-1 3xl:p-4 shadow-2xl lg:text-xs xl:text-sm 2xl:text-base"> {/* Added max-w for consistency */}
              <div className="p-1 rounded-lg   flex items-center justify-center">
                {/* <GraduationCap className="w-6 h-6 text-purple-600" /> */}
                <div className="flex items-center justify-center">
                  <img src={course} className="lg:w-7 lg:h-7 3xl:w-12 3xl:h-12" />
                </div>

              </div>
              <h3 className="font-semibold lg:text-[10px] xl:text-sm 2xl:text-base text-gray-900 mb-2 text-center">Courses</h3>
              <p className="lg:text-[8px] xl:text-sm text-gray-600 lg:mb-2 3xl:mb-4 text-center">Access a wide array of meticulously crafted courses.</p>
              <div className="flex items-center justify-center">
                <button className="bg-[#8A63FF] flex items-center align-center text-white px-4 py-2 rounded-3xl  lg:text-[8px] xl:text-sm 2xl:text-base hover:bg-opacity-85"
                  onClick={() => toNavigation('/course')}>
                  Courses
                </button>
              </div>
            </div>

            {/* 100K+ Card - Positioned below and slightly shifted based on image */}
            <div className="w-[70%] bg-white rounded-3xl p-1 shadow-2xl  mt-6"> {/* self-start for alignment, mt-6 for vertical spacing */}
              <div className="flex items-center  gap-2 lg:p-1 3xl:p-4 ">
                <div className="  rounded-lg w-fit">
                  {/* <Globe className="w-6 h-6 text-blue-600" /> */}
                  <img src={global} className="lg:w-7 h-7 xl:w-12 3xl:w-12 3xl:h-12 " />
                </div>
                <div className="flex items-start justify-start flex-col">
                  <div className="lg:text-[10px] xl:text-sm 2xl:text-[1.25rem] font-semibold text-gray-900 text-left">100K+</div>
                  <p className="lg:text-[8px] xl:text-sm  text-gray-600   text-left">Join 100,000+ learners globally.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Video Container */}
          <div className="flex justify-center items-center">
            {<div className=" mx-auto  rounded-3xl overflow-hidden shadow-2xl">
              {/* <img
                src={star}
                alt="Video presenter"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Error loading image:", e);
                  e.currentTarget.src = "https://via.placeholder.com/320x480";
                }}
              /> */}
              <video
                className="w-[100%] h-[65vh] object-fill"
                loop
                controls
                onError={(e) => {
                  console.error("Error loading video:", e);
                  e.currentTarget.poster = "https://via.placeholder.com/320x480";
                }}
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
             
            </div>}
          </div>

          {/* Right Cards Column */}
          <div className="flex flex-col justify-start h-full pt-[20%] gap-6 items-start "> {/* items-start to push cards to the left (closer to center) */}
            {/* Opportunities Card - Positioned above and slightly shifted based on image */}
            <div className="w-[70%] bg-white rounded-xl lg:p-3 xl:p-4 3xl:p-6 shadow-2xl  mb-6 flex "> {/* self-end for alignment, mb-6 for vertical spacing */}
              <div className="p-1 flex justify-center items-center   rounded-lg w-fit">
                {/* <MessageSquare className="w-6 h-6 text-blue-600" /> */}
                <img src={opp} className="lg:w-7 lg:h-7 3xl:w-12 3xl:h-12" />
              </div>
              <div className="flex justify-center items-center">
                <h3 className="font-semibold  text-gray-900  lg:text-[10px] xl:text-sm 2xl:text-[1.25rem]">Opportunities</h3>
              </div>

            </div>

            {/* Learning Card */}
            <div className="w-[70%] bg-white rounded-2xl lg:p-3 xl:p-4 3xl:p-6 shadow-2xl "> {/* Added max-w for consistency */}


              <div className="p-1 rounded-lg   flex items-center justify-center">
                {/* <GraduationCap className="w-6 h-6 text-purple-600" /> */}
                <div className="flex items-center justify-center">
                  <img src={learn} className="lg:w-7 lg:h-7 3xl:w-12 3xl:h-12"></img>
                </div>

              </div>

              <h3 className="font-semibold  text-gray-900 mb-2 text-center lg:text-[10px] xl:text-sm 2xl:text-[1.25rem]">Learning</h3>
              <p className=" text-gray-600 text-center lg:text-[8px] xl:text-sm ">Engage with interactive content,expert instructors.</p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
