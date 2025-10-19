import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortDropdown from "@/components/product-results/SortDropdown";

const options = ["Alphabetically, A-Z", "Price, low to high"];

describe("SortDropdown", () => {
  it("toggles dropdown visibility on click", () => {
    const handleToggle = jest.fn();

    render(
      <SortDropdown
        sortOptions={options}
        currentSort={options[0]}
        onSortChange={jest.fn()}
        isOpen={false}
        onToggle={handleToggle}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /sort products by/i }));
    expect(handleToggle).toHaveBeenCalled();
  });

  it("calls onSortChange when an option is selected", () => {
    const handleToggle = jest.fn();
    const handleSortChange = jest.fn();

    render(
      <SortDropdown
        sortOptions={options}
        currentSort={options[0]}
        onSortChange={handleSortChange}
        isOpen={true}
        onToggle={handleToggle}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: options[1] }));

    expect(handleSortChange).toHaveBeenCalledWith(options[1]);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
