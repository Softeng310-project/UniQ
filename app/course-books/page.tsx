"use client";

import React, { use } from "react";

export default function CourseBooks() {
  const majors = [
    "Biomedical Engineering",
    "Chemical and Materials Engineering",
    "Civil Engineering",
    "Computer Systems Engineering",
    "Electrical and Electronic Engineering",
    "Engineering General",
    "Engineering Science",
    "Mechanical Engineering",
    "Mechatronics Engineering",
    "Software Engineering",
    "Structural Engineering",
  ];

  const sortOptions = [
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
  ];

  const conditions = ["New", "Used"];

  // Mock data - University coursebooks
  const mockBooks = [
    { id: 1, title: "Calculus: Early Transcendentals", author: "James Stewart", price: 89.99, condition: "New", major: "Engineering General", image: "/assets/book1.jpg" },
    { id: 2, title: "Introduction to Algorithms", author: "Thomas H. Cormen", price: 75.50, condition: "Used", major: "Software Engineering", image: "/assets/book2.jpg" },
    { id: 3, title: "Mechanics of Materials", author: "Russell C. Hibbeler", price: 95.25, condition: "New", major: "Mechanical Engineering", image: "/assets/book3.jpg" },
    { id: 4, title: "Electric Circuits", author: "James W. Nilsson", price: 82.75, condition: "Used", major: "Electrical and Electronic Engineering", image: "/assets/book4.jpg" },
    { id: 5, title: "Structural Analysis", author: "R.C. Hibbeler", price: 105.00, condition: "New", major: "Civil Engineering", image: "/assets/book5.jpg" },
    { id: 6, title: "Clean Code", author: "Robert C. Martin", price: 42.99, condition: "Used", major: "Software Engineering", image: "/assets/book6.jpg" },
    { id: 7, title: "Biomechanics", author: "Y.C. Fung", price: 128.50, condition: "New", major: "Biomedical Engineering", image: "/assets/book7.jpg" },
    { id: 8, title: "Chemical Engineering Design", author: "Ray Sinnott", price: 91.25, condition: "Used", major: "Chemical and Materials Engineering", image: "/assets/book8.jpg" },
    { id: 9, title: "Steel Design", author: "William T. Segui", price: 79.99, condition: "New", major: "Structural Engineering", image: "/assets/book9.jpg" },
    { id: 10, title: "Control Systems Engineering", author: "Norman S. Nise", price: 113.00, condition: "Used", major: "Mechatronics Engineering", image: "/assets/book10.jpg" },
    { id: 11, title: "Computer Organization and Design", author: "David A. Patterson", price: 68.75, condition: "New", major: "Computer Systems Engineering", image: "/assets/book11.jpg" },
    { id: 12, title: "Engineering Design Process", author: "Yousef Haik", price: 72.50, condition: "Used", major: "Engineering Science", image: "/assets/book12.jpg" },
    { id: 13, title: "Linear Algebra and Its Applications", author: "Gilbert Strang", price: 84.25, condition: "New", major: "Engineering General", image: "/assets/book13.jpg" },
    { id: 14, title: "Data Structures and Algorithms", author: "Michael T. Goodrich", price: 59.99, condition: "Used", major: "Software Engineering", image: "/assets/book14.jpg" },
    { id: 15, title: "Fluid Mechanics", author: "Frank M. White", price: 96.75, condition: "New", major: "Mechanical Engineering", image: "/assets/book15.jpg" },
    { id: 16, title: "Microelectronic Circuits", author: "Adel S. Sedra", price: 85.50, condition: "Used", major: "Electrical and Electronic Engineering", image: "/assets/book16.jpg" },
    { id: 17, title: "Construction Planning and Scheduling", author: "Jimmie W. Hinze", price: 78.25, condition: "New", major: "Civil Engineering", image: "/assets/book17.jpg" },
    { id: 18, title: "Database System Concepts", author: "Abraham Silberschatz", price: 71.00, condition: "Used", major: "Software Engineering", image: "/assets/book18.jpg" },
    { id: 19, title: "Biomaterials Science", author: "Buddy D. Ratner", price: 132.99, condition: "New", major: "Biomedical Engineering", image: "/assets/book19.jpg" },
    { id: 20, title: "Physical Chemistry", author: "Peter Atkins", price: 87.75, condition: "Used", major: "Chemical and Materials Engineering", image: "/assets/book20.jpg" },
    { id: 21, title: "Concrete Design", author: "Edward G. Nawy", price: 101.50, condition: "New", major: "Structural Engineering", image: "/assets/book21.jpg" },
    { id: 22, title: "Robotics: Control, Sensing, Vision", author: "Fu, Gonzalez & Lee", price: 119.25, condition: "Used", major: "Mechatronics Engineering", image: "/assets/book22.jpg" },
    { id: 23, title: "Computer Networks", author: "Andrew S. Tanenbaum", price: 63.99, condition: "New", major: "Computer Systems Engineering", image: "/assets/book23.jpg" },
    { id: 24, title: "Engineering Ethics", author: "Charles E. Harris", price: 45.50, condition: "Used", major: "Engineering Science", image: "/assets/book24.jpg" },
    { id: 25, title: "Differential Equations", author: "Dennis G. Zill", price: 76.99, condition: "New", major: "Engineering General", image: "/assets/book25.jpg" },
    { id: 26, title: "Software Engineering", author: "Roger S. Pressman", price: 88.75, condition: "Used", major: "Software Engineering", image: "/assets/book26.jpg" },
    { id: 27, title: "Machine Design", author: "Robert L. Norton", price: 124.00, condition: "New", major: "Mechanical Engineering", image: "/assets/book27.jpg" },
    { id: 28, title: "Signals and Systems", author: "Alan V. Oppenheim", price: 92.25, condition: "Used", major: "Electrical and Electronic Engineering", image: "/assets/book28.jpg" },
    { id: 29, title: "Geotechnical Engineering", author: "Braja M. Das", price: 97.50, condition: "New", major: "Civil Engineering", image: "/assets/book29.jpg" },
    { id: 30, title: "Design Patterns", author: "Erich Gamma", price: 54.99, condition: "Used", major: "Software Engineering", image: "/assets/book30.jpg" },
    { id: 31, title: "Medical Instrumentation", author: "John G. Webster", price: 145.75, condition: "New", major: "Biomedical Engineering", image: "/assets/book31.jpg" },
    { id: 32, title: "Transport Phenomena", author: "R. Byron Bird", price: 103.25, condition: "Used", major: "Chemical and Materials Engineering", image: "/assets/book32.jpg" },
  ];

  const [selectedMajors, setSelectedMajors] = React.useState<string[]>([
  ]);
  const [selectedConditions, setSelectedConditions] = React.useState<string[]>([]);
  const [sortOpen, setSortOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState(sortOptions[0]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 16;

  const toggleMajor = (major: string) => {
    setSelectedMajors((prev) =>
      prev.includes(major)
        ? prev.filter((m) => m !== major)
        : [...prev, major]
    );
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  // Filter and sort books
  const filteredAndSortedBooks = React.useMemo(() => {
    let filtered = mockBooks;

    // Filter by selected majors
    if (selectedMajors.length > 0) {
      filtered = filtered.filter(book => selectedMajors.includes(book.major));
    }

    // Filter by selected conditions
    if (selectedConditions.length > 0) {
      filtered = filtered.filter(book => selectedConditions.includes(book.condition));
    }

    // Sort books
    switch (sortBy) {
      case "Alphabetically, A-Z":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case "Alphabetically, Z-A":
        return filtered.sort((a, b) => b.title.localeCompare(a.title));
      case "Price, low to high":
        return filtered.sort((a, b) => a.price - b.price);
      case "Price, high to low":
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  }, [selectedMajors, selectedConditions, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = filteredAndSortedBooks.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedMajors, selectedConditions, sortBy]);

  // Scroll to top when page changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="pl-16 py-6 text-sm text-[#2A4163]">
        Home &gt; Course Books &gt; Engineering &gt; 2nd Year
        <h1 className="text-4xl pt-4 pb-4">Engineering: 2nd Year</h1>
      </div>

      {/* Sort */}
      <div className="flex justify-end items-center mb-4 pr-16 relative">

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            className="border border-gray-300 px-4 py-2 rounded bg-white shadow-sm flex items-center gap-2"
            onClick={() => setSortOpen((prev) => !prev)}
          >
            Sort By: {sortBy}
            <svg 
              className="w-4 h-4 ml-1 text-gray-500"
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              {sortOpen ? (
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              )}
            </svg>
          </button>
          <ul className={`absolute right-0 w-full bg-white border border-gray-300 shadow-lg z-50 transition-all duration-200 ease-in-out transform origin-top ${
            sortOpen 
              ? 'opacity-100 scale-y-100' 
              : 'opacity-0 scale-y-0 pointer-events-none'
          }`}>
              {sortOptions.map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSortBy(option);
                    setSortOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-16 pr-16 pb-12 flex">
        {/* Sidebar */}
        <aside className="w-65 pr-6">
          <div className="mb-6">
            <h2 className="font-light text-[#556C8E] mb-2 text-xl">Majors</h2>
            <div className="space-y-1">
              {majors.map((major) => (
                <label key={major} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedMajors.includes(major)}
                    onChange={() => toggleMajor(major)}
                    className="h-6 w-6 text-blue-600 border-gray-400 border rounded checked:bg-blue-400 checked:border-blue-400 appearance-none"
                  />
                  <span className="text-[#556C8E] font-mandali">{major}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-light text-[#4D6890] mb-2 text-xl">Condition</h2>
            <div className="space-y-1">
              {conditions.map((condition) => (
                <label key={condition} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedConditions.includes(condition)}
                    onChange={() => toggleCondition(condition)}
                    className="h-6 w-6 text-blue-600 border-gray-400 border rounded checked:bg-blue-400 checked:border-blue-400 appearance-none"
                  />
                  <span className="text-[#556C8E] font-mandali">{condition}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main section */}
        <main className="flex-1">

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {currentBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white cursor-pointer"
              >
                <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Book Cover</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 truncate">{book.title}</h3>
                  <p className="text-gray-600 text-xs mb-2">{book.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-semibold">${book.price}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      book.condition === 'New' ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {book.condition}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 border rounded ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
