
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Star, Download, Eye, Calendar } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SubmissionSuccess from "@/components/SubmissionSuccess";
import Card from "@/components/Card";
const Book = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { course } = location.state || {};
   const [formSubmitted, setFormSubmitted] = useState(false);

     const handleFormSubmitSuccess = () => {
    setFormSubmitted(true);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Navbar />
        <p className="text-xl text-gray-700">Course details not found. Please go back to the courses page.</p>
        <Button onClick={() => window.history.back()} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
          Go Back
        </Button>
        <Footer />
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Course Details */}
          <div className="lg:w-2/3">
            {/* Back Button */}
            <div className="mb-6">
              <a href="/course" className="text-purple-600 hover:underline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Courses
              </a>
            </div>

            {/* Course Header */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <span className="inline-block bg-purple-200 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">{course.badge}</span>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-700 leading-relaxed mb-6">
                {course.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                What You'll Learn
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p className="font-semibold mb-2">UI/UX Design Fundamentals:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Understanding Design Principles & User Psychology</li>
                    <li>Wireframing and Prototyping with Figma & Adobe XD</li>
                    <li>Creating High-Fidelity Designs & Interactive Mockups</li>
                  </ul>
                </div>
                <div>
                  <ul className="list-disc list-inside space-y-1 mt-6 md:mt-0">
                    <li>User Research, Personas, and Journey Mapping</li>
                    <li>Responsive Design for Web & Mobile Interfaces</li>
                    <li>Usability Testing and Design Iteration</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Value Beyond the Classroom */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Value Beyond the Classroom</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-behance mb-2"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 12c0-2-1-4-3-4H6V8h3c2 0 3 2 3 4s-1 4-3 4H6v-1h3c2 0 3-2 3-4Z"/></svg>
                  <p className="text-gray-700">Behance Profile</p>
                  <p className="text-sm text-gray-500">Showcase projects, collaborate, version control.</p>
                </div>
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin mb-2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  <p className="text-gray-700">LinkedIn Profile</p>
                  <p className="text-sm text-gray-500">Network, showcase skills, attract opportunities.</p>
                </div>
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text mb-2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                  <p className="text-gray-700">Resume Building</p>
                  <p className="text-sm text-gray-500">Highlight skills, projects, career growth.</p>
                </div>
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users mb-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <p className="text-gray-700">Interview Preparation</p>
                  <p className="text-sm text-gray-500">Master communication, negotiation, and interviews.</p>
                </div>
              </div>
            </div>

            {/* What You'll Get */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award mb-2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17.18 21l-5.15-3.62L6.82 21l1.703-8.11"/></svg>
                  <p className="text-gray-700">Certificate of Completion</p>
                  <p className="text-sm text-gray-500">Receive a Certificate to validate your skills and enhance your profile.</p>
                </div>
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-text mb-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h6z"/><path d="M10 12H7"/><path d="M13 16H7"/></svg>
                  <p className="text-gray-700">Reference Materials</p>
                  <p className="text-sm text-gray-500">Access comprehensive materials to support your continued learning.</p>
                </div>
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-check mb-2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
                  <p className="text-gray-700">Skill Assessment</p>
                  <p className="text-sm text-gray-500">Evaluate your expertise with in-depth skill assessments.</p>
                </div>
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap mb-2"><path d="M22 10a2 2 0 0 0-2-2h-6L9 3 2 8v4c0 1.1.9 2 2 2h2.5l-.97 5.73c-.14.81.55 1.47 1.36 1.33L12 19l4.09 1.36c.81.14 1.5-.52 1.36-1.33L17.5 14H20a2 2 0 0 0 2-2Z"/><path d="M6 14v-2c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2"/><path d="M12 19v2"/></svg>
                  <p className="text-gray-700">Mentorship Guidance</p>
                  <p className="text-sm text-gray-500">Get guidance and insights from industry experts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enrollment Form */}
       { !formSubmitted?  <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enroll my Interest ({course.title})</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="sr-only">First Name</label>
                    <input type="text" id="firstName" placeholder="First Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="sr-only">Last Name</label>
                    <input type="text" id="lastName" placeholder="Last Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input type="email" id="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Phone Number</label>
                  <input type="tel" id="phone" placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label htmlFor="upload" className="block text-sm font-medium text-gray-700 mb-2">Upload a Resume</label>
                  <div className="flex items-center space-x-2">
                    <Button type="button" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">Select a file</Button>
                    <span className="text-sm text-gray-500">Supported Format PDF, Word</span>
                  </div>
                </div>
                <div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold"
                 onClick={()=>{setFormSubmitted(true) }} 
                 >Submit Now</Button>
                </div>
              </form>
            </div>
          </div>:<div><SubmissionSuccess /></div>}
        </div>
      </main>

      {/* Wall of Love */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Wall of love</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="https://via.placeholder.com/40" alt="Esther Howard" className="rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">Esther Howard</p>
                  <p className="text-sm text-gray-500">@totallynotperson</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter ml-auto text-blue-400"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5 4 8 4s.7-2.1 2-3.4c1.6-10 9.4-17 18-11.6 2.2-.1 4.4.6 6 2Z"/></svg>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">Pharetra pharetra massa massa ultricies. Accumsan sit amet nulla facilisi morbi. Integer eget aliquet nibh praesent tristique magna sit amet.</p>
              <p className="text-sm text-gray-500">12:15 PM - May 19, 2009</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="https://via.placeholder.com/40" alt="Leslie Alexander" className="rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">Leslie Alexander</p>
                  <p className="text-sm text-gray-500">@totallynotperson</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter ml-auto text-blue-400"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5 4 8 4s.7-2.1 2-3.4c1.6-10 9.4-17 18-11.6 2.2-.1 4.4.6 6 2Z"/></svg>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">Magna fermentum iaculis eu non diam phasellus. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc.</p>
              <p className="text-sm text-gray-500">12:15 PM - May 19, 2009</p>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="https://via.placeholder.com/40" alt="Wade Warren" className="rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">Wade Warren</p>
                  <p className="text-sm text-gray-500">@totallynotperson</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter ml-auto text-blue-400"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5 4 8 4s.7-2.1 2-3.4c1.6-10 9.4-17 18-11.6 2.2-.1 4.4.6 6 2Z"/></svg>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">Porttitor rhoncus dolor purus non. Varius duis at consectetur lorem donec. Aliquam ut porttitor leo a diam sollicitudin tempor id.</p>
              <p className="text-sm text-gray-500">12:15 PM - May 19, 2009</p>
            </div>
            {/* Testimonial 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="https://via.placeholder.com/40" alt="Jacob Jones" className="rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">Jacob Jones</p>
                  <p className="text-sm text-gray-500">@totallynotperson</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter ml-auto text-blue-400"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5 4 8 4s.7-2.1 2-3.4c1.6-10 9.4-17 18-11.6 2.2-.1 4.4.6 6 2Z"/></svg>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">Aliquam faucibus purus in massa tempor. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit.</p>
              <p className="text-sm text-gray-500">12:15 PM - May 19, 2009</p>
            </div>
            {/* Testimonial 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="https://via.placeholder.com/40" alt="Courtney Henry" className="rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">Courtney Henry</p>
                  <p className="text-sm text-gray-500">@totallynotperson</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter ml-auto text-blue-400"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5 4 8 4s.7-2.1 2-3.4c1.6-10 9.4-17 18-11.6 2.2-.1 4.4.6 6 2Z"/></svg>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">Nunc sed velit dignissim sodales ut eu sem integer. Scelerisque varius morbi enim nunc faucibus. Mi sit amet mauris commodo quis.</p>
              <p className="text-sm text-gray-500">12:15 PM - May 19, 2009</p>
            </div>
            {/* Testimonial 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="https://via.placeholder.com/40" alt="Darrell Steward" className="rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">Darrell Steward</p>
                  <p className="text-sm text-gray-500">@totallynotperson</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter ml-auto text-blue-400"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5 4 8 4s.7-2.1 2-3.4c1.6-10 9.4-17 18-11.6 2.2-.1 4.4.6 6 2Z"/></svg>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">Donec et scelerisque quam. Aliquam varius et sapien a pharetra. Maecenas auctor, augue finibus rhoncus, orci lorem ultricies eli.</p>
              <p className="text-sm text-gray-500">12:15 PM - May 19, 2009</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-12 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Join ambitious professionals and unlock your dream career today</h2>
          <p className="text-lg mb-9">Unlock your true potential and discover a world of opportunities that align with your skills, interests, and aspirations</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.93 1.93 0 0 1-2.06 0L2 7"/></svg>
              <input type="email" placeholder="Your mail address" className="w-full sm:w-80 p-3 pl-10 rounded-md text-gray-900" />
            </div>
            <Button className="bg-white text-purple-700 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold">Join Us</Button>
          </div>
            </div>
      </section>
      <Footer />
      <Card course={undefined}/>
    </div>
  );
};

export default Book;
