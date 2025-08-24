"use client";

import { useRouter } from "next/navigation";

export default function CourseBooks() {
  const router = useRouter();

  const degrees = [
    "Arts",
    "Business and Economics", 
    "Creative Arts and Industries",
    "Education and Social Work",
    "Engineering",
    "Law",
    "Medicine & Health Science",
    "Science"
  ];

  const handleDegreeClick = (degree: string) => {
    // Convert degree name to URL-friendly format
    const urlPath = degree.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
    router.push(`/course-books/${urlPath}`);
  };

  return (
    <div className="min-h-screen bg-white py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title with underline */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-gray-800 inline-block border-b-2 border-gray-300 pb-2">
            Shop by Degree
          </h1>
        </div>

        {/* 2x4 Grid of degree boxes */}
        <div className="grid grid-cols-4 grid-rows-2 gap-6 w-full">
          {degrees.map((degree, index) => (
            <div
              key={index}
              onClick={() => handleDegreeClick(degree)}
              className="bg-orange-100 hover:bg-orange-200 transition-colors duration-200 cursor-pointer rounded-lg p-8 flex items-center justify-center min-h-64"
            >
              <span className="text-gray-700 font-medium text-center text-L leading-tight">
                {degree}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
