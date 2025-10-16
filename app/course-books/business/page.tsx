"use client";

import React from "react";
import ProductResults from "../../product-results/page";
import { generateCourseBooksBreadcrumbs } from "../../../lib/breadcrumbUtils";

// Dynamic page for Business degree course books
// Reuses ProductResults component with degree-specific configuration
export default function BusinessCourseBooks() {
  const breadcrumbItems = generateCourseBooksBreadcrumbs("business");

  return (
    <ProductResults 
      breadcrumbItems={breadcrumbItems}
      pageTitle="Business Course Books"
      productType="course-books"
      degree="business"
    />
  );
}
