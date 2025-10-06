import React from "react";
import Link from "next/link";

// Interface for individual breadcrumb items
interface BreadcrumbItem {
  label: string;  // Text to display
  href?: string;  // Optional link - if provided, item becomes clickable
}

// Props for the Breadcrumb component
interface BreadcrumbProps {
  items: BreadcrumbItem[];  // Array of breadcrumb items
  title: string;            // Page title displayed below breadcrumbs
}

// Displays navigation breadcrumbs and page title
// Shows hierarchical navigation path (e.g., Home > Course Books > Engineering)
// Provides context for current page location in the application
export default function Breadcrumb({ items, title }: BreadcrumbProps) {
  return (
    <div className="pl-16 py-6 text-sm text-[#2A4163]">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-blue-600 hover:underline transition-colors cursor-pointer"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500 cursor-default">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-2">&gt;</span>}
        </React.Fragment>
      ))}
      <h1 className="text-4xl pt-4 pb-4">{title}</h1>
    </div>
  );
}
