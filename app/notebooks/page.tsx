"use client";

import React from "react";
import ProductResults from "../product-results/page";

export default function Notebooks() {
  return (
    <ProductResults 
      breadcrumbItems={["Home", "Notebooks"]}
      pageTitle="Notebooks"
      productType="notebooks"
    />
  );
}
