"use client";

import React from "react";
import ProductResults from "../../product-results/page";
import { generateCourseBooksBreadcrumbs } from "../../../lib/breadcrumbUtils";

// Dynamic page for Education degree course books
// Reuses ProductResults component with degree-specific configuration
export default function EducationCourseBooks() {
  const breadcrumbItems = generateCourseBooksBreadcrumbs("education");

  return (
    <ProductResults 
      breadcrumbItems={breadcrumbItems}
      pageTitle="Education Course Books"
      productType="course-books"
      degree="education"
    />
  );
}
