"use client";

import React from "react";
import ProductResults from "../product-results/page";

export default function CourseBooks() {
  return (
    <ProductResults 
      breadcrumbItems={["Home", "Course Books", "Engineering"]}
      pageTitle="Engineering Course Books"
      productType="course-books"
    />
  );
}
