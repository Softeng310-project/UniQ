# Product Results Components

This directory contains reusable components for product results pages. All components are designed to be dynamic and flexible for different product categories, search results, and filtering scenarios.

## Components

### Breadcrumb
Displays navigation breadcrumbs and page title.

**Props:**
- `items: string[]` - Array of breadcrumb items
- `title: string` - Page title

### SortDropdown
Handles sorting functionality with a dropdown interface. This component remains the same across all product types.

**Props:**
- `sortOptions: string[]` - Available sorting options
- `currentSort: string` - Currently selected sort option
- `onSortChange: (sort: string) => void` - Callback when sort changes
- `isOpen: boolean` - Whether dropdown is open
- `onToggle: () => void` - Callback to toggle dropdown

### FilterSidebar
Displays filter options for categories and conditions. Categories can be customized per product type.

**Props:**
- `categories: string[]` - Available category options (e.g., majors, notebook types, writing supplies)
- `conditions: string[]` - Available condition options
- `selectedCategories: string[]` - Currently selected categories
- `selectedConditions: string[]` - Currently selected conditions
- `onCategoryToggle: (category: string) => void` - Callback when category selection changes
- `onConditionToggle: (condition: string) => void` - Callback when condition selection changes
- `categoryLabel?: string` - Custom label for the category section (default: "Categories")

### ProductCard
Displays individual product information. Supports both books (with authors) and other products.

**Props:**
- `product: Product` - Product object with id, title, optional author, price, condition, category, and optional image
- `onProductClick: (product: Product) => void` - Callback when product is clicked

### ProductGrid
Displays a grid of products with empty state handling.

**Props:**
- `products: Product[]` - Array of products to display
- `onProductClick: (product: Product) => void` - Callback when product is clicked

### Pagination
Handles page navigation.

**Props:**
- `currentPage: number` - Current page number
- `totalPages: number` - Total number of pages
- `onPageChange: (page: number) => void` - Callback when page changes

## Utilities

### useProductResults Hook
Custom hook that manages all the state and logic for product results pages.

**Parameters:**
- `products: Product[]` - Array of products to manage
- `itemsPerPage?: number` - Number of items per page (default: 16)

**Returns:**
- State variables (selectedCategories, selectedConditions, sortBy, currentPage, etc.)
- Action functions (toggleCategory, toggleCondition, setSortBy, etc.)
- Computed values (currentProducts, totalPages, filteredAndSortedProducts)

### productResultsUtils
Utility functions for filtering, sorting, and pagination.

**Functions:**
- `filterAndSortProducts()` - Filters and sorts products based on criteria
- `paginateProducts()` - Paginates products for display
- `sortOptions` - Available sorting options (same for all product types)
- `conditions` - Available condition options

**Example Category Data:**
- `engineeringMajors` - Engineering major categories
- `notebookTypes` - Notebook type categories
- `writingSuppliesTypes` - Writing supplies categories

## Usage Examples

### Course Books Page
```tsx
import { useProductResults } from '@/hooks/useProductResults';
import { engineeringMajors, conditions, sortOptions } from '@/lib/productResultsUtils';
import { Breadcrumb, SortDropdown, FilterSidebar, ProductGrid, Pagination } from '@/components/product-results';

export default function CourseBooksPage({ 
  breadcrumbItems = ["Home", "Course Books", "Engineering", "2nd Year"],
  pageTitle = "Engineering: 2nd Year",
  products = []
}) {
  const {
    selectedCategories,
    selectedConditions,
    sortBy,
    currentPage,
    sortOpen,
    totalPages,
    currentProducts,
    setSortOpen,
    setSortBy,
    setCurrentPage,
    toggleCategory,
    toggleCondition,
  } = useProductResults({ products });

  const handleProductClick = (product) => {
    // Navigate to product detail page
    console.log('Navigate to product:', product.id);
  };

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb items={breadcrumbItems} title={pageTitle} />
      
      <SortDropdown
        sortOptions={sortOptions}
        currentSort={sortBy}
        onSortChange={setSortBy}
        isOpen={sortOpen}
        onToggle={() => setSortOpen(!sortOpen)}
      />

      <div className="pl-16 pr-16 pb-12 flex">
        <FilterSidebar
          categories={engineeringMajors}
          conditions={conditions}
          selectedCategories={selectedCategories}
          selectedConditions={selectedConditions}
          onCategoryToggle={toggleCategory}
          onConditionToggle={toggleCondition}
          categoryLabel="Majors"
        />

        <main className="flex-1">
          <ProductGrid products={currentProducts} onProductClick={handleProductClick} />
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
```

### Notebooks Page
```tsx
// Example for notebooks with different categories
<FilterSidebar
  categories={notebookTypes}
  conditions={conditions}
  selectedCategories={selectedCategories}
  selectedConditions={selectedConditions}
  onCategoryToggle={toggleCategory}
  onConditionToggle={toggleCondition}
  categoryLabel="Notebook Types"
/>
```

### Writing Supplies Page
```tsx
// Example for writing supplies with different categories
<FilterSidebar
  categories={writingSuppliesTypes}
  conditions={conditions}
  selectedCategories={selectedCategories}
  selectedConditions={selectedConditions}
  onCategoryToggle={toggleCategory}
  onConditionToggle={toggleCondition}
  categoryLabel="Product Types"
/>
```

## Dynamic Content Support

All components support dynamic content through props, making them perfect for different product categories:

- **Breadcrumb**: Changes based on navigation context
- **SortDropdown**: Remains consistent across all product types
- **FilterSidebar**: Categories change per product type (majors, notebook types, etc.)
- **ProductCard**: Handles both books (with authors) and other products
- **ProductGrid**: Works with any product data
- **Pagination**: Universal across all product types

The components maintain the same layout and functionality while being completely flexible for different product categories and data sources.
