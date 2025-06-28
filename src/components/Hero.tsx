import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../Assets/hero.png"; // Ensure this path is correct

interface Slide {
  title: string;
  description: string;
}

const Hero: React.FC = () => {
  const slides: Slide[] = [
    {
      title: " Unlock Your Potential. Learn Without Limits.",
      description:
        "Access a world of knowledge. Flexible learning built for your success journey",
    },
    {
      title: "Grow Smarter. Learn Faster.",
      description:
        "Learn your way. Expert courses. Full support. Your pace.",
    },
    {
      title: "Accelerate Your Skills. Build Your Future.",
      description:
        " Master cutting-edge topics. Gain certifications for career advancement.",
    },
  ];
  const toNavigation =useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);

  // Auto-shift to the next slide every 3 seconds
  useEffect(() => {
    const interval = 3000; // 3 seconds per slide
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        if (prevSlide === slides.length - 1) {
          setSkipTransition(true); // Disable sliding for reset
          setTimeout(() => setSkipTransition(false), 0); // Re-enable transition
          return 0; // Jump to first slide
        }
        return (prevSlide + 1) % slides.length;
      });
    }, interval);

    return () => clearInterval(slideTimer); // Cleanup interval on unmount
  }, [slides.length]);

  // Handle click on the progress bar to switch slides
  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - bar.left;
    const barWidth = bar.width;
    const sectionWidth = barWidth / slides.length;
    const clickedSection = Math.floor(clickX / sectionWidth);
    setCurrentSlide(clickedSection);
    setSkipTransition(false); // Ensure normal transition on click
  };

  return (
   

    <section className="relative from-purple-50 to-white overflow-hidden lg:h-[90vh] xl:h-[90vh] 2xl:h-[90vh] 3xl:h-[80vh] ">
      {/* <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgeT0iMSIgcj0iMSIgZmlsbD0iIzAwMDAwMDMzIi8+PC9zdmc+')] bg-repeat"></div>
      </div> */}
      <div className=" z-10 flex flex-col justify-center items-center lg:pt-5 xl:pt-5 2xl:pt-5 3xl:pt-10">
        <div className="relative lg:w-[628px] lg:h-[424px] xl:w-[728px] xl:h-[504px] 2xl:w-[828px] 2xl:h-[604px] 3xl:w-[1028px] 3xl:h-[694px] flex flex-col justify-center  ">
          {/* <div className="flex justify-center w-full"> */}
            <img
              src={heroImage}
              alt="Hero"
              className="w-[100%]   absolute z-0 top-[0px] lg:pt-6 xl:pt-12  2xl:pt-10 3xl:pt-8"
            />
          {/* </div> */}
          <div className=" flex flex-col relative z-10 justify-center items-center mx-auto lg:mt-32 xl:mt-36 2xl:mt-32 3xl:mt-20 text-center lg:h-[160px]     xl:h-[160px]  2xl:h-[223px] xl:w-[100%] 2xl:w-[100%] 3xl:w-[100%] ">
            <span className="lg:w-[100px] lg:h-[25px] xl:w-[115px] xl:h-[25px] 2xl:w-[150px] 2xl:h-[32px] 3xl:w-[200px] 3xl:h-[35px]  flex justify-center items-center bg-[#8A63FF] text-white lg:text-[7px] xl:text-[8px]  2xl:text-[10px] 3xl:text-xs font-semibold  rounded-full mb-2 ">
              SUPERVISED COURSES
            </span>
            <h1 className=" lg:text-4xl  xl:text-4xl 2xl:text-5xl 3xl:text-5xl font-bold text[#474747] h-[6rem] mb-4 ">
              {slides[currentSlide].title.split(" ").map((word, index) => (
                <span key={index}>
                  {word}{" "}
                  {index === 4 && <br />}
                </span>
              ))}
            </h1>
            <p className="lg:text-[12px] xl:text-sm 2xl:text-base 3xl:text-[1rem] text-[#474747] leading-relaxed max-w-2xl mx-auto ">
              {slides[currentSlide].description}
             <br />
               {/* Posuere vel netus auctor phasellus fermentum. */}
            </p>
          </div>
          <div className="flex flex-col  relative z-10 sm:flex-row items-center justify-center gap-4 mb-12 font-mont">
            {currentSlide === 0 ? (
              <>
                <button
                  type="button"
                  className="bg-[#8A63FF] text-white px-6 py-3 lg:text-xs xl:text-sm 2xl:text-base 3xl:text-lg font-medium rounded-lg shadow-md font-mont"
                  style={{ backgroundColor: "#8A63FF", boxShadow: '0px 10px 12px 0px rgba(0, 0, 0, 0.2)' }}
                  onClick={()=>toNavigation('/course')}
                >
                  Explore More Now
                </button>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        src={`https://i.pravatar.cc/32?img=${i}`}
                        alt={`Student ${i}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">1k+ students</span>
                </div>
              </>
            ) : currentSlide === 1 ? (
              <button
                type="button"
                className="bg-[#8A63FF] text-white px-6 py-3 text-lg font-medium rounded-lg shadow-md font-mont"
                style={{ backgroundColor: "#8A63FF", boxShadow: '0px 10px 12px 0px rgba(0, 0, 0, 0.2)' }}
                 onClick={()=>{toNavigation('/contact');console.log("clicked");
                 }}
              >
                Express Your Interest Now
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="bg-[#8A63FF] text-white px-6 py-3 text-lg font-medium rounded-lg shadow-md"
                  style={{ backgroundColor: "#8A63FF", boxShadow: '0px 10px 12px 0px rgba(0, 0, 0, 0.2)' }}
                   onClick={()=>toNavigation('/course')}
                >
                  Explore Courses Now
                </button>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span>📚</span>
                  <span>300+ Modules & 30+ Courses</span>
                </div>
              </div>
            )}
          </div>

          {/* Animated progress bar */}
          <div className="flex justify-center">
            <div
              className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
              onClick={handleBarClick}
            >
              <div
                className="h-full bg-[#8A63FF] rounded-full"
                style={{
                  width: `${100 / slides.length}%`,
                  transform: `translateX(${currentSlide * 100}%)`,
                  transition: skipTransition ? "none" : "transform 0.5s ease-in-out",
                }}
              />
            </div>
          </div>
        </div>
      </div>




      <style>
        {`
          @keyframes popSlide {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-pop-slide {
            animation: popSlide 0.5s ease-in-out forwards;
          }
        `}
      </style>
    </section >
  );
};

export default Hero;
