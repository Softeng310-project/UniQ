"use client";

import React from "react";
import ProductResults from "../product-results/page";

// Notebooks page reusing ProductResults component
// Displays notebook and pad products with filtering and sorting
export default function Notebooks() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Notebooks & Pads" } // No href = not clickable
  ];

  return (
    <ProductResults 
      breadcrumbItems={breadcrumbItems}
      pageTitle="Notebooks & Pads"
      productType="notebooks-and-pads"
    />
  );
}
