"use client";

import React from "react";
import ProductResults from "../product-results/page";
import { generateWritingSuppliesBreadcrumbs } from "../../lib/breadcrumbUtils";

// Main writing supplies results page
// Reuses ProductResults component with writing supplies-specific configuration
export default function WritingSupplies() {
  const breadcrumbItems = generateWritingSuppliesBreadcrumbs();

  return (
    <ProductResults 
      breadcrumbItems={breadcrumbItems}
      pageTitle="Writing Supplies"
      productType="writing-supplies"
    />
  );
}
