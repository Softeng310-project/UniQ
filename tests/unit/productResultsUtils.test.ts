import {
  filterAndSortProducts,
  sortProducts,
  paginateProducts,
  calculateTotalPages,
  transformDatabaseProduct,
  PRODUCT_TYPES,
  SortOption,
} from "@/lib/productResultsUtils";
import { Product } from "@/components/product-results/ProductCard";

const sampleProducts: Product[] = [
  {
    id: 3,
    title: "Calculus Companion",
    price: 45,
    condition: "Used",
    category: "Mathematics",
    year: 2,
  },
  {
    id: 1,
    title: "Algorithms 101",
    price: 60,
    condition: "New",
    category: "Computer Science",
    year: 1,
  },
  {
    id: 2,
    title: "Chemistry Lab Kit",
    price: 35,
    condition: "New",
    category: "Chemistry",
    year: 1,
  },
];

describe("productResultsUtils filtering and sorting", () => {
  it("filters by category, condition, and year before sorting", () => {
    const filtered = filterAndSortProducts(
      sampleProducts,
      ["Computer Science"],
      ["New"],
      ["1st Year"],
      "Alphabetically, A-Z"
    );

    expect(filtered).toEqual([
      {
        id: 1,
        title: "Algorithms 101",
        price: 60,
        condition: "New",
        category: "Computer Science",
        year: 1,
      },
    ]);
  });

  it.each<SortOption>([
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
    "Date added, newest to oldest",
    "Date added, oldest to newest",
  ])("sortProducts handles %s ordering without mutating input", (sortBy) => {
    const source = [...sampleProducts];
    const result = sortProducts(source, sortBy);

    expect(result).not.toBe(source);
    expect(source).toEqual(sampleProducts);

    const titles = result.map((p) => p.title);

    switch (sortBy) {
      case "Alphabetically, A-Z":
        expect(titles).toEqual(["Algorithms 101", "Calculus Companion", "Chemistry Lab Kit"]);
        break;
      case "Alphabetically, Z-A":
        expect(titles).toEqual(["Chemistry Lab Kit", "Calculus Companion", "Algorithms 101"]);
        break;
      case "Price, low to high":
        expect(titles).toEqual(["Chemistry Lab Kit", "Calculus Companion", "Algorithms 101"]);
        break;
      case "Price, high to low":
        expect(titles).toEqual(["Algorithms 101", "Calculus Companion", "Chemistry Lab Kit"]);
        break;
      case "Date added, newest to oldest":
        expect(titles).toEqual(["Calculus Companion", "Chemistry Lab Kit", "Algorithms 101"]);
        break;
      case "Date added, oldest to newest":
        expect(titles).toEqual(["Algorithms 101", "Chemistry Lab Kit", "Calculus Companion"]);
        break;
      default:
        throw new Error("Unhandled sort option");
    }
  });
});

describe("productResultsUtils pagination helpers", () => {
  it("paginates based on page and items per page", () => {
    const products: Product[] = [
      { id: 1, title: "One", price: 10, condition: "New", category: "Cat" },
      { id: 2, title: "Two", price: 10, condition: "New", category: "Cat" },
      { id: 3, title: "Three", price: 10, condition: "New", category: "Cat" },
    ];

    const page2 = paginateProducts(products, 2, 1);
    expect(page2).toEqual([{ id: 2, title: "Two", price: 10, condition: "New", category: "Cat" }]);
  });

  it("returns original products when pagination parameters are invalid", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const result = paginateProducts(sampleProducts, 0, 0);

    expect(result).toBe(sampleProducts);
    expect(warnSpy).toHaveBeenCalledWith(
      "Invalid pagination parameters: page and itemsPerPage must be positive"
    );

    warnSpy.mockRestore();
  });

  it("calculateTotalPages handles zero and positive counts", () => {
    expect(calculateTotalPages(0, 10)).toBe(0);
    expect(calculateTotalPages(25, 10)).toBe(3);
  });
});

describe("productResultsUtils transform helpers", () => {
  it("throws when required fields are missing", () => {
    expect(() =>
      transformDatabaseProduct(
        {
          id: "",
          title: "",
          price: 20,
          condition: "New",
          category: "Cat",
        },
        "course-books"
      )
    ).toThrow("Invalid product data");
  });

  it("fills defaults using product type configuration", () => {
    const result = transformDatabaseProduct(
      {
        id: 12,
        title: "Mechanics Handbook",
        price: 80,
        condition: "",
        category: "",
      },
      "course-books"
    );

    expect(result).toEqual({
      id: 12,
      title: "Mechanics Handbook",
      author: "",
      price: 80,
      condition: "New",
      category: "Uncategorized",
      image: `${PRODUCT_TYPES["course-books"].imagePrefix}12.jpg`,
      year: undefined,
    });
  });
});
