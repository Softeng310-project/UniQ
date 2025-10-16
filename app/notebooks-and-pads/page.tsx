"use client";

import React from "react";
import ProductResults from "../product-results/page";
import { generateNotebooksBreadcrumbs } from "../../lib/breadcrumbUtils";

// Main notebooks & pads results page
// Reuses ProductResults component with notebooks-specific configuration
export default function NotebooksAndPads() {
  const breadcrumbItems = generateNotebooksBreadcrumbs();

  return (
    <ProductResults 
      breadcrumbItems={breadcrumbItems}
      pageTitle="Notebooks & Pads"
      productType="notebooks-and-pads"
    />
  );
}
