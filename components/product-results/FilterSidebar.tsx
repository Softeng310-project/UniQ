import React from "react";

interface FilterSidebarProps {
  categories: string[];
  conditions: string[];
  selectedCategories: string[];
  selectedConditions: string[];
  selectedYears?: string[];
  minPrice?: number;
  maxPrice?: number;
  onCategoryToggle: (category: string) => void;
  onConditionToggle: (condition: string) => void;
  onYearToggle?: (year: string) => void;
  onPriceChange?: (min: number | undefined, max: number | undefined) => void;
  categoryLabel?: string;
}

interface FilterSectionProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
  labelSuffix?: string; // e.g., "category", "year", for accessibility
}

function FilterSection({ 
  title, 
  options, 
  selectedOptions, 
  onToggle, 
  labelSuffix = "option" 
}: FilterSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="font-light text-[#4D6890] mb-2 text-xl">{title}</h2>
      <div className="space-y-1">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => onToggle(option)}
              className="h-6 w-6 text-blue-600 border-gray-400 border rounded cursor-pointer checked:bg-blue-400 checked:border-blue-400 appearance-none hover:cursor-pointer"
              aria-label={`Filter by ${option} ${labelSuffix}`}
            />
            <span className="text-[#556C8E] font-mandali">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}


// Provides filtering controls for product search results
// Supports multi-select filtering by categories (majors), years, and conditions
// Uses controlled checkboxes that sync with parent component state
export default function FilterSidebar({
  categories,
  conditions,
  selectedCategories,
  selectedConditions,
  selectedYears = [],
  minPrice,
  maxPrice,
  onCategoryToggle,
  onConditionToggle,
  onYearToggle,
  onPriceChange,
  categoryLabel = "Categories"
}: FilterSidebarProps) {
  // Year options for filter UI
  const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const [minInput, setMinInput] = React.useState<string>(minPrice?.toString() || "");
  const [maxInput, setMaxInput] = React.useState<string>(maxPrice?.toString() || "");
  
  // Handle price input changes
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinInput(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxInput(value);
  };

  // Apply price filter when input loses focus or Enter is pressed
  const applyPriceFilter = () => {
    const min = minInput === "" ? undefined : parseFloat(minInput);
    const max = maxInput === "" ? undefined : parseFloat(maxInput);
    
    // Validate that min is not greater than max
    if (min !== undefined && max !== undefined && min > max) {
      alert("Minimum price cannt be greater than maximum price");
      return;
    }
    
    onPriceChange?.(min, max);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyPriceFilter();
    }
  };

  // Clear price filter
  const clearPriceFilter = () => {
    setMinInput("");
    setMaxInput("");
    onPriceChange?.(undefined, undefined);
  };

  return (
    <aside className="w-65 pr-6">

      {/* Majors filter */}
      <FilterSection
        title={categoryLabel}
        options={categories}
        selectedOptions={selectedCategories}
        onToggle={onCategoryToggle}
        labelSuffix={categoryLabel.toLowerCase()}
      />

      {/* Year filter */}
      <FilterSection
        title="Year"
        options={yearOptions}
        selectedOptions={selectedYears}
        onToggle={onYearToggle || (() => {})}
        labelSuffix="year"
      />

      {/* Price filter */}
      <div className="mb-6">
        <h2 className="font-light text-[#4D6890] mb-2 text-xl">Price Range</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <div className="w-32">
              <label htmlFor="min-price" className="block text-sm text-[#556C8E] mb-1">
                Min ($)
              </label>
              <input
                id="min-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0"
                value={minInput}
                onChange={handleMinChange}
                onBlur={applyPriceFilter}
                onKeyDown={handleKeyDown}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                aria-label="Minimum price"
              />
            </div>
            <div className="w-32">
              <label htmlFor="max-price" className="block text-sm text-[#556C8E] mb-1">
                Max ($)
              </label>
              <input
                id="max-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Any"
                value={maxInput}
                onChange={handleMaxChange}
                onBlur={applyPriceFilter}
                onKeyDown={handleKeyDown}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                aria-label="Maximum price"
              />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={applyPriceFilter}
              className="flex-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-xs"
              aria-label="Apply price filter"
            >
              Apply
            </button>
            {(minInput !== "" || maxInput !== "") && (
              <button
                onClick={clearPriceFilter}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-xs"
                aria-label="Clear price filter"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Condition filter */}
      <FilterSection
        title="Condition"
        options={conditions}
        selectedOptions={selectedConditions}
        onToggle={onConditionToggle}
        labelSuffix="condition"
      />
    </aside>
  );
}
