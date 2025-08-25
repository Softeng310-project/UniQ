import React from "react";

export interface Product {
  id: number;
  title: string;
  author?: string; // Optional for non-book products
  price: number;
  condition: string;
  category: string;
  image?: string;
  year?: number; // Year level for course books (1-4)
}

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  return (
    <button
      className="bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={() => onProductClick(product)}
      aria-label={`View details for ${product.title}${product.author ? ` by ${product.author}` : ''}`}
    >
      <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
        {product.image ? (
          <img 
            src={product.image} 
            alt={`Image of ${product.title}`}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <span className="text-gray-500 text-sm">Product Image</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 truncate">{product.title}</h3>
        {product.author && (
          <p className="text-gray-600 text-xs mb-2">{product.author}</p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">${product.price}</span>
          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
            {product.condition}
          </span>
        </div>
      </div>
    </button>
  );
}
