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

  const [selectedMajors, setSelectedMajors] = React.useState<string[]>([
  ]);
  const [sortOpen, setSortOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState(sortOptions[0]);

  const toggleMajor = (major: string) => {
    setSelectedMajors((prev) =>
      prev.includes(major)
        ? prev.filter((m) => m !== major)
        : [...prev, major]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="pl-16 py-6 text-sm text-[#2A4163]">
        Home &gt; Course Books &gt; Engineering &gt; 2nd Year
        <h1 className="text-4xl pt-4 pb-4">Engineering: 2nd Year</h1>
      </div>

      {/* Sort */}
      <div className="flex justify-end items-center mb-4 mr-28 relative">

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            className="border border-gray-300 px-4 py-2 rounded bg-white shadow-sm"
            onClick={() => setSortOpen((prev) => !prev)}
          >
            Sort By: {sortBy}
          </button>
          {sortOpen && (
            <ul className="absolute right-0 w-60 bg-white border border-gray-300 shadow-lg z-50">
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
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-12 flex">
        {/* Sidebar */}
        <aside className="w-65 pr-6">
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Majors</h2>
            <div className="space-y-1">
              {majors.map((major) => (
                <label key={major} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedMajors.includes(major)}
                    onChange={() => toggleMajor(major)}
                  />
                  <span>{major}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Condition</h2>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>New</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Used</span>
            </label>
          </div>
        </aside>

        {/* Main section */}
        <main className="flex-1">

          {/* Grid */}
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-48 bg-gray-200 rounded"
              ></div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
