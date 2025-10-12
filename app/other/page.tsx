"use client";

import React from "react";
import ProductResults from "../product-results/page";
import { generateOtherBreadcrumbs } from "../../lib/breadcrumbUtils";

// Main "Other" results page for miscellaneous items
// Reuses ProductResults component with other-specific configuration
export default function Other() {
  const breadcrumbItems = generateOtherBreadcrumbs();

  return (
    <ProductResults 
      breadcrumbItems={breadcrumbItems}
      pageTitle="Other"
      productType="other"
    />
  );
}
