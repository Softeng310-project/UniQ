"use client";

import React from "react";
import ProductResults from "../../product-results/page";
import { generateCourseBooksBreadcrumbs } from "../../../lib/breadcrumbUtils";

// Dynamic page for Science degree course books
// Reuses ProductResults component with degree-specific configuration
export default function ScienceCourseBooks() {
  const breadcrumbItems = generateCourseBooksBreadcrumbs("science");

  return (
    <ProductResults 
      breadcrumbItems={breadcrumbItems}
      pageTitle="Science Course Books"
      productType="course-books"
      degree="science"
    />
  );
}
