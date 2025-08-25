import React from "react";

interface BreadcrumbProps {
  items: string[];
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
          <span>{item}</span>
          {index < items.length - 1 && <span className="mx-2">&gt;</span>}
        </React.Fragment>
      ))}
      <h1 className="text-4xl pt-4 pb-4">{title}</h1>
    </div>
  );
}
