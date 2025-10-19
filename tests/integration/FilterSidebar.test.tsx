import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterSidebar from "@/components/product-results/FilterSidebar";

const baseProps = {
  categories: ["Computer Science", "Mathematics"],
  conditions: ["New", "Used"],
  selectedCategories: [],
  selectedConditions: [],
  selectedYears: [],
  onCategoryToggle: jest.fn(),
  onConditionToggle: jest.fn(),
  onYearToggle: jest.fn(),
  onPriceChange: jest.fn(),
  categoryLabel: "Majors",
  showYearFilter: true,
  showConditionFilter: true,
};

describe("FilterSidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("invokes callbacks when toggling category and condition", () => {
    render(<FilterSidebar {...baseProps} />);

    fireEvent.click(screen.getByLabelText("Filter by Computer Science majors"));
    expect(baseProps.onCategoryToggle).toHaveBeenCalledWith("Computer Science");

    fireEvent.click(screen.getByLabelText("Filter by New condition"));
    expect(baseProps.onConditionToggle).toHaveBeenCalledWith("New");
  });

  it("shows year filter when enabled and hides when disabled", () => {
    const { rerender } = render(<FilterSidebar {...baseProps} showYearFilter={true} />);

    expect(screen.getByText("Year")).toBeInTheDocument();

    rerender(<FilterSidebar {...baseProps} showYearFilter={false} />);

    expect(screen.queryByText("Year")).not.toBeInTheDocument();
  });

  it("validates price range and triggers alert when min exceeds max", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<FilterSidebar {...baseProps} />);

    fireEvent.change(screen.getByLabelText("Minimum price"), { target: { value: "20" } });
    fireEvent.change(screen.getByLabelText("Maximum price"), { target: { value: "10" } });
    fireEvent.click(screen.getByRole("button", { name: "Apply price filter" }));

    expect(alertSpy).toHaveBeenCalledWith("Minimum price cannt be greater than maximum price");
    expect(baseProps.onPriceChange).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  it("applies and clears price filters", () => {
    render(<FilterSidebar {...baseProps} />);

    fireEvent.change(screen.getByLabelText("Minimum price"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("Maximum price"), { target: { value: "30" } });
    fireEvent.blur(screen.getByLabelText("Maximum price"));

    expect(baseProps.onPriceChange).toHaveBeenLastCalledWith(10, 30);

    fireEvent.click(screen.getByRole("button", { name: "Clear price filter" }));
    expect(baseProps.onPriceChange).toHaveBeenLastCalledWith(undefined, undefined);
  });
});
