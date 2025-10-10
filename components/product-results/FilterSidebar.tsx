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

      {/* Year filter */}
      <div className="mb-6">
        <h2 className="font-light text-[#4D6890] mb-2 text-xl">Year</h2>
        <div className="space-y-1">
          {yearOptions.map((year) => (
            <label key={year} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedYears.includes(year)}
                onChange={() => onYearToggle?.(year)}
                className="h-6 w-6 text-blue-600 border-gray-400 border rounded cursor-pointer checked:bg-blue-400 checked:border-blue-400 appearance-none hover:cursor-pointer"
                aria-label={`Filter by ${year}`}
              />
              <span className="text-[#556C8E] font-mandali">{year}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div className="mb-6">
        <h2 className="font-light text-[#4D6890] mb-2 text-xl">Price Range</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
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
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                aria-label="Minimum price"
              />
            </div>
            <div className="flex-1">
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
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                aria-label="Maximum price"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={applyPriceFilter}
              className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
              aria-label="Apply price filter"
            >
              Apply
            </button>
            {(minInput !== "" || maxInput !== "") && (
              <button
                onClick={clearPriceFilter}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm"
                aria-label="Clear price filter"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>


      {/* Condition filter */}
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
