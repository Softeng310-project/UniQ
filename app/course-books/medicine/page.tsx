"use client";

import React from "react";
import ProductResults from "../../product-results/page";
import { generateCourseBooksBreadcrumbs } from "../../../lib/breadcrumbUtils";

// Dynamic page for Medicine degree course books
// Reuses ProductResults component with degree-specific configuration
export default function MedicineCourseBooks() {
  const breadcrumbItems = generateCourseBooksBreadcrumbs("medicine");

  return (
    <ProductResults 
      breadcrumbItems={breadcrumbItems}
      pageTitle="Medicine Course Books"
      productType="course-books"
      degree="medicine"
    />
  );
}
