import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  Code2,
  Layout,
  Wrench,
  Sparkle,
  Calculator,
  Users,
  Megaphone,
  ArrowUp,
} from "lucide-react";
import courseService, { IMentor } from "@/services/courseService";
import { toast } from "sonner";

// Extended mentor interface to match what's actually returned from the API
interface ExtendedMentor extends IMentor {
  specialization?: string;
  reviews?: { length: number };
  courses?: any[];
}

const Masters = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mentors, setMentors] = useState<ExtendedMentor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Icon mapping for specializations
  const getIconForSpecialization = (specialization: string) => {
    switch (specialization) {
      case "IoT":
        return Code2;
      case "UI/UX":
        return Layout;
      case "Full Stack":
        return Sparkle;
      case "Mechanical":
        return Wrench;
      default:
        return Users;
    }
  };

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const data = await courseService.getMentors() as ExtendedMentor[];
        setMentors(data || []);
        
        // Set active category to match first mentor's specialization if it exists
        if (data?.length > 0 && data[0]?.specialization) {
          setActiveCategory(data[0].specialization);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
        toast.error("Failed to fetch mentors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  // Get unique specializations from mentors
  const specializations = ["All", ...Array.from(new Set(mentors?.filter(mentor => mentor?.specialization).map(mentor => mentor.specialization as string) || []))];

  // Create categories with icons
  const categories = specializations.map(name => ({
    name,
    icon: getIconForSpecialization(name),
  }));

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const filteredMentors =
    activeCategory === "All"
      ? mentors
      : mentors.filter((mentor) => mentor?.specialization === activeCategory);

  return (
    <section className="py-20">
      <div className="w-[100%] flex justify-center items-center flex-col px-4 sm:px-6 lg:px-8">
        {/* Navigation Links */}
        <div className="flex justify-center gap-6 border-b w-[80%] border-gray-200 mb-12 flex-wrap">
          {categories.map((category, index) => {
            const isActive = activeCategory === category.name;
            const Icon = category.icon;

            return (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className={`relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-300
                 ${isActive 
                 ? "text-blue-600 g-gradient-to-b from-transparent from-49.76% via-transparent to-[#E6F0FF]" 
                 : "text-gray-500 hover:text-blue-500"}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                {category.name}
                {isActive && (
                  <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-blue-600 rounded-full shadow-[0_2px_6px_rgba(0,115,255,0.4)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Masters Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredMentors?.length > 0 ? (
          <div className="w-[100%] flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-[70%]">
              {filteredMentors.map((mentor) => (
                // Individual Master Card
                <div
                  key={mentor._id}
                  className="group bg-white rounded-xl p-1 transition-all duration-300 ease-in-out
                    transform-gpu cursor-pointer hover:bg-[#8A63FF1A] hover:shadow-xl 
                    hover:shadow-purple-100 hover:border-purple-500 hover:border-2 border-gray-100 border"
                  onClick={() => navigate(`/mentor/${mentor._id}`)}
                >
                  {/* Content within the card */}
                  <div className="flex flex-col items-center text-center w-[100%] p-4 rounded-2xl overflow-hidden">
                    <img
                      src={mentor.avatar || "/placeholder-avatar.jpg"}
                      alt={mentor.name}
                      className="lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full object-cover mb-2 shadow-md"
                    />
                    {/* Star rating moved after the image */}
                    <div className="flex items-center mb-4">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1 group-hover:fill-yellow-400" />
                      <span className="text-gray-600 text-sm">
                        {mentor.rating.toFixed(1)} ({mentor.reviews?.length || 0})
                      </span>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold lg:text-sm xl:text-base 2xl:text-lg text-gray-900">{mentor.name}</h3>
                      <p className="lg:text-xs xl:text-sm 2xl:text-base text-gray-500">{mentor.specialization}</p>
                    </div>
                    <div className="flex justify-center gap-1 flex-wrap">
                      {mentor.courses?.slice(0, 2).map((course, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 lg:text-[12px] xl:text-sm 2xl:text-base rounded-full font-medium transition-all duration-300 ease-in-out group-hover:bg-[#8A63FF1A] group-hover:border-purple-500 group-hover:border"
                        >
                          {typeof course === 'object' && course.title ? course.title.split(' ').slice(0, 1).join(' ') : 'Course'}
                        </span>
                      ))}
                      {mentor.courses && mentor.courses.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 lg:text-[12px] xl:text-sm 2xl:text-base rounded-full font-medium">
                          +{mentor.courses.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No mentors found</h3>
            <p className="text-gray-500 mt-2">
              No mentors available for this specialization
            </p>
          </div>
        )}


        //  <div className="w-[100%] flex justify-center items-center">
        //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-[70%]">
        //     {filteredMasters.map((master) => (
              
        //       <div
        //         key={master.id}
        //         className={`
       
                
        //         group 
       
        //         bg-white rounded-xl p-1 transition-all duration-100 ease-in-out
       
        //         transform-gpu cursor-pointer
       
        //         hover:bg-[#8A63FF1A]              
        
        //         hover:shadow-xl hover:shadow-purple-100 
       
        //         hover:border-[#8A63FF]  
        //         border-gray-100 border 
     
        //       `}

        //       >
               
        //         <div className="flex flex-col items-center text-center w-[100%]   p-4  rounded-2xl  overflow-hidden">
        //           <img
        //             src={master.image}
        //             alt={master.name}
        //             className="lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full object-cover mb-2 shadow-md"
        //           />
                  
        //           <div className="flex items-center mb-4">
        //             <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1 group-hover:fill-yellow-400" />
        //             <span className="text-gray-600 text-sm">
        //               {master.rating} ({master.reviews})
        //             </span>
        //           </div>
        //           <div className="mb-4"> 
        //             <h3 className="font-semibold lg:text-sm xl:text-base 2xl:text-lg text-gray-900">{master.name}</h3>
        //             <p className="lg:text-xs xl:text-sm 2xl:text-base text-gray-500">{master.role}</p>
        //           </div>
        //           <div className="flex  justify-center gap-1">
                   
        //           </div>
        //         </div>
        //       </div>
        //     ))}
        //   </div>

        // </div>
        
        // <div className="flex justify-center mt-12">
        //   <Link
        //     to="#" 
        //     className="flex items-center px-6 py-2 bg-white text-[#8A63FF] border border-[#8AB9FF] rounded-full hover:bg-[#8A63FF] hover:text-white transition-colors duration-300 shadow-md"
        //   >
        //     View All
        //     <span className="ml-2 flex items-center justify-center w-6 h-6 bg-[#8A63FF] rounded-full">
        //       <ArrowUp className="w-4 h-4 text-white transform rotate-45" />
        //     </span>
        //   </Link>
        // </div>
      </div>
    </section>
  );
};

export default Masters;
