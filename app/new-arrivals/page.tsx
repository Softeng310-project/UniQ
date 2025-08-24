"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/product-results/Breadcrumb";
import SortDropdown from "../../components/product-results/SortDropdown";
import ProductGrid from "../../components/product-results/ProductGrid";
import Pagination from "../../components/product-results/Pagination";
import { Product } from "../../components/product-results/ProductCard";
import { sortOptions } from "../../lib/productResultsUtils";
import { useProductResults } from "../../hooks/useProductResults";

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const breadcrumbItems = ["Home", "New Arrivals"];
  const pageTitle = "New Arrivals";

  useEffect(() => {
    fetch("/api/books/newest?limit=16")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const {
    sortBy,
    currentPage,
    sortOpen,
    totalPages,
    currentProducts,
    setSortBy,
    setCurrentPage,
    toggleSortOpen,
  } = useProductResults({ products });

  const handleProductClick = (product: Product) => {
    // TODO: Navigate to product detail page
    console.log('Navigate to product:', product.id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} title={pageTitle} />

      {/* Sort */}
      <SortDropdown
        sortOptions={sortOptions}
        currentSort={sortBy}
        onSortChange={setSortBy}
        isOpen={sortOpen}
        onToggle={toggleSortOpen}
      />

      {/* Main section */}
      <main className="flex-1 px-16 pb-12">
        {/* Grid */}
        <ProductGrid
          key={`${sortBy}-${currentPage}`}
          products={currentProducts}
          onProductClick={handleProductClick}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div> 
  );
}