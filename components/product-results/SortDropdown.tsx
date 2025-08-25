import React from "react";

interface SortDropdownProps {
  sortOptions: string[];
  currentSort: string;
  onSortChange: (sort: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

// Provides sorting controls for product results
// Displays current sort option and allows selection from dropdown menu
// Handles dropdown open/close state and keyboard accessibility
export default function SortDropdown({ 
  sortOptions, 
  currentSort, 
  onSortChange, 
  isOpen, 
  onToggle 
}: SortDropdownProps) {
  
  return (
    <div className="flex justify-end items-center mb-4 pr-16 relative">
      <div className="relative">
        <button
          className="border border-gray-300 px-4 py-2 rounded bg-white shadow-sm flex items-center gap-2"
          onClick={onToggle}
          aria-label="Sort products by"
        >
          Sort By: {currentSort}
          <svg 
            className="w-4 h-4 ml-1 text-gray-500"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            {isOpen ? (
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            )}
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 w-full bg-white border border-gray-300 shadow-lg z-50 mt-1">
            {sortOptions.map((option) => (
              <button
                key={option}
                type="button"
                className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer focus:bg-gray-100 focus:outline-none text-left"
                onClick={() => {
                  onSortChange(option);
                  onToggle();
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
