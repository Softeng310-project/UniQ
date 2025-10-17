import { Product } from "@/components/product-results/ProductCard";

// Sort options with better type safety
export const sortOptions = [
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date added, newest to oldest",
  "Date added, oldest to newest",
] as const;

export const conditions = ["New", "Used"] as const;

// Type definitions for better type safety
export type SortOption = typeof sortOptions[number];
export type Condition = typeof conditions[number];

// Configuration for different product types (course books, notebooks & pads, writing supplies)
// Defines breadcrumbs, category labels, routes, and image prefixes for each type
export const PRODUCT_TYPES = {
  'course-books': {
    name: 'Course Books',
    breadcrumb: ['Home', 'Course Books'],
    categoryLabel: 'Majors',
    detailRoute: '/book',
    imagePrefix: '/assets/book'
  },
  'notebooks-and-pads': {
    name: 'Notebooks & Pads',
    breadcrumb: ['Home', 'Notebooks & Pads'],
    categoryLabel: 'Types',
    detailRoute: '/notebooks-and-pads',
    imagePrefix: '/assets/notebook'
  },
  'writing-supplies': {
    name: 'Writing Supplies',
    breadcrumb: ['Home', 'Writing Supplies'],
    categoryLabel: 'Categories',
    detailRoute: '/writing-supplies',
    imagePrefix: '/assets/writing'
  },
  'other': {
    name: 'Other',
    breadcrumb: ['Home', 'Other'],
    categoryLabel: 'Categories',
    detailRoute: '/other',
    imagePrefix: '/assets/other'
  }
} as const;

export type ProductType = keyof typeof PRODUCT_TYPES;

// Core filtering and sorting logic for product results
// Applies category, condition, and year filters, then sorts by selected criteria
export function filterAndSortProducts(
  products: Product[],
  selectedCategories: string[],
  selectedConditions: string[],
  selectedYears: string[],
  sortBy: SortOption,
): Product[] {
  // Early return for empty products
  if (!products || products.length === 0) {
    return [];
  }

  let filtered = products;

  // Filter by selected categories
  if (selectedCategories.length > 0) {
    filtered = filtered.filter(product =>
      product.category && selectedCategories.includes(product.category)
    );
  }

  // Filter by selected conditions
  if (selectedConditions.length > 0) {
    filtered = filtered.filter(product =>
      product.condition && selectedConditions.includes(product.condition)
    );
  }

  // Filter by selected years
  if (selectedYears.length > 0) {
    filtered = filtered.filter(product => {
      const productYear = product.year;
      if (!productYear) return false;

      return selectedYears.some(selectedYear => {
        const yearNumber = extractYearNumber(selectedYear);
        return productYear === yearNumber;
      });
    });
  }

  // Sort products using separate function for better maintainability
  return sortProducts(filtered, sortBy);
}

// Separate sorting function for better testability and reusability
export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sortedProducts = [...products]; // Create a copy to avoid mutating original array

  switch (sortBy) {
    case "Alphabetically, A-Z":
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    case "Alphabetically, Z-A":
      return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    case "Price, low to high":
      return sortedProducts.sort((a, b) => a.price - b.price);
    case "Price, high to low":
      return sortedProducts.sort((a, b) => b.price - a.price);
    case "Date added, newest to oldest":
      return sortedProducts.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    case "Date added, oldest to newest":
      return sortedProducts.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    default:
      return sortedProducts;
  }
}

// Helper function to extract year number from year string (e.g., "1st Year" -> 1)
function extractYearNumber(yearString: string): number {
  const regex = /(\d+)/;
  const match = regex.exec(yearString);
  return match ? parseInt(match[1]) : 0;
}

// Splits product array into pages for pagination
export function paginateProducts(products: Product[], currentPage: number, itemsPerPage: number): Product[] {
  // Validate inputs
  if (!products || products.length === 0) {
    return [];
  }

  if (currentPage < 1 || itemsPerPage < 1) {
    console.warn('Invalid pagination parameters: page and itemsPerPage must be positive');
    return products;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return products.slice(startIndex, endIndex);
}

// Helper function to calculate total pages
export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  if (totalItems <= 0 || itemsPerPage <= 0) {
    return 0;
  }
  return Math.ceil(totalItems / itemsPerPage);
}

// Helper function to get product configuration
export function getProductTypeConfig(productType: ProductType) {
  return PRODUCT_TYPES[productType];
}

// Database product interface for better type safety
export interface DatabaseProduct {
  id: string | number;
  title: string;
  author?: string;
  price: number;
  condition: string;
  category: string;
  image?: string;
  year?: number;
}

// Transforms database product data to match Product interface
// Handles optional fields and provides fallback image paths
export function transformDatabaseProduct(product: DatabaseProduct, productType: ProductType): Product {
  const config = getProductTypeConfig(productType);

  // Validate required fields
  if (!product.id || !product.title || typeof product.price !== 'number') {
    throw new Error('Invalid product data: missing required fields (id, title, or price)');
  }

  return {
    id: product.id,
    title: product.title,
    author: product.author || '',
    price: product.price,
    condition: product.condition || 'New',
    category: product.category || 'Uncategorized',
    image: product.image || `${config.imagePrefix}${product.id}.jpg`,
    year: product.year
  };
}

// Available categories for different product types
export const engineeringMajors = [
  "Biomedical Engineering",
  "Chemical and Materials Engineering",
  "Civil Engineering",
  "Computer Systems Engineering",
  "Electrical and Electronic Engineering",
  "Engineering General",
  "Engineering Science",
  "Mechanical Engineering",
  "Mechatronics Engineering",
  "Software Engineering",
  "Structural Engineering",
];

// Updated categories based on the schema requirements
export const notebookTypes = [
  "A4 Pads",
  "A5 Pads",
  "Dot Grid",
  "Hardcover Notebooks",
  "Softcover Notebooks",
  "Sticky Notes",
  "Index Tabs"
];

export const writingSuppliesTypes = [
  "Ballpoint",
  "Gel",
  "Fountain",
  "Highlighters",
  "Fineliners",
  "Pencils",
  "Erasers",
  "Sharpeners"
];

export const otherTypes = [
  "Calculators",
  "Rulers",
  "Folders & Files",
  "Binders",
  "Staplers",
  "Scissors",
  "Glue"
];

// Additional degree options for coursebooks
export const additionalDegrees = [
  "Arts",
  "Business and Economics",
  "Creative Arts and Industries",
  "Education and Social Work",
  "Law",
  "Medicine & Health Science",
  "Science"
];
