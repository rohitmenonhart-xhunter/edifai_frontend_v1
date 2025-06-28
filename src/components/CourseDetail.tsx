import React from 'react';
import SubmissionSuccess from './SubmissionSuccess';
import CourseCard from './CourseCard';

const CourseDetail: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 px-6 lg:px-20 py-10">
      {/* Left Side - Course Info */}
      <div className="flex-1">
        

        {/* What You'll Learn */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">What You'll Learn :</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            <ul className="list-disc list-inside space-y-2">
              <li>Understanding Design Principles & User Psychology</li>
              <li>Wireframing and Prototyping with Figma & Adobe XD</li>
              <li>Creating High-Fidelity Designs & Interactive Mockups</li>
            </ul>
            <ul className="list-disc list-inside space-y-2">
              <li>User Research, Personas, and Journey Mapping</li>
              <li>Responsive Design for Web & Mobile Interfaces</li>
              <li>Usability Testing and Design Iteration</li>
            </ul>
          </div>
        </div>

        {/* Value Beyond the Classroom */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Value Beyond the Classroom</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-sm text-gray-700">
            <div>
              <p>Behance Profile</p>
            </div>
            <div>
              <p>LinkedIn Profile</p>
            </div>
            <div>
              <p>Resume Building</p>
            </div>
            <div>
              <p>Interview Preparation</p>
            </div>
          </div>
        </div>

        {/* What You'll Get */}
        <div>
          <h2 className="text-lg font-semibold text-purple-700 mb-4">What You’ll Get</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-sm text-gray-700">
            <div><p>Certificate of Completion</p></div>
            <div><p>Reference Materials</p></div>
            <div><p>Skill Assessment</p></div>
            <div><p>Mentorship Guidance</p></div>
          </div>
        </div>
      </div>

      {/* Right - Enroll Form */}
      <div className="w-full lg:w-[350px] shadow-lg p-6 rounded-2xl bg-white">
        <h3 className="text-lg font-semibold text-purple-700 mb-4">Enroll my Interest (course name)</h3>
        <form className="space-y-4">
          <div className="flex gap-3">
            <input type="text" placeholder="First Name" className="w-1/2 px-3 py-2 border rounded-md text-sm" />
            <input type="text" placeholder="Last Name" className="w-1/2 px-3 py-2 border rounded-md text-sm" />
          </div>
          <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-md text-sm" />
          <input type="tel" placeholder="Phone Number" className="w-full px-3 py-2 border rounded-md text-sm" />
          <input type="file" className="text-sm text-gray-700 file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-purple-100 file:text-purple-700" />
          <button type="submit" className="w-full bg-purple-600 text-white text-sm py-2 rounded-md hover:bg-purple-700">
            Submit Now
          </button>
        </form>
      </div>
      <SubmissionSuccess/>
      <CourseCard title={''} learnings={[]} badge={''}/>
    </div>
  );
};

export default CourseDetail;
