"use client";

import React from "react";
import ProductResults from "../../product-results/page";
import { generateCourseBooksBreadcrumbs } from "../../../lib/breadcrumbUtils";

// Dynamic page for Arts degree course books
// Reuses ProductResults component with degree-specific configuration
export default function ArtsCourseBooks() {
  const breadcrumbItems = generateCourseBooksBreadcrumbs("arts");

  return (
    <ProductResults 
      breadcrumbItems={breadcrumbItems}
      pageTitle="Arts Course Books"
      productType="course-books"
      degree="arts"
    />
  );
}
