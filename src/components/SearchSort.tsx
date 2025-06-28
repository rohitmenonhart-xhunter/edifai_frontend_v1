// SearchAndSort.tsx
import React, { useState } from 'react';
import { ChevronDown, Search, SortAsc } from 'lucide-react';

const sortOptions = ['A-Z', 'Z-A', 'New-Old', 'Old-New'];

const SearchAndSort: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>('Sort By');

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setSortOpen(false);
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Search in your courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => setSortOpen(!sortOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm hover:bg-gray-50"
        >
          <SortAsc className="w-4 h-4" />
          <span className="text-sm">{selectedSort}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {sortOpen && (
          <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            {sortOptions.map((option) => (
              <li
                key={option}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSortSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchAndSort;
