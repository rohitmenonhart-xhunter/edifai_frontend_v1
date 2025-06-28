import React, { useState, useEffect } from 'react';
import { Star, Clock, HelpCircle, Plus, Minus } from 'lucide-react'; // All icons from lucide-react
import courseService, { IMentor } from '@/services/courseService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import img1 from "../Assets/vickram-varma.png";

// --- Data Interfaces ---
interface Mentor {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  reviews: number;
  image: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// --- Mentor Section Data ---

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Vikram Varma V",
    specialization: "Front-End Associate",
    experience: "2 Years",
    rating: 5,
    reviews: 200,
    image: img1
  },
  
  {
    id: 3,
    name: "Prem",
    specialization: "IOT Integration",
    experience: "1 Years",
    rating: 5,
    reviews: 200,
    image: "https://via.placeholder.com/150"
  }
];

// --- FAQ Section Data ---
const faqs: FaqItem[] = [
  {
    id: '1',
    question: 'Why do I need to use a Design System?',
    answer: 'A Design System is a super useful tool for designers. It helps keep designs consistent and makes the design process faster. You can use pre-designed stuff over and over, and it\'s helpful for both new and experienced designers. In short, a Design System is like a designer\'s toolbox for making great-looking and user-friendly designs.',
  },
  {
    id: '2',
    question: 'Is there a preview or a free trial available?',
    answer: 'Yes, we offer a demo version that allows you to explore the core features. Contact our sales team for more details on trial periods and enterprise solutions.',
  },
  {
    id: '3',
    question: 'Where can I purchase AlignUI Design System?',
    answer: 'AlignUI Design System can be purchased directly from our official website or through our authorized resellers. Please visit our pricing page for more information.',
  },
  {
    id: '4',
    question: 'What are the recent updates and enhancements in AlignUI?',
    answer: 'We regularly update AlignUI with new features, components, and improvements. You can find a detailed changelog on our documentation page or subscribe to our newsletter for release announcements.',
  },
  {
    id: '5',
    question: 'How do I install AlignUI Design System in Figma?',
    answer: 'Installing AlignUI Design System in Figma is straightforward. Simply download the Figma file from your purchase confirmation, then import it into your Figma account. Detailed instructions are available in our getting started guide.',
  },
];

// --- Helper Component: StarRating (for Mentors) ---
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center space-x-0.5 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < Math.round(rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-yellow-400"}`} 
        />
      ))}
    </div>
  );
};

// --- Main Combined Component ---
const TopMentors: React.FC = () => {
  const [mentors, setMentors] = useState<IMentor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Define a type for extended mentor data to handle additional fields
  type ExtendedMentor = IMentor & {
    specialization?: string;
    courses?: any[];
    reviews?: any[];
  };

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const data = await courseService.getMentors();
        
        if (!data || !Array.isArray(data)) {
          console.error("Invalid mentor data received:", data);
          setMentors([]);
          toast.error("Failed to fetch mentors data. Please try again later.");
          return;
        }
        
        // Transform the data to include specialization field
        const extendedData = data.map((mentor) => ({
          ...mentor,
          specialization: mentor.expertise?.length > 0 ? mentor.expertise[0] : 'Instructor',
          courses: [], // Default empty array
          reviews: [] // Default empty array
        }));
        setMentors(extendedData as IMentor[]);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        toast.error("Failed to fetch mentors. Please try again later.");
        setMentors([]); // Set empty array to prevent undefined errors
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className=" font-mont 2">
      {/* --- Top Mentors Section --- */}
      <section className="lg:py-10 xl:py-16 2xl:py-20 h-[80vh] 2xl:h-[90vh] 3xl:h-[80vh]">
        <div className="w-[70%] h-[60vh] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header Section */}
          <div className="mb-12 h-[20%]">
            <h2 className="lg:text-4xl xl:text-[56px] font-mont font-medium text-gray-900 mb-4">
              Our Top Mentors At Edifai
            </h2>
            <p className="text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Welcome to our platform, enhancing your skills. Welcome to our platform, enhancing your skills.
            </p>
          </div>

          {/* Mentor Cards Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : mentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap- 3xl:gap-12  place-content-center w-[60%] m-auto">
              {mentors.map((mentor) => {
                // Cast to extended type to access additional fields
                const extendedMentor = mentor as ExtendedMentor;
                return (
                  <div
                    key={mentor._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-[100%] h-[100%]"
                    onClick={() => navigate(`/mentor/${mentor._id}`)}
                  >
                    <div>
                      <img
                        src={mentor.avatar || "/placeholder-avatar.jpg"}
                        alt={mentor.name}
                        className=" w-full lg:h-48 xl:h-56 3xl:h-80 2xl:h-72   object-fill rounded-xl "
                      />
                    </div>
                    <div className="lg:p-2 xl:p-4 text-start">
                      <h3 className="lg:text-base xl:text-xl 2xl:text-2xl 3xl:text-[30px] font-mont font-medium text-gray-900 mb-2">
                        {mentor.name}
                      </h3>
                      <p className="text-[1.15rem] text-gray-500 mb-3 ">{extendedMentor.specialization || mentor.expertise?.[0] || 'Instructor'}</p>
                      <div className="flex items-center justify-start gap-2 text-gray-600 text-sm mb-4 ">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                          {mentor.courseCount || 0} {(mentor.courseCount || 0) === 1 ? 'Course' : 'Courses'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={mentor.rating} />
                        <span className="text-sm text-gray-500">({mentor.studentCount || 0})</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold">No mentors found</h3>
              <p className="text-gray-500 mt-2">
                Check back later for updates on our mentor team
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TopMentors;
