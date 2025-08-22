import { useState, useEffect, useMemo } from "react";
import { Product } from "../components/product-results/ProductCard";
import { filterAndSortProducts, paginateProducts, sortOptions } from "../lib/productResultsUtils";

interface UseProductResultsProps {
  products: Product[];
  itemsPerPage?: number;
}

export function useProductResults({ products, itemsPerPage = 16 }: UseProductResultsProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

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

  const toggleSortOpen = () => {
    setSortOpen(prev => !prev);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
    setForceUpdate(prev => prev + 1);
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    return filterAndSortProducts(products, selectedCategories, selectedConditions, sortBy);
  }, [products, selectedCategories, selectedConditions, sortBy, forceUpdate]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    return paginateProducts(filteredAndSortedProducts, currentPage, itemsPerPage);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage, totalPages, forceUpdate]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedConditions]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return {
    // State
    selectedCategories,
    selectedConditions,
    sortBy,
    currentPage,
    sortOpen,
    totalPages,
    currentProducts,
    filteredAndSortedProducts,
    
    // Actions
    setSelectedCategories,
    setSelectedConditions,
    setSortBy: handleSortChange,
    setCurrentPage,
    setSortOpen,
    toggleCategory,
    toggleCondition,
    toggleSortOpen,
  };
}
