"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductGrid from "../../components/product-results/ProductGrid";
import { Product } from "../../components/product-results/ProductCard";
import { transformDatabaseProduct } from "../../lib/productResultsUtils";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        setMessage("Please enter a search term");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();
        
        const transformedProducts: Product[] = data.results.map((product: any) => 
          transformDatabaseProduct(product, "course-books")
        );

        setProducts(transformedProducts);
        setMessage(data.message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setMessage("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleProductClick = (product: Product) => {
    router.push(`/book/${product.id}`);
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="px-16 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#385684] mx-auto mb-4"></div>
              <p className="text-gray-600">Searching...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button
                onClick={handleBackToHome}
                className="px-6 py-2 bg-[#385684] text-white rounded hover:bg-[#2A4A6B] transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {message}
              </p>
            </div>

            {/* Results Grid */}
            {products.length > 0 ? (
              <ProductGrid 
                products={products} 
                onProductClick={handleProductClick} 
              />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="mb-6">
                  <svg
                    className="mx-auto h-24 w-24 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  No results found
                </h2>
                <p className="text-gray-500 mb-6 max-w-md">
                  We couldn't find any products matching "{query}". Try different keywords or browse our categories.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleBackToHome}
                    className="px-6 py-2 bg-[#385684] text-white rounded hover:bg-[#2A4A6B] transition-colors"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => router.push("/course-books")}
                    className="px-6 py-2 border border-[#385684] text-[#385684] rounded hover:bg-[#385684] hover:text-white transition-colors"
                  >
                    Browse Course Books
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}