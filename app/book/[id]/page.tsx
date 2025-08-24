"use client";
import React, { useState, useEffect } from "react";

export default function BookDetails({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    fetch(`/api/books/${params.id}`)
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json().catch(() => ({}));
          throw new Error(error.error || "Failed to fetch book");
        }
        return res.json();
      })
      .then((data) => setBook(data))
      .catch((err) => setBook({ error: err.message }));
  }, [params.id]);

  if (!book) return <div>Loading...</div>;
  if (book.error) return <div>{book.error}</div>;

  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  return (
    <div className="px-8 py-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        Home {'>'} Course Books {'>'} Engineering {'>'} {book.major} {'>'} {book.year} {'>'} {book.title}
      </nav>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <div className="w-72 h-96 flex flex-col items-center justify-center border border-gray-300 bg-orange-100 text-4xl text-gray-700 font-serif">
            {book.title
              ? book.title.split(" ").map((line: string, idx: number) => (
                  <div key={idx} className="w-full text-center">{line}</div>
                ))
              : <div>No title found</div>
            }
          </div>
        </div>
        {/* Book Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-gray-700 mb-2">{book.title}</h1>
          <div className="text-2xl text-gray-600 mb-4">${book.price?.toFixed(2)}</div>
          {/* Quantity & Add to Cart */}
          <div className="flex flex-row items-end gap-4 mb-6">
            <div>
              <div className="text-base text-gray-700 mb-1">Quantity</div>
              <div className="flex items-center border border-gray-300 rounded w-fit">
                <button
                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                  onClick={handleDecrease}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-1 text-lg">{quantity}</span>
                <button
                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                  onClick={handleIncrease}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <button className="ml-4 w-[550px] h-[38px] px-8 bg-orange-100 border border-gray-300 text-lg text-gray-700 rounded hover:bg-orange-200 transition text-center flex items-center justify-center">
              ADD TO CART
            </button>
          </div>
          <hr className="my-6" />
          {/* Description */}
          <div>
            <div className="text-lg font-medium text-gray-700 mb-2">Description</div>
            <div className="text-gray-600 text-base leading-relaxed">{book.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
