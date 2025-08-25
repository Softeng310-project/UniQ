import { useState, useEffect, useMemo } from "react";
import { Product } from "../components/product-results/ProductCard";
import { filterAndSortProducts, paginateProducts, sortOptions } from "../lib/productResultsUtils";

interface UseProductResultsProps {
  products: Product[];
  itemsPerPage?: number;
}

// Main hook for managing product results state and interactions
// Handles filtering, sorting, pagination, and UI state for product listings
// Provides all necessary state and actions for product results pages
export function useProductResults({ products, itemsPerPage = 16 }: UseProductResultsProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Toggle functions for multi-select filters
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const toggleYear = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year)
        ? prev.filter((y) => y !== year)
        : [...prev, year]
    );
  };

  const toggleSortOpen = () => {
    setSortOpen(prev => !prev);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
    setForceUpdate(prev => prev + 1);
  };

  // Filter and sort products based on current selections
  const filteredAndSortedProducts = useMemo(() => {
    return filterAndSortProducts(products, selectedCategories, selectedConditions, selectedYears, sortBy);
  }, [products, selectedCategories, selectedConditions, selectedYears, sortBy, forceUpdate]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    return paginateProducts(filteredAndSortedProducts, currentPage, itemsPerPage);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage, totalPages, forceUpdate]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedConditions, selectedYears]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return {
    // State
    selectedCategories,
    selectedConditions,
    selectedYears,
    sortBy,
    currentPage,
    sortOpen,
    totalPages,
    currentProducts,
    filteredAndSortedProducts,
    
    // Actions
    setSelectedCategories,
    setSelectedConditions,
    setSelectedYears,
    setSortBy: handleSortChange,
    setCurrentPage,
    setSortOpen,
    toggleCategory,
    toggleCondition,
    toggleYear,
    toggleSortOpen,
  };
}
