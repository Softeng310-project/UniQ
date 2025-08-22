import React from "react";

interface FilterSidebarProps {
  categories: string[];
  conditions: string[];
  selectedCategories: string[];
  selectedConditions: string[];
  onCategoryToggle: (category: string) => void;
  onConditionToggle: (condition: string) => void;
  categoryLabel?: string;
}

export default function FilterSidebar({
  categories,
  conditions,
  selectedCategories,
  selectedConditions,
  onCategoryToggle,
  onConditionToggle,
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
