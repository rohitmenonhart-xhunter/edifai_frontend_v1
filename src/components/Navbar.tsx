
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Menu, X, ArrowRight, LogOut, Bell, Heart, User } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const authStatus = localStorage.getItem('isAuthenticated') === 'true';
//     setIsAuthenticated(authStatus);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     setIsAuthenticated(false);
//     window.location.href = '/';
//   };

//   const navItems = [
//     { id: "home", label: "Home", path: "/" },
//     { id: "course", label: "Course", path: "/course" },
//     { id: "book", label: "Book", path: "/book" },
//     { id: "about", label: "About Us", path: "/about" },
//     { id: "contact", label: "Contact Us", path: "/contact" }
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
//       <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/" className="text-2xl font-bold text-purple-600">LOGO</Link>
//           </div>

//           {/* Navigation Links */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.id}
//                 to={item.path}
//                 className={`px-1 py-2 text-sm lg:text-xs xl:text-sm 2xl:text-base font-mont font-bold transition-colors duration-200 
//                   ${isActive(item.path)
//                     ? 'text-purple-600 font-semibold'
//                     : 'text-gray-500 hover:text-purple-600'}`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>


//           {/* Auth Buttons */}
//           <div className="flex items-center space-x-4">
//             {isAuthenticated ? (
//               <div className="flex items-center justify-center space-x-2">
//                 <Link to="/notifications">
//                   <button className="text-purple-600 border border-gray-300 rounded hover:text-purple-800 h-[100%] w-[100%] ">
//                     <Bell className="h-[100%] w-[100%] " />
//                   </button></Link>
//                 <Link to="/wishlist">
//                   <button className="text-purple-600 hover:text-purple-800 h-[100%] w-[100%] ">
//                     <Heart className="h-[100%] w-[100%] " />
//                   </button></Link>
//                 <Link to="/profile">
//                   <Button
//                     variant="outline"
//                     className="text-purple-600 text-sm lg:text-xs xl:text-sm 2xl:text-base border-purple-600 hover:bg-purple-50 hover:text-purple-700 font-medium rounded-full flex items-center justify-center"
//                   >
//                     <User className=" h-4 w-4" />
//                     View Profile
//                   </Button>
//                 </Link>
//                 <Button
//                   onClick={handleLogout}
//                   variant="outline"
//                   className="text-purple-600 text-sm lg:text-xs xl:text-sm 2xl:text-base border-purple-600 hover:bg-purple-50 hover:text-purple-700 font-medium rounded-full flex items-center justify-center"
//                 >
//                   <LogOut className=" h-4 w-4" />
//                   Logout
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <Link to="/login">
//                   <Button className="bg-white border-2  text-sm lg:text-xs xl:text-sm 2xl:text-base hover:bg-gray-300 text-[#8A63FF] font-mont font-medium rounded-full px-6 py-2 flex items-center justify-center">
//                     Log In
//                   </Button>
//                 </Link>
//                 <Link to="/signup">
//                   <Button className="bg-[#8A63FF]  text-sm lg:text-xs xl:text-sm 2xl:text-base hover:bg-[#6D28D9] text-white font-mont font-medium rounded-full px-6 py-2 flex items-center justify-center">
//                     Sign Up Now
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Heart, User, ArrowRight, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/EDIFAI-1.svg"

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "course", label: "Courses", path: "/course" },
    { id: "book", label: "Books", path: "/book" },
    { id: "about", label: "About Us", path: "/about" },
    { id: "contact", label: "Contact Us", path: "/contact" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className=" w-[90%] mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex-shrink-0 w-[33%] ">
          <Link to="/" className="lg:text-xl xl:text-2xl  3xl:text-4xl font-bold text-[#8A63FF]"><img  src={logo} className="w-[8rem] " /></Link>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center items-center lg:gap-4 xl:gap-4 2xl:gap-8 3xl:gap-14 w-[35%]  ">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`lg:text-xs xl:text-sm 2xl:text-sm 3xl:text-[1rem] font-medium ${isActive(item.path) ? 'text-[#8A63FF]' : 'text-[#474747] hover:text-[#8A63FF]'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-end justify-end space-x-4  w-[33%]">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="text-[#8A63FF]  border rounded-[50%] border-[#8A63FF] hover:text-white hover:bg-[#8A63FF]">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="text-[#8A63FF]  border rounded-[50%] border-[#8A63FF] hover:bg-[#8A63FF] hover:text-white">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="text-[#8A63FF] border-[#8A63FF] hover:bg-[#8A63FF] font-mont font-medium hover:text-white rounded-full flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </Link>

              <Button onClick={handleLogout} variant="outline" className="text-[#8A63FF] border-[#8A63FF] hover:bg-[#8A63FF] font-mont font-medium hover:text-white rounded-full flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>

            </div>
          ) : (
            <>
              <Link to="/LoginPage">
                <Button className="bg-white border-2  text-sm lg:text-xs xl:text-sm 2xl:text-base hover:bg-gray-300   text-[#8A63FF] font-mont font-medium rounded-full px-6 py-2 flex items-center justify-center">
                  Log In
                </Button>
              </Link>
              {/* <Link to="/signup">
                <Button className="bg-[#8A63FF]  text-sm lg:text-xs xl:text-sm 2xl:text-base hover:bg-[#6D28D9]  text-white font-mont font-medium rounded-full px-6 py-2 flex items-center justify-center">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link> */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;