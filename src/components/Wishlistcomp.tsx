import React from 'react';
import bin from '../Assets/delete.svg';
import { Link } from "react-router-dom";

const Wishlist: React.FC = () => {
    const courses = [
        {
            title: "The Ultimate Drawing Course - Beginner to Advanced",
            instructors: "Harry Potter + John Wick",
            rating: 4.6,
            reviews: "13,664",
            price: 837.00,
            originalPrice: 849.00,
            image: "/placeholder.svg",
        },
        {
            title: "Digital Marketing Masterclass - 23 Courses in 1",
            instructors: "Nobody",
            rating: 4.8,
            reviews: "8,974",
            price: 24.00,
            originalPrice: null,
            image: "/placeholder.svg",
        },
        {
            title: "Angular: The Complete Guide [2021 Edition]",
            instructors: "Kelvin Gilbert",
            rating: 4.7,
            reviews: "10,214",
            price: 183.00,
            originalPrice: null,
            image: "/placeholder.svg",
        },
    ];

    return (
        <div className="w-2/3 mx-auto px-10 py-16  space-y-10">
            {/* Profile Section */}
            <div className="flex items-center p-10 bg-white shadow-md rounded-lg mb-4 ">
                <img
                    src="/placeholder.svg"
                    alt="Profile"
                    className="w-[10%] h-[10%] rounded-full mr-4"
                />
                <div className='space-y-4'>
                    <h2 className="text-lg font-semibold text-gray-800">Jack Jackson</h2>
                    <p className="text-sm text-gray-500 ">Web Designer & Best-Selling Instructor
                        {/* <a href="#" className="text-sm text-purple-600 hover:underline">
                            view profile
                        </a> */}
                        <Link to="/profile" className="text-sm text-purple-600 hover:underline pl-2">
                            view profile
                        </Link>
                    </p>


                </div>
            </div>

            {/* Wishlist Section */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">WISHLIST [3]</h3>
                <div className="grid grid-cols-3 gap-56 font-semibold text-gray-600 text-sm mb-2 border p-5 border-gray-400">
                    <div className="text-left">COURSE</div>
                    <div className="text-right">PRICES</div>
                    <div className=" text-left">ACTION</div>
                </div>
                <div className="space-y-4 ">
                    {courses.map((course, index) => (
                        <div key={index} className="flex items-center justify-between lg:col-span-3 xl:col-span-3 2xl:col-span-3 bg-white p-4 rounded-lg shadow-sm space-x-10">
                            {/* <img
                                src={course.image}
                                alt={course.title}
                                className="w-24 h-16 object-cover rounded mr-4"
                            /> */}
                            <div className="flex w-2/5">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-24 h-16 object-cover rounded mr-4"
                                />
                                <div className='space-y-4 '>
                                    <div className="flex items-center text-xs text-gray-600">
                                        <span className="text-yellow-400 mr-1">★</span>
                                        {course.rating} ({course.reviews})
                                    </div>
                                    <div className='space-y-8 w-2/3'>
                                        <h4 className="text-sm font-semibold text-gray-800">{course.title}</h4>

                                        <div >
                                            <p className="text-xs text-gray-500">Couses by: {course.instructors}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-purple-600">
                                    ${course.price.toFixed(2)}
                                    {course.originalPrice && (
                                        <span className="text-xs text-gray-400 line-through ml-1">
                                            ${course.originalPrice.toFixed(2)}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-end space-x-2 ml-4">
                                <button className=" text-purple-600 px-4 py-2 rounded text-sm bg-gray-100 hover:bg-purple-50">
                                    Buy Now
                                </button>

                                <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700">
                                    Add To Cart
                                </button>

                                <button className=" text-purple-600 px-4 py-2 rounded text-sm bg-gray-100 hover:bg-purple-50">
                                    <img src={bin} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;