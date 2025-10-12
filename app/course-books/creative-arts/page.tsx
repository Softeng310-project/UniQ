"use client";

import React from "react";
import ProductResults from "../../product-results/page";
import { generateCourseBooksBreadcrumbs } from "../../../lib/breadcrumbUtils";

// Dynamic page for Creative Arts degree course books
// Reuses ProductResults component with degree-specific configuration
export default function CreativeArtsCourseBooks() {
  const breadcrumbItems = generateCourseBooksBreadcrumbs("creative-arts");

  return (
    <ProductResults 
      breadcrumbItems={breadcrumbItems}
      pageTitle="Creative Arts Course Books"
      productType="course-books"
      degree="creative-arts"
    />
  );
}
