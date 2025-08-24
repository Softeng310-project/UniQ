import React from "react";

interface FilterSidebarProps {
  readonly categories: string[];
  readonly conditions: string[];
  readonly years: string[];
  readonly selectedCategories: string[];
  readonly selectedConditions: string[];
  readonly selectedYears: string[];
  readonly onCategoryToggle: (category: string) => void;
  readonly onConditionToggle: (condition: string) => void;
  readonly onYearToggle: (year: string) => void;
  readonly categoryLabel?: string;
}

export default function FilterSidebar({
  categories,
  conditions,
  years,
  selectedCategories,
  selectedConditions,
  selectedYears,
  onCategoryToggle,
  onConditionToggle,
  onYearToggle,
  categoryLabel = "Categories"
}: FilterSidebarProps) {
  return (
    <aside className="w-65 pr-6">
      <div className="mb-6">
        <h2 className="font-light text-[#556C8E] mb-2 text-xl">{categoryLabel}</h2>
        <div className="space-y-1">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryToggle(category)}
                className="h-6 w-6 text-blue-600 border-gray-400 border rounded cursor-pointer checked:bg-blue-400 checked:border-blue-400 appearance-none hover:cursor-pointer"
                aria-label={`Filter by ${category} ${categoryLabel.toLowerCase()}`}
              />
              <span className="text-[#556C8E] font-mandali">{category}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="font-light text-[#556C8E] mb-2 text-xl">Year</h2>
        <div className="space-y-1">
          {years.map((year) => (
            <label key={year} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedYears.includes(year)}
                onChange={() => onYearToggle(year)}
                className="h-6 w-6 text-blue-600 border-gray-400 border rounded cursor-pointer checked:bg-blue-400 checked:border-blue-400 appearance-none hover:cursor-pointer"
                aria-label={`Filter by ${year}`}
              />
              <span className="text-[#556C8E] font-mandali">{year}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-light text-[#4D6890] mb-2 text-xl">Condition</h2>
        <div className="space-y-1">
          {conditions.map((condition) => (
            <label key={condition} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedConditions.includes(condition)}
                onChange={() => onConditionToggle(condition)}
                className="h-6 w-6 text-blue-600 border-gray-400 border rounded cursor-pointer checked:bg-blue-400 checked:border-blue-400 appearance-none hover:cursor-pointer"
                aria-label={`Filter by ${condition} condition`}
              />
              <span className="text-[#556C8E] font-mandali">{condition}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
