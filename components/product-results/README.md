# Product Results Components

Reusable components for product results pages with filtering, sorting, and pagination functionality.

## Components Overview

### Core Components
- **Breadcrumb** - Navigation breadcrumbs and page title
- **SortDropdown** - Product sorting controls
- **FilterSidebar** - Multi-select filtering (categories, years, conditions)
- **ProductCard** - Individual product display with image fallback
- **ProductGrid** - Responsive grid layout with empty state
- **Pagination** - Page navigation controls

### Key Features
- **Multi-select filtering** - Categories, years, and conditions
- **Real-time sorting** - Alphabetical, price, and date options
- **Responsive design** - Mobile-friendly grid layouts
- **Accessibility** - ARIA labels and keyboard navigation
- **Loading states** - Loading and error handling

## Usage

### Basic Implementation
```tsx
import { useProductResults } from '@/hooks/useProductResults';
import { Breadcrumb, SortDropdown, FilterSidebar, ProductGrid, Pagination } from '@/components/product-results';

export default function ProductResultsPage() {
  const {
    selectedCategories,
    selectedConditions,
    selectedYears,
    sortBy,
    currentPage,
    totalPages,
    currentProducts,
    toggleCategory,
    toggleCondition,
    toggleYear,
    setSortBy,
    setCurrentPage,
  } = useProductResults({ products });

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb items={["Home", "Products"]} title="Product Results" />
      <SortDropdown sortOptions={sortOptions} currentSort={sortBy} onSortChange={setSortBy} />
      
      <div className="flex">
        <FilterSidebar
          categories={availableCategories}
          conditions={conditions}
          selectedCategories={selectedCategories}
          selectedConditions={selectedConditions}
          selectedYears={selectedYears}
          onCategoryToggle={toggleCategory}
          onConditionToggle={toggleCondition}
          onYearToggle={toggleYear}
        />
        
        <main className="flex-1">
          <ProductGrid products={currentProducts} onProductClick={handleProductClick} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </main>
      </div>
    </div>
  );
}
```

### Product Types
The system supports different product types with custom configurations:
- **Course Books** - Engineering majors, year levels
- **Notebooks** - Types (spiral, composition, etc.)
- **Writing Supplies** - Categories (pens, pencils, etc.)

### API Integration
Components work with the `/api/products` endpoint for:
- Filtered data fetching
- Pagination
- Dynamic category/condition options
- Real-time search updates

## Data Structure

### Product Interface
```typescript
interface Product {
  id: number;
  title: string;
  author?: string;
  price: number;
  condition: string;
  category: string;
  image?: string;
  year?: number;
}
```

### Filter Options
- **Categories** - Dynamic based on product type
- **Conditions** - ["New", "Used"]
- **Years** - ["1st Year", "2nd Year", "3rd Year", "4th Year"]
- **Sort Options** - Alphabetical, price, date sorting
