import React, { useState } from "react";
import LearningModule from "./LearningModule";

import PurpleBox from "./PurpleBox";
import Footer from "./Footer";
import Navbar from "./Navbar";

const LearningOverview: React.FC = () => {
  // State to track the selected category
  const [category, setCategory] = useState<"Videos" | "Books">("Videos");

  return (
    <div className="min-h-screen bg-white-100">
      <Navbar/>
      {/* Category Toggle Buttons */}
      {/* <div className="flex justify-center space-x-4 p-4 bg-white shadow-md">
        <button
          onClick={() => setCategory("Videos")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            category === "Videos"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Videos
        </button>
        <button
          onClick={() => setCategory("Books")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            category === "Books"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Books
        </button>
      </div> */}

      {/* Main Content */}
      <div className="container mx-auto p-6 ">
        <LearningModule />

        {/* Conditional Rendering based on Category */}
        <div className="flex justify-center">
        <PurpleBox />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LearningOverview;