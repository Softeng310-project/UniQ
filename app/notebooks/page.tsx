"use client";

import React from "react";
import ProductResults from "../product-results/page";

// Notebooks page reusing ProductResults component
// Displays notebook and pad products with filtering and sorting
export default function Notebooks() {
  return (
    <ProductResults 
      breadcrumbItems={["Home", "Notebooks & Pads"]}
      pageTitle="Notebooks & Pads"
      productType="notebooks-and-pads"
    />
  );
}
