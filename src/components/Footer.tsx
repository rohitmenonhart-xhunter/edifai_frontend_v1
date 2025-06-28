import icon from "../Assets/EDIFAI-1.svg";
import { IoLogoFacebook } from "react-icons/io";

import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const toNavigation=useNavigate();
  return (
    <footer className="bg-white py-12  flex justify-center ">
      <div className="w-[80%] mx-20 px-4 sm:px-6 lg:px-8 w">
        <div className="flex justify-between ">
          <div className="w-[35%]">
            <div className="cursor-pointer">
              <img src={icon} className="w-[8rem]" alt="" onClick={()=>toNavigation('/')} />
              <br></br>
            </div>
            <p className="text-black-600 font-mont font-semibold">
              Corporate Head Office:{" "}
              <span className="font-normal">
                Ground Floor, C-53, Guindy Industrial Estate, Guindy, Chennai - 32, Tamil Nadu{" "}
              </span>
            </p>
            <br></br>
            <p className="text-black-600 font-mont font-semibold">
              Phone: <span className="font-normal">+91-936-303-4150</span>
            </p>
          
            <p className="text-black-600 font-mont font-semibold">
              Email: <span className="font-normal">contactus@staciacorp.com</span>
            </p>
          </div>

         <div className=" flex justify-between w-[70%] xl:w-[55%] 2xl:w-[55%] 3xl:w-[55%] ">
           <div>
            <h3 className="lg:text-base xl:text-lg 2xl:text-xl 3xl-text-2xl font-mont font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li onClick={()=>toNavigation('/')}>
                <p
                  
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Home
                </p>
              </li>
              <li onClick={()=>toNavigation('/course')}>
                <a
                  href="#"
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Courses
                </a>
              </li>
              <li onClick={()=>toNavigation('/book')}>
                <p
                  
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Books
                </p>
              </li>
              <li onClick={()=>toNavigation('/about')}>
                <p
              
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                  About Us
                </p>
              </li>
              <li onClick={()=>toNavigation('/contact')}>
                <p 
                  
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Contact Us
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="lg:text-base xl:text-lg 2xl:text-xl 3xl-text-2xl font-mont font-bold mb-4">Others</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a
                  href="https://staciacorp.com/products"
                  target="/blank"
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="https://staciacorp.com/services"
                  target="/blank"
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="https://staciacorp.com/project"
                  target="/blank"
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                 Projects
                </a>
              </li>
              
            </ul>
          </div>
          <div className="">
            <h3 className="lg:text-base xl:text-lg 2xl:text-xl 3xl-text-2xl font-mont font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-600">
              
              {/* <li>
                <a
                  href="https://staciacorp.com/about"
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                  About
                </a>
              </li> */}
              <li>
                <a
                  href="https://staciacorp.com/article"
                  target="/blank"
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Article
                </a>
              </li>
              <li>
                <a
                  href="https://staciacorp.com/career"
                  target="/blank"
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                  career
                </a>
              </li>  
              <li>
                <a
                  href="https://staciacorp.com/case-study"
                  target="/blank"
                  className="font-mont hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Casestudy
                </a>
              </li>
              
              
            </ul>
          </div>
         </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-600">
          <p>&copy; 2025 All rights reserved</p>
          <div className="flex gap-3 ">
            <p>
              <a
                href="https://www.linkedin.com/company/staciacorp/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="w-6 h-6 text-gray-900 transition-colors" />
              </a>
            </p>
            <p>
              <a href="https://x.com/StaciaCorp" target="_blank" rel="noopener noreferrer">
                <FaSquareXTwitter className="w-6 h-6 text-gray-900 transition-colors" />
              </a>
            </p>
            <p>
              <a
                href="https://www.facebook.com/staciacorp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoFacebook className="w-6 h-6 text-gray-900  transition-colors" />
              </a>
            </p>
            <p>
              <a
                href="https://www.instagram.com/stacia_corp_?igsh=MTA5MGdnZms5ZjhwMA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagramSquare className="w-6 h-6 text-gray-900 transition-colors" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;