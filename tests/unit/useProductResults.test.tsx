import { renderHook, act } from "@testing-library/react";
import { useProductResults } from "@/hooks/useProductResults";
import { Product } from "@/components/product-results/ProductCard";

const products: Product[] = [
  {
    id: 1,
    title: "Algorithms 101",
    price: 50,
    condition: "New",
    category: "Computer Science",
    year: 1,
  },
  {
    id: 2,
    title: "Organic Chemistry",
    price: 40,
    condition: "Used",
    category: "Chemistry",
    year: 2,
  },
  {
    id: 3,
    title: "Linear Algebra",
    price: 30,
    condition: "New",
    category: "Mathematics",
    year: 1,
  },
];

describe("useProductResults", () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    (window.scrollTo as jest.Mock).mockReset();
  });

  afterAll(() => {
    window.scrollTo = originalScrollTo;
  });

  it("initializes with provided defaults and toggles category selections", () => {
    const { result } = renderHook(() =>
      useProductResults({
        products,
        initialCategories: ["Computer Science"],
        initialConditions: ["New"],
        initialYears: ["1st Year"],
      })
    );

    expect(result.current.selectedCategories).toEqual(["Computer Science"]);

    act(() => {
      result.current.toggleCategory("Mathematics");
    });
    expect(result.current.selectedCategories).toEqual(["Computer Science", "Mathematics"]);

    act(() => {
      result.current.toggleCategory("Computer Science");
    });
    expect(result.current.selectedCategories).toEqual(["Mathematics"]);
  });

  it("resets to first page when sort option changes", () => {
    const { result } = renderHook(() =>
      useProductResults({
        products,
        itemsPerPage: 1,
      })
    );

    act(() => {
      result.current.setCurrentPage(3);
    });
    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.setSortBy("Price, high to low");
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.filteredAndSortedProducts[0].title).toBe("Algorithms 101");
  });

  it("paginates products and scrolls to top when page changes", () => {
    const { result } = renderHook(() =>
      useProductResults({
        products,
        itemsPerPage: 2,
      })
    );

    expect(result.current.totalPages).toBe(2);
    expect(result.current.currentProducts).toHaveLength(2);

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentProducts).toHaveLength(1);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("filters products by condition and year", () => {
    const { result } = renderHook(() =>
      useProductResults({
        products,
      })
    );

    act(() => {
      result.current.toggleCondition("Used");
      result.current.toggleYear("2nd Year");
    });

    expect(result.current.filteredAndSortedProducts).toEqual([
      {
        id: 2,
        title: "Organic Chemistry",
        price: 40,
        condition: "Used",
        category: "Chemistry",
        year: 2,
      },
    ]);
  });
});
