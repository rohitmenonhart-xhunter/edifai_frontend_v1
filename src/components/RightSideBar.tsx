import React from 'react';
import trophy from '../Assets/trophy.svg';
import awardbg from '../Assets/card-award.png';
import DashboardCard from './DashboardCard';
function RightSideBar() {

  const suggestedItems = [
    // {
    //   id: 1,
    //   title: 'AWS Certified Solutions Architect',
    //   image: '/placeholder.svg',
    //   imageAlt: 'AWS Certified Solutions Architect',
    //   duration: '3 Month',
    //   progress: 50,
    // },

  ];

  return (
    // <div className="w-full lg:w-[300px] ml-auto space-y-8 flex flex-1 justify-center">
    // <div className="  px-8 lg:h-[80vh] lg:w-[30vw] fixed top-32 right-10">
    <div className='h-[80vh] flex flex-col  shadow-md bg-white lg:p-2 xl:p-4    rounded-[20px] overflow-x-auto lg:w-[240px] xl:w-[280px] 2xl:w-[330px] 3xl:w-[380px]' style={{ scrollbarWidth: "none" }}>
      {/* Complete Few Courses Card */}

      <div className='flex justify-center  '>
        <div className=" text-white lg:p-2 xl:p-4  pt-4 rounded-lg shadow-md lg:w-[300px] xl:w-[323px]  2xl:w-[343px] 3xl:h-[243px] flex flex-col justify-between col-span-1 bg-[url('../Assets/cardaward.png')] bg-cover bg-center"
          style={{ backgroundImage: `url(${awardbg})` }}>
          <div className='flex flex-col justify-center items-start '>
            <h2 className="lg:text-[14px] xl:text-[16px] 2xl:text-[20px] 3xl:text-[24px] font-bold mb-2  ">Complete Few courses</h2>
            <p className="text-purple-200 lg:text-[11px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[14px] mb-0">Achieve with purpose Achieve with purpose Achieve with purpose.</p>
            <div className="flex  items-start justify-between mt-2 lg:w-[200px] xl:w-[218px] xl:h-[40px] 2xl:w-[218px] 2xl:h-[50px]  3xl:w-[280px] 3xl:h-[50px]">
              <div className='w-[80%] '>
                <div className="lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-2xl font-bold">02/10</div>

                <div className="w-[100%] bg-gray-300 rounded-full h-2 mb-2">
                  <div
                    className="bg-white lg:h-[6px] xl:h-[7px] 2xl:h-[7px] 3xl:h-[8px] w-full rounded-full"
                    style={{ width: `${20}%` }}
                  ></div>
                </div>
              </div>

              <img src={trophy} alt="Trophy" className="relative lg:left-9 lg:bottom-3  xl:left-4 xl:bottom-7 2xl:left-4 2xl:bottom-6 3xl:left-2 3xl:bottom-8 lg:h-16 lg:w-16 xl:h-[106px] xl:w-[106px] 2xl:h-[126px] 2xl:w-[126px] 3xl:h-[146px] 3xl:w-[146px]" />

            </div>

          </div>

          <div className='flex justify-between items-center relative'>
            <button className="mt-2 bg-white text-[#8A63FF] px-2 py-1 lg:text-xs rounded-full font-semibold hover:bg-gray-100 lg:h-[22px] lg:w-[82px] xl:h-[25px] xl:w-[102px] 2xl:h-[30px] 2xl:w-[102px] 3xl:h-[35px] 3xl:w-[122px]">
              Start Now
            </button>
            {/* <img src={trophy} alt="Trophy" className="absolute right-2 lg:h-[80px] lg:w-[80px] xl:h-[96px] xl:w-[96px]  2xl:h-[96px] 2xl:w-[106px] 3xl:h-[126px] 3xl:w-[300px]" /> */}
          </div>
        </div>
      </div>


  {/* <div className='flex justify-center  '>
        <div className="relative object-fill text-white lg:p-2 xl:p-4  pt-4 rounded-lg shadow-md lg:w-[300px] xl:w-[323px]  2xl:w-[343px] 3xl:h-[243px] flex flex-col justify-between col-span-1 bg-[url('../Assets/cardaward.png')] bg-cover bg-center"
       
        >

          <img src={awardbg} className="w-[]" />
          <div className="absolute">
            <div className='flex flex-col justify-center items-start '>
              <h2 className="lg:text-[14px] xl:text-[16px] 2xl:text-[20px] 3xl:text-[24px] font-bold mb-2  ">Complete Few courses</h2>
              <p className="text-purple-200 lg:text-[11px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[14px] mb-0">Achieve with purpose Achieve with purpose Achieve with purpose.</p>
              <div className="flex  items-start justify-between mt-2 lg:w-[200px] xl:w-[218px] xl:h-[40px] 2xl:w-[218px] 2xl:h-[50px]  3xl:w-[280px] 3xl:h-[50px]">
                <div className='w-[80%] '>
                  <div className="lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-2xl font-bold">02/10</div>

                  <div className="w-[100%] bg-gray-300 rounded-full h-2 mb-2">
                    <div
                      className="bg-white lg:h-[6px] xl:h-[7px] 2xl:h-[7px] 3xl:h-[8px] w-full rounded-full"
                      style={{ width: `${20}%` }}
                    ></div>
                  </div>
                </div>

                <img src={trophy} alt="Trophy" className="relative lg:left-9 lg:bottom-3  xl:left-4 xl:bottom-7 2xl:left-4 2xl:bottom-6 3xl:left-2 3xl:bottom-8 lg:h-16 lg:w-16 xl:h-[106px] xl:w-[106px] 2xl:h-[126px] 2xl:w-[126px] 3xl:h-[146px] 3xl:w-[146px]" />

              </div>

            </div>

            <div className='flex justify-between items-center relative'>
              <button className="mt-2 bg-white text-[#8A63FF] px-2 py-1 lg:text-xs rounded-full font-semibold hover:bg-gray-100 lg:h-[22px] lg:w-[82px] xl:h-[25px] xl:w-[102px] 2xl:h-[30px] 2xl:w-[102px] 3xl:h-[35px] 3xl:w-[122px]">
                Start Now
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Suggested Next Section */}

      <div className=' mt-6 w-full '>
        <h3 className="text-[16px] font-semibold text-gray-800 mb-4">Suggested Next</h3>
        <div className="flex a justify-center overflow-x-auto space-x-4 pb-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ">
          {/* Mapping over the data array */}
          {suggestedItems.map((course) => (
            <div key={course.id}>
              <DashboardCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
    // </div> 

    // </div>

  );
}

export default RightSideBar;
