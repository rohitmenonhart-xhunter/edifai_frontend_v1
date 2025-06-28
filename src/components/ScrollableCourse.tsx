import React, { useState } from "react";

const ScrollableCourse = () => {
  const [activeIndex, setActiveIndex] = useState(0); // default active item

  const categories = [
    "Lorem Ipsum",
    "Electronics",
    "Lorem",
    "Placeholder",
    "Placeholder text",
    "Placeholder text",
    "Lorem Ipsum",
    "Electronics",
    "Lorem",
    "Placeholder",
    "Placeholder text",
    "Placeholder text",
    "Placeholder text",
    "Placeholder text",
    "Placeholder text",
  ];

  return (
    <section className="flex">
      <div className="w-1/4">
        <div className="max-w-xs mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="text-2xl font-mont font-bold mb-4 py-2 text-gray-800 text-center">
            Categories
          </h2>
          <ul className="w-64 h-96 overflow-y-auto pr-2 border-r-2 custom-scrollbar">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`py-4 px-4 text-sm cursor-pointer items-start w-[95%] border-gray-200 border-b-[0.1px] transition-all duration-200 ${
                  index === activeIndex
                    ? "text-[#7C3AED] font-semibold "
                    : "text-gray-800"
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ScrollableCourse;