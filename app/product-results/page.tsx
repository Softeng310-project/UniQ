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
  degree?: string;
}

// Main product results page that displays filtered and paginated product listings
// Handles API data fetching, filtering, sorting, and pagination
// Supports different product types (course books, notebooks, writing supplies)
export default function ProductResults({ 
  breadcrumbItems = ["Home", "Course Books"],
  pageTitle = "Course Books",
  productType = "course-books",
  degree
}: ProductResultsPageProps) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableMajors, setAvailableMajors] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });

  const {
    selectedCategories,
    selectedConditions,
    selectedYears,
    sortBy,
    currentPage,
    sortOpen,
    setSortBy,
    setCurrentPage,
    toggleCategory,
    toggleCondition,
    toggleYear,
    toggleSortOpen,
  } = useProductResults({ products });

  const handlePriceChange = (min: number | undefined, max: number | undefined) => {
    setMinPrice(min);
    setMaxPrice(max);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Fetch products from API with current filters and sorting
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
      
      // Add degree filter if provided
      if (degree) {
        // Convert URL degree to database degree format
        const degreeMapping: { [key: string]: string } = {
          'engineering': 'Bachelor of Engineering',
          'arts': 'Bachelor of Arts',
          'science': 'Bachelor of Science',
          'business': 'Bachelor of Commerce',
          'law': 'Bachelor of Laws',
          'medicine': 'Bachelor of Medicine',
          'education': 'Bachelor of Education'
        };
        
        const dbDegree = degreeMapping[degree] || degree;
        params.append('degree', dbDegree);
      }

      // Add price range filters
      if (minPrice !== undefined) {
        params.append('minPrice', minPrice.toString());
      }
      if (maxPrice !== undefined) {
        params.append('maxPrice', maxPrice.toString());
      }
      
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
      if (selectedYears.length > 0) {
        // Convert year strings to numbers (e.g., "1st Year" -> 1)
        const yearNumbers = selectedYears.map(year => {
          const match = year.match(/(\d+)/);
          return match ? match[1] : '1';
        });
        params.append('year', yearNumbers.join(','));
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
  }, [selectedCategories, selectedConditions, selectedYears, minPrice, maxPrice]);

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
          selectedYears={selectedYears}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onCategoryToggle={toggleCategory}
          onConditionToggle={toggleCondition}
          onYearToggle={toggleYear}
          onPriceChange={handlePriceChange}
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
