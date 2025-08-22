"use client";

import React from "react";
import Breadcrumb from "../../components/product-results/Breadcrumb";
import SortDropdown from "../../components/product-results/SortDropdown";
import FilterSidebar from "../../components/product-results/FilterSidebar";
import ProductGrid from "../../components/product-results/ProductGrid";
import Pagination from "../../components/product-results/Pagination";
import { Product } from "../../components/product-results/ProductCard";
import { useProductResults } from "../../hooks/useProductResults";
import { engineeringMajors, conditions, sortOptions, mockCourseBooks } from "../../lib/productResultsUtils";

interface CourseBooksPageProps {
  // Props for dynamic content
  breadcrumbItems?: string[];
  pageTitle?: string;
  products?: Product[];
}

export default function CourseBooks({ 
  breadcrumbItems = ["Home", "Course Books", "Engineering", "2nd Year"],
  pageTitle = "Engineering: 2nd Year",
  products = mockCourseBooks
}: CourseBooksPageProps) {
  
  const {
    selectedCategories,
    selectedConditions,
    sortBy,
    currentPage,
    sortOpen,
    totalPages,
    currentProducts,
    setSortBy,
    setCurrentPage,
    toggleCategory,
    toggleCondition,
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

      {/* Main content */}
      <div className="pl-16 pr-16 pb-12 flex">
        {/* Sidebar */}
        <FilterSidebar
          categories={engineeringMajors}
          conditions={conditions}
          selectedCategories={selectedCategories}
          selectedConditions={selectedConditions}
          onCategoryToggle={toggleCategory}
          onConditionToggle={toggleCondition}
          categoryLabel="Majors"
        />

        {/* Main section */}
        <main className="flex-1">
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
    </div>
  );
}
