"use client";

import React from "react";
import ProductResults from "../../product-results/page";
import { generateCourseBooksBreadcrumbs } from "../../../lib/breadcrumbUtils";

// Dynamic page for Law degree course books
// Reuses ProductResults component with degree-specific configuration
export default function LawCourseBooks() {
  const breadcrumbItems = generateCourseBooksBreadcrumbs("law");

  return (
    <ProductResults 
      breadcrumbItems={breadcrumbItems}
      pageTitle="Law Course Books"
      productType="course-books"
      degree="law"
    />
  );
}
