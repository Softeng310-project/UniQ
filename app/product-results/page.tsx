"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "../../components/product-results/Breadcrumb";
import SortDropdown from "../../components/product-results/SortDropdown";
import FilterSidebar from "../../components/product-results/FilterSidebar";
import ProductGrid from "../../components/product-results/ProductGrid";
import Pagination from "../../components/product-results/Pagination";
import { Product } from "../../components/product-results/ProductCard";
import { useProductResults } from "../../hooks/useProductResults";
import { conditions, sortOptions, transformDatabaseProduct, getProductTypeConfig, ProductType } from "../../lib/productResultsUtils";

interface ProductResultsPageProps {
  // Props for dynamic content
  breadcrumbItems?: string[];
  pageTitle?: string;
  productType?: ProductType;
}

export default function ProductResults({ 
  breadcrumbItems = ["Home", "Course Books"],
  pageTitle = "Course Books",
  productType = "course-books"
}: ProductResultsPageProps) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableMajors, setAvailableMajors] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });

  const {
    selectedCategories,
    selectedConditions,
    sortBy,
    currentPage,
    sortOpen,
    setSortBy,
    setCurrentPage,
    toggleCategory,
    toggleCondition,
    toggleSortOpen,
  } = useProductResults({ products });

  // Fetch products from API
  const fetchProducts = async (isFilterChange = false) => {
    if (isFilterChange) {
      setFilterLoading(true);
    } else {
      setLoading(true);
    }
    try {
      const params = new URLSearchParams();
      params.append('type', productType);
      params.append('page', currentPage.toString());
      params.append('limit', '12');
      
      // Add sort parameter
      switch (sortBy) {
        case "Alphabetically, A-Z":
          params.append('sortBy', 'title');
          break;
        case "Alphabetically, Z-A":
          params.append('sortBy', 'title-desc');
          break;
        case "Price, low to high":
          params.append('sortBy', 'price');
          break;
        case "Price, high to low":
          params.append('sortBy', 'price-desc');
          break;
      }

      // Add filter parameters
      if (selectedCategories.length > 0) {
        params.append('category', selectedCategories.join(','));
      }
      if (selectedConditions.length > 0) {
        params.append('condition', selectedConditions.join(','));
      }

      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      
      // Transform database products to match Product interface
      const transformedProducts: Product[] = data.products.map((product: any) => 
        transformDatabaseProduct(product, productType)
      );

      setProducts(transformedProducts);
      setPagination(data.pagination);
      setAvailableCategories(data.filters.categories || []);
      setAvailableMajors(data.filters.majors || []);
      setAvailableYears(data.filters.years || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      if (isFilterChange) {
        setFilterLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  // Fetch products when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortBy, productType]);

  // Debounced filter effect to prevent excessive API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts(true); // Mark as filter change
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [selectedCategories, selectedConditions]);

  const handleProductClick = (product: Product) => {
    // Navigate to product detail page
    const config = getProductTypeConfig(productType);
    window.location.href = `${config.detailRoute}/${product.id}`;
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

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
          categories={availableCategories}
          conditions={conditions}
          selectedCategories={selectedCategories}
          selectedConditions={selectedConditions}
          onCategoryToggle={toggleCategory}
          onConditionToggle={toggleCondition}
          categoryLabel={getProductTypeConfig(productType).categoryLabel}
        />

        {/* Main section */}
        <main className="flex-1">
          {/* Results count */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {products.length} of {pagination.totalItems} products
            {filterLoading && <span className="ml-2 text-orange-600">(Updating...)</span>}
          </div>

          {/* Grid */}
          <ProductGrid 
            key={`${sortBy}-${currentPage}`}
            products={products} 
            onProductClick={handleProductClick} 
          />

          {/* Pagination */}
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}
