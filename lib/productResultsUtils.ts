import { Product } from "@/components/product-results/ProductCard";

export const sortOptions = [
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date added, newest to oldest",
  "Date added, oldest to newest",
];

export const conditions = ["New", "Used"];

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
    detailRoute: '/notebook',
    imagePrefix: '/assets/notebook'
  },
  'writing-supplies': {
    name: 'Writing Supplies',
    breadcrumb: ['Home', 'Writing Supplies'],
    categoryLabel: 'Categories',
    detailRoute: '/writing-supply',
    imagePrefix: '/assets/writing'
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
  sortBy: string
): Product[] {
  let filtered = products;

  // Filter by selected categories
  if (selectedCategories.length > 0) {
    filtered = filtered.filter(product => selectedCategories.includes(product.category));
  }

  // Filter by selected conditions
  if (selectedConditions.length > 0) {
    filtered = filtered.filter(product => selectedConditions.includes(product.condition));
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

  // Sort products
  switch (sortBy) {
    case "Alphabetically, A-Z":
      return filtered.sort((a, b) => a.title.localeCompare(b.title));
    case "Alphabetically, Z-A":
      return filtered.sort((a, b) => b.title.localeCompare(a.title));
    case "Price, low to high":
      return filtered.sort((a, b) => a.price - b.price);
    case "Price, high to low":
      return filtered.sort((a, b) => b.price - a.price);
    case "Date added, newest to oldest":
      return filtered.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    case "Date added, oldest to newest":
      return filtered.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    default:
      return filtered;
  }
}

// Helper function to extract year number from year string (e.g., "1st Year" -> 1)
function extractYearNumber(yearString: string): number {
  const match = yearString.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// Splits product array into pages for pagination
export function paginateProducts(products: Product[], currentPage: number, itemsPerPage: number): Product[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return products.slice(startIndex, endIndex);
}

// Helper function to get product configuration
export function getProductTypeConfig(productType: ProductType) {
  return PRODUCT_TYPES[productType];
}

// Transforms database product data to match Product interface
// Handles optional fields and provides fallback image paths
export function transformDatabaseProduct(product: any, productType: ProductType): Product {
  const config = getProductTypeConfig(productType);
  
  return {
    id: product.id,
    title: product.title,
    author: product.author || '',
    price: product.price,
    condition: product.condition,
    category: product.category,
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

export const notebookTypes = [
  "Spiral Bound",
  "Ring Binder",
  "Composition",
  "Lab Notebook",
  "Graph Paper",
  "Lined Paper",
  "Blank Paper",
];

export const writingSuppliesTypes = [
  "Pens",
  "Pencils",
  "Markers",
  "Highlighters",
  "Erasers",
  "Rulers",
  "Calculators",
];
