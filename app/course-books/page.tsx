"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Breadcrumb from "../../components/product-results/Breadcrumb";

// Course books landing page displaying degree categories
// Allows users to browse course books by university degree programs
export default function CourseBooks() {
  const router = useRouter();
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Course Books" } // No href = not clickable
  ];
  const pageTitle = "Course Books";

  const degrees = [
    { name: "Arts", image: "/assets/uoa_textbooks_arts.webp" },
    { name: "Business and Economics", image: "/assets/uoa_business_textbooks.webp" }, 
    { name: "Creative Arts and Industries", image: "/assets/uoa_textbooks_fine_arts.webp" },
    { name: "Education and Social Work", image: "/assets/uoa_education_textbooks.webp" },
    { name: "Engineering", image: "/assets/uoa_textbooks_engineering.webp" },
    { name: "Law", image: "/assets/uoa_law_textbooks.webp" },
    { name: "Medicine & Health Science", image: "/assets/uoa_medicine_textbook.webp" },
    { name: "Science", image: "/assets/uoa_science_textbooks.webp" }
  ];

  const handleDegreeClick = (degree: string) => {
    // Convert degree name to URL format
    const urlPath = degree.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
    router.push(`/course-books/${urlPath}`);
  };

  // Handles keyboard accessibility, so you can tab through the boxes
  const handleKeyDown = (e: React.KeyboardEvent, degree: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDegreeClick(degree);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} title={pageTitle} />
      
      <div className="py-14">
        {/* Title with underline */}
        <div className="text-center mb-12">
        <h1 className="text-2xl font-semibold text-gray-800 inline-block border-b-2 border-gray-300 pb-2">
          Shop by Degree
        </h1>
      </div>

      {/* 2x4 Grid of degree boxes with full width padding */}
      <div className="px-10">
        <div className="grid grid-cols-4 grid-rows-2 gap-6 w-full">
          {degrees.map((degree, index) => (
            <div
              // keyboard accessible boxes
              key={index}
              onClick={() => handleDegreeClick(degree.name)}
              onKeyDown={(e) => handleKeyDown(e, degree.name)}
              tabIndex={0}
              role="button"
              aria-label={`Browse ${degree.name} course books`}
              className="relative w-full h-64 cursor-pointer rounded-lg overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {/* Background Image */}
              <Image
                src={degree.image}
                alt={degree.name}
                fill
                className="object-cover"
                style={{ pointerEvents: "none" }}
              />

              {/* Color overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "#000000",
                  opacity: 0.4,
                }}
              ></div>

              {/* Title box */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4 py-2 rounded">
                  <span className="text-white text-xl font-bold text-center">
                    {degree.name.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
