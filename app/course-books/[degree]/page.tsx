"use client";

import React from "react";
import ProductResults from "../../product-results/page";

interface CourseBooksDegreePageProps {
  params: {
    degree: string;
  };
}

export default function CourseBooksDegree({ params }: CourseBooksDegreePageProps) {
  // Convert degree from URL format to display format
  const formatDegree = (degree: string) => {
    return degree
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const degreeName = formatDegree(params.degree);
  
  return (
    <ProductResults 
      breadcrumbItems={["Home", "Course Books", degreeName]}
      pageTitle={`${degreeName} Course Books`}
      productType="course-books"
      degree={params.degree}
    />
  );
}
