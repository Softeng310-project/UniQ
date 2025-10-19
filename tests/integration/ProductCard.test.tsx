import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard, { Product } from "@/components/product-results/ProductCard";

const product: Product = {
  id: 101,
  title: "Advanced Calculus",
  author: "J. Doe",
  price: 120,
  condition: "New",
  category: "Mathematics",
  image: "/assets/book/101.jpg",
};

describe("ProductCard", () => {
  it("invokes callback when clicked", () => {
    const onProductClick = jest.fn();

    render(<ProductCard product={product} onProductClick={onProductClick} />);

    fireEvent.click(screen.getByRole("button", { name: /view details/i }));
    expect(onProductClick).toHaveBeenCalledWith(product);
  });

  it("falls back to placeholder image when original fails to load", () => {
    const onProductClick = jest.fn();

    render(<ProductCard product={product} onProductClick={onProductClick} />);

    const image = screen.getByRole("img", { name: `Image of ${product.title}` }) as HTMLImageElement;

    fireEvent.error(image);

    expect(image.src).toContain("/assets/NoteBooks.webp");
  });
});
