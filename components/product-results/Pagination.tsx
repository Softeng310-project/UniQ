import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-center items-center mt-8 space-x-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Go to previous page"
      >
        Previous
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            currentPage === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
          aria-label={`Go to page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  );
}
