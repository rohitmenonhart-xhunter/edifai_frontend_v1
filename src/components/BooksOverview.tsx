import React from 'react';

const BookCard = ({ image, title, author, rating, reviews }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
    <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-2">{author}</p>
    <div className="flex items-center mb-2">
      <span className="text-yellow-500 text-lg">{'★'.repeat(rating)}</span>
      <span className="text-gray-300 text-lg">{'★'.repeat(5 - rating)}</span>
      <span className="ml-2 text-sm text-gray-600">({reviews} reviews)</span>
    </div>
    <button className="mt-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">View Book</button>
  </div>
);

const BooksOverview = () => {
  const books = [
    {
      image: 'https://via.placeholder.com/150',
      title: 'The Lean Startup',
      author: 'Eric Ries',
      rating: 4,
      reviews: 120
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Atomic Habits',
      author: 'James Clear',
      rating: 5,
      reviews: 250
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      rating: 4,
      reviews: 180
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Educated',
      author: 'Tara Westover',
      rating: 5,
      reviews: 300
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'The Power of Habit',
      author: 'Charles Duhigg',
      rating: 4,
      reviews: 150
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      rating: 5,
      reviews: 200
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Books (6)</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search in your books.."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <svg
              className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <button className="flex items-center px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4h13M3 8h9m-9 4h9m5-4a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            Sort By
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button className="px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold">All Books</button>
        <button className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">My Library</button>
        <button className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">Wishlist</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <BookCard key={index} {...book} />
        ))}
      </div>
    </div>
  );
};

export default BooksOverview;