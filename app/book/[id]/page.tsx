"use client";
import React, { useState } from "react";

export default function BookDetails({ params }: { params: { id: string } }) {
  // temp data 
  const book = {
    title: "SOFTENG 310 Course Book 2025",
    price: 69.99,
    description:
      "I have absolutely no clue what to say here so I’m gonna write some text just completely waffling and hope that no one notices. This page has taken me far to long I genuinely don’t know how a page with only like three extra features would take like an hour. I also don’t know if there’s too much orange colour on this page and it ruins the theme. I’m going to hope this is enough text to full up the description part.",
    coverText: "SOFTENG\n310\n2025",
  };
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrease = () => {
    setQuantity((q: number) => (q > 1 ? q - 1 : 1));
  };
  const handleIncrease = () => {
    setQuantity((q: number) => q + 1);
  };

  return (
    <div className="px-8 py-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        Home {'>'} Course Books {'>'} Engineering {'>'} Software Engineering {'>'} 3rd Year {'>'} {book.title}
      </nav>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <div className="w-72 h-96 flex flex-col items-center justify-center border border-gray-300 bg-orange-100 text-4xl text-gray-700 font-serif">
            {book.coverText.split("\n").map((line, idx) => (
              <div key={idx} className="w-full text-center">{line}</div>
            ))}
          </div>
        </div>

        {/* Book Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-gray-700 mb-2">{book.title}</h1>
          <div className="text-2xl text-gray-600 mb-4">${book.price.toFixed(2)}</div>

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
            <button
              className="ml-4 w-[550px] h-[38px] px-8 bg-orange-100 border border-gray-300 text-lg text-gray-700 rounded hover:bg-orange-200 transition text-center flex items-center justify-center"
            >
              ADD TO CART
            </button>
          </div>

          <hr className="my-6" />

          {/* Description */}
          <div>
            <div className="text-lg font-medium text-gray-700 mb-2">Description</div>
            <div className="text-gray-600 text-base leading-relaxed">
              {book.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
