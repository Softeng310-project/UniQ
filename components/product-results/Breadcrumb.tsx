import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;  // Display text
  href?: string;  // Optional route (if not provided, item is not clickable)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title: string;
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
