import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, Clock, Users, BookOpen, Filter } from "lucide-react";
import WallOfLove from "../components/WallOfLove";
import { useNavigate } from "react-router-dom";
import heroimage from "../Assets/Vector.png";
import Recard from "@/components/Card";
import PurpleBox from "@/components/PurpleBox";

// Define interface for a Book
interface Book {
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  originalPrice: number;
  duration: string;
  lessons: number;
  level: string;
  category: string;
  image: string;
  badge?: string;
}

const BooksPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [activeIndex, setActiveIndex] = useState(0);
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Book categories
  const categories = [
    "All Categories",
    "Programming",
    "Data Science",
    "Design",
    "Business",
    "Marketing",
    "Personal Development",
    "Health & Wellness",
    "Technology",
    "Machine Learning",
    "Web Development",
    "Mobile Development",
    "DevOps",
    "Security",
    "Cloud Computing",
  ];

  // Sample books data - this would ideally be fetched from an API
  const sampleBooks: Book[] = [
    {
      title: "Introduction to Machine Learning (PDF)",
      instructor: "Self-paced",
      rating: 4.5,
      students: 3000,
      price: 0,
      originalPrice: 29,
      duration: "Self-paced",
      lessons: 15,
      level: "beginner",
      category: "books",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=300&h=200&fit=crop",
      badge: "Free",
    },
    {
      title: "Python Programming Handbook (PDF)",
      instructor: "Self-paced",
      rating: 4.7,
      students: 5000,
      price: 0,
      originalPrice: 25,
      duration: "Self-paced",
      lessons: 12,
      level: "beginner",
      category: "books",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop",
      badge: "Free",
    },
    {
      title: "Web Development Fundamentals (PDF)",
      instructor: "Self-paced",
      rating: 4.6,
      students: 4500,
      price: 0,
      originalPrice: 35,
      duration: "Self-paced",
      lessons: 18,
      level: "beginner",
      category: "books",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=300&h=200&fit=crop",
      badge: "Free",
    },
    {
      title: "JavaScript Mastery Guide (PDF)",
      instructor: "Self-paced",
      rating: 4.8,
      students: 7200,
      price: 19.99,
      originalPrice: 39.99,
      duration: "Self-paced",
      lessons: 24,
      level: "intermediate",
      category: "books",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop",
      badge: "Best Seller",
    },
    {
      title: "Data Science Essentials (PDF)",
      instructor: "Self-paced",
      rating: 4.9,
      students: 6300,
      price: 24.99,
      originalPrice: 49.99,
      duration: "Self-paced",
      lessons: 30,
      level: "beginner",
      category: "books",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      badge: "Popular",
    },
    {
      title: "UI/UX Design Principles (PDF)",
      instructor: "Self-paced",
      rating: 4.7,
      students: 4100,
      price: 14.99,
      originalPrice: 29.99,
      duration: "Self-paced",
      lessons: 20,
      level: "beginner",
      category: "books",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=300&h=200&fit=crop",
      badge: "New",
    },
    {
      title: "React.js Complete Guide (PDF)",
      instructor: "Self-paced",
      rating: 4.8,
      students: 8500,
      price: 29.99,
      originalPrice: 59.99,
      duration: "Self-paced",
      lessons: 35,
      level: "intermediate",
      category: "books",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      badge: "Advanced",
    },
    {
      title: "Cloud Computing Fundamentals (PDF)",
      instructor: "Self-paced",
      rating: 4.5,
      students: 3800,
      price: 19.99,
      originalPrice: 44.99,
      duration: "Self-paced",
      lessons: 22,
      level: "beginner",
      category: "books",
      image: "https://images.unsplash.com/photo-1603322327561-7e3fb2b33e78?w=300&h=200&fit=crop",
      badge: "Essential",
    }
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // Ideally, you would fetch books from an API
        // For now, we'll use the sample books
        setBooksData(sampleBooks);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on category
  const filterBooks = (category: string) => {
    setSelectedCategory(category.toLowerCase());
  };

  // Get filtered books
  const getFilteredBooks = () => {
    if (selectedCategory === "all" || selectedCategory === "all categories") {
      return booksData;
    }
    return booksData.filter(book => book.title.toLowerCase().includes(selectedCategory));
  };

  const filteredBooks = getFilteredBooks();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
   <section className=" relative bottom-20 ">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center ">
          <div className=" flex flex-col justify-center items-center">
            <img
              src={heroimage}
              alt="Hero Image"
              className="mx-auto"
              style={{
                width: "500px",
                height: "auto",
                position: "relative",
                left: "0",
                top: "90px",
                transform:"ScaleX(-1)"
              }}
            />
            <div className="">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                Discover Our Books Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Browse our extensive library of self-paced learning materials and downloadable PDFs to enhance your skills and knowledge.
          </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-20">
            <h2 className="text-2xl font-semibold mb-6">Books & Resources ({booksData.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="search"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Search:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search books..."
                    className="w-full rounded-full border border-gray-300 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                >
                  <option>Newest</option>
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="format"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Format:
                </label>
                <select
                  id="format"
                  className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                >
                  <option>All Formats</option>
                  <option>PDF</option>
                  <option>EPUB</option>
                  <option>Online Reader</option>
                  <option>Audio</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="level"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Level:
                </label>
                <select
                  id="level"
                  className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                >
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category and Books Section */}
      <div className="flex justify-center mb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <section className="flex relative justify-center  py-8 mb-16  lg-[90%] xl:w-[90%] ">
          <section className=" sticky h-[80vh] top-[90px] lg:w-[25%]  xl:w-[25%] 2xl:w-[25%] 3xl:w-[25%] overflow-y-auto px-2 " style={{scrollbarWidth:"thin"}}>
            <div className="w-full">
              <div className="max-w-c mx-auto px-4 sm:px-6 lg:px-10">
                <h2 className="text-2xl font-mont font-bold mb-4 py-2 text-gray-800 text-center">
                  Categories
                </h2>
                <ul className="w-full h-full overflow-y-auto pr-2  custom-scrollbar">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                        onClick={() => {
                          setActiveIndex(index);
                          filterBooks(category);
                        }}
                      className={`py-4 px-4 lg:text-[10px] xl:text-sm 2xl:text-base 3xl:text-lg cursor-pointer items-start w-[95%] border-gray-200 border-b-[0.1px] transition-all duration-200 ${
                        index === activeIndex
                          ? "text-[#7C3AED] font-semibold"
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
            
            <div className="flex justify-start flex-wrap lg:w-[80%]  xl:w-[85%] 2xl:w-[80%] 3xl:w-[80%] px-8 overflow-auto" style={{scrollbarWidth:'none'}}>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                <div  
                  key={index}
                    onClick={() => navigate("/carddetail", { state: { course: book } })}
                    className="cursor-pointer xl:[32%] xl:w-[32%] 2xl:w-[32%] lg:mx-2 xl:mx-1 2xl:mx-1 3xl:w-[32%] 3xl:mx-2"
                  >
                    <Recard course={book} key={index} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-8 text-gray-500">
                  No books found in this category.
                </div>
              )}
        </div>       
      </section>
        )}
     </div>
          
      <div className="flex justify-center">
        <PurpleBox />
      </div>
      <WallOfLove />
      <Footer />
    </div>
  );
};
export default BooksPage;