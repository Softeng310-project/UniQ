// Utility functions for generating consistent breadcrumbs across the application
// This file contains all breadcrumb generation logic to ensure consistency

// Interface for breadcrumb items (matches the component interface)
export interface BreadcrumbItem {
  label: string;  // Text to display
  href?: string;  // Optional link - if provided, item becomes clickable
}

// Convert degree name to URL format
export const getDegreeUrl = (degree: string): string => {
  if (!degree) return "engineering";
  return degree.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
};

// Convert URL degree format to display format
export const formatDegree = (degree: string): string => {
  return degree
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Generate breadcrumbs for course books pages
export const generateCourseBooksBreadcrumbs = (degree?: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Course Books", href: "/course-books" }
  ];

  if (degree) {
    const degreeName = formatDegree(degree);
    breadcrumbs.push({ label: degreeName }); // Not clickable
  }

  return breadcrumbs;
};

// Generate breadcrumbs for book details page
export const generateBookDetailsBreadcrumbs = (book: any): BreadcrumbItem[] => {
  if (!book) return [{ label: "Home", href: "/" }];

  return [
    { label: "Home", href: "/" },
    { label: "Course Books", href: "/course-books" },
    { label: book.degree || "Engineering", href: `/course-books/${getDegreeUrl(book.degree)}` },
    { label: book.major || "Major" },
    { label: book.year || "Year" },
    { label: book.title || "Book Title" } // Not clickable
  ];
};

// Generate breadcrumbs for product results pages
// Handles different product types (course books, notebooks, etc.)
export const generateProductResultsBreadcrumbs = (
  productType: string, 
  degree?: string
): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" }
  ];

  // Add product type specific breadcrumbs
  switch (productType) {
    case "course-books":
      breadcrumbs.push({ label: "Course Books", href: "/course-books" });
      if (degree) {
        const degreeName = formatDegree(degree);
        breadcrumbs.push({ label: degreeName }); // Not clickable
      }
      break;
    case "notebooks-and-pads":
      breadcrumbs.push({ label: "Notebooks & Pads" }); // Not clickable
      break;
    case "writing-supplies":
      breadcrumbs.push({ label: "Writing Supplies" }); // Not clickable
      break;
    default:
      breadcrumbs.push({ label: "Products" }); // Not clickable
  }

  return breadcrumbs;
};

// Generate breadcrumbs for new arrivals page
export const generateNewArrivalsBreadcrumbs = (): BreadcrumbItem[] => {
  return [
    { label: "Home", href: "/" },
    { label: "New Arrivals" } // Not clickable
  ];
};
