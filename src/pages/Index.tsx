
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoursesSection from "@/components/coursessection";
import PurpleBox from "@/components/PurpleBox";
import WhyChoose from "@/components/WhyChoose";
import Masters from "@/components/Masters";
import HowItWorks from "@/components/HowItWorks";
import TopMentors from "@/components/TopMentors";
import FAQ from "@/components/FAQ";
import WallOfLove from "@/components/WallOfLove";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CoursesSection />
      {/* <div className="flex justify-center">
        <PurpleBox />

      </div> */}
      <div className="flex justify-center text-center flex-col font-mont pt-[5%]">
        {/* Header */}
        <div className="text-center mb-1">
          <h2 className="lg:text-4xl xl:text-5xl 3xl:text-5xl font-mont font-medium text-gray-900 mb-4">Why Choose Edifai?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto items-center">
            At Edifai, we're dedicated to providing an unparalleled learning
            experience that equips you for success in today's dynamic world.
          </p>
        </div>
        <WhyChoose />
      </div>
      {/* <div className="flex justify-center text-center flex-col   pt-[5%]">
        
        <div className="text-center mb-1">
          <h2 className="lg:text-4xl xl:text-5xl 3xl:text-5xl font-mont font-medium text-gray-900 mb-4">Discover Our Edifai Mentors</h2>
          <p className="text-gray-600 lg:text-sm xl:text-base 2xl:text-lg mx-auto">
            Find the best courses for your company and boosts your career 10x!
          </p>
        </div>
        <Masters />
      </div> */}


      <HowItWorks />
      <TopMentors />
      {/* <div className="bg-red-500">jhghj</div> */}
      <FAQ />
      <WallOfLove />
      <div className="flex justify-center text-start">
        <PurpleBox />

      </div>
      <Footer />
    </div>
  );
};

export default Index;
