import React from 'react';
import { ArrowLeft, Upload, BadgeCheck, Code2, Users, Sparkle } from 'lucide-react'; // Ensure all icons are imported
import Purplegradient from "../Assets/Purplegradient.png"

// Assuming these paths are correct relative to your project structure
// and that your bundler (e.g., Vite, Create React App, Next.js) handles them.
import girlpic from "../Assets/girl.jpg";
import avatars from "../Assets/avatar.jpg";
import chicks from "../Assets/chick.jpg";
import boyz from "../Assets/boy.jpg";

type Step = {
  number: string;
  icon: JSX.Element;
  title: string;
  description: string;
  bgColor: string;
};

const steps: Step[] = [
  {
    number: '01',
    icon: <ArrowLeft className="text-blue-500 w-5 h-5" />,
    title: 'Sign Up and create Account',
    description: 'Register quickly and customize your profile',
    bgColor: 'bg-blue-50',
  },
  {
    number: '02',
    icon: <Upload className="text-orange-500 w-5 h-5" />,
    title: 'Expression of interest',
    description: 'Explore courses and mark interest.',
    bgColor: 'bg-orange-50',
  },
  {
    number: '03',
    icon: <BadgeCheck className="text-purple-500 w-5 h-5" />,
    title: 'Get Discovered',
    description: 'Highlight your skills and progress in our network.',
    bgColor: 'bg-purple-50',
  },
  // Added more steps to make the scroll effect noticeable
  {
    number: '04',
    icon: <Code2 className="text-green-500 w-5 h-5" />,
    title: 'Start Learning',
    description: 'Access exclusive courses and content.',
    bgColor: 'bg-green-50',
  },
  {
    number: '05',
    icon: <Users className="text-red-500 w-5 h-5" />,
    title: 'Join Community',
    description: 'Connect with other learners and experts.',
    bgColor: 'bg-red-50',
  },
  {
    number: '06',
    icon: <Sparkle className="text-yellow-500 w-5 h-5" />,
    title: 'Achieve Goals',
    description: 'Complete milestones and get certified.',
    bgColor: 'bg-yellow-50',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-1">
        {/* Main heading */}
        <h2 className="lg:text-4xl xl:text-5xl 3xl:text-5xl font-mont font-medium text-gray-900 mb-16 text-left">
          How It Works
        </h2>

        <div className="flex flex-col h-[60vh] lg:flex-row justify-between items-start gap-1">
          {/* Left Side Steps Container */}
          <div className="w-full lg:w-1/2 h-[100%] relative  ">
            <img src={Purplegradient}
              className='inset-0 absolute' />
            {/* Scrollable container for steps */}
            <div
              className="space-y-14 h-[100%] w-[100%] overflow-y-auto pr-11 pl-4 your-scrollable-div::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #A78BFA, #8B5CF6); /* Purple gradient */
              border-radius: 5px; "
              style={{
                /* Custom Scrollbar Styles for Webkit (Chrome, Safari) */
                WebkitOverflowScrolling: 'touch', // Enable momentum scrolling on iOS
                msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
                scrollbarWidth: 'none', // Hide scrollbar for Firefox
              }}

            >

              {/* Webkit specific scrollbar styles (can be added to a global CSS file for cleaner separation) */}
              <style>{`
                div::-webkit-scrollbar {
                  width: 8px;
                }
                div::-webkit-scrollbar-track {
                  background: #F0F0F0; /* Light gray track */
                  border-radius: 4px;
                }
                div::-webkit-scrollbar-thumb {
                  background: #888; /* Darker gray thumb */
                  border-radius: 4px;
                }
                div::-webkit-scrollbar-thumb:hover {
                  background: #555; /* Even darker on hover */
                }
              `}</style>

              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center w-full"
                >
                  {/* Step Number */}
                  <div
                    className={`absolute font-mont text-purple-300 select-none text-[500%] leading-[100%] tracking-[0.03em] ${index % 2 === 0 ? 'left-[-15px]' : 'right-[-15px]'} top-1/2 -translate-y-1/2 z-0 opacity-100 `}
                  >
                    {step.number}
                  </div>

                  {/* Card Content */}
                  <div
                    className={`flex items-center gap-4 px-6 py-6 w-[80%] h-[20%] rounded-[20px] border border-gray-200 bg-white shadow-lg relative z-10 transition-transform duration-300 hover:scale-[1.02] ${index % 2 === 0 ? 'translate-x-[60px]' : '-translate-x-[60px]'}`}
                  >
                    <div className={`${step.bgColor} rounded-full p-2 shadow`}>
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold lg:text-xs xl:text-sm 2xl:text-base 3xl:text-lg text-gray-800">{step.title}</h4>
                      <p className="lg:text-xs xl:text-sm 2xl:text-base 3xl:text-lg text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Image + Avatars */}
          <div className="w-full lg:w-1/2 h-[100%]  flex flex-col justify-between items-center lg:items-end p-4 lg:p-0">
            <div className="grid grid-cols-2 gap-4 w-full h-full ">
              <div className=' h-[60vh] '>
                <div className='h-[70%] flex items-end justify-end  '>
                  <img
                    src={girlpic}
                    alt="Student working"
                    className="object-cover w-[70%]  h-[100%] rounded-[20px]"
                  />
                </div>

                <div className="flex flex-col justify-between items-center lg:items-end">
                  <div className='whitebox w-fit z-10  left-[55%] absolute'>
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 flex items-center gap-3 shadow-md w-fit ">
                      <div className="flex -space-x-2">
                        {[avatars, chicks, boyz].map((src, index) => (
                          <img
                            key={index}
                            src={src}
                            alt={`User ${index + 1}`}
                            className="lg:w-10 lg:h-10 xl:w-15 xl:h-15 2xl:w-18 2xl:h-18  3xl:w-20 3xl:h-20 rounded-full border-2 border-white object-cover "
                          />
                        ))}
                      </div>
                      <div className="text-sm font-semibold text-blue-600">
                        10K+<br /> <span className="text-gray-700 font-normal">Job Seekers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='h-[60vh] '>
                <img
                  src={girlpic}
                  alt="Student 2"
                  className="object-cover w-full h-[100%] rounded-[20px] "
                />
              </div>

            </div>




            {/* <div className="flex flex-col justify-between items-center lg:items-end">
              <div className='whitebox w-fit z-10 pr-96 absolute '>
                <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 flex items-center gap-3 shadow-md w-fit ">
                  <div className="flex -space-x-2">
                    {[avatars, chicks, boyz].map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`User ${index + 1}`}
                        className="lg:w-20 lg:h-20 xl:w-20 xl:h-20 2xl:w-20 2xl:h-20 rounded-full border-2 border-white object-cover "
                      />
                    ))}
                  </div>
                  <div className="text-sm font-semibold text-blue-600">
                    10K+<br /> <span className="text-gray-700 font-normal">Job Seekers</span>
                  </div>
                </div>
              </div>




            </div> */}



          </div>

        </div>
      </div>

    </section >
  );
};

export default HowItWorks;