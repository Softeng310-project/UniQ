"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { MdDelete, MdShoppingCart } from 'react-icons/md';
import { useCart } from '../../contexts/CartContext';

// Main cart page component showing all cart items and total
export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart, isLoading } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [busyItemId, setBusyItemId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setBusyItemId(id);
    setError(null);

    try {
      await updateQuantity(id, newQuantity);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to update item quantity.';
      setError(message);
    } finally {
      setBusyItemId(null);
    }
  };

  const handleRemove = async (id: string) => {
    setBusyItemId(id);
    setError(null);

    try {
      await removeFromCart(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to remove item.';
      setError(message);
    } finally {
      setBusyItemId(null);
    }
  };

  const handleClearCart = async () => {
    setClearing(true);
    setError(null);

    try {
      await clearCart();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to clear cart.';
      setError(message);
    } finally {
      setClearing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
          <div className="flex flex-col items-center justify-center py-20">
            <MdShoppingCart size={120} className="text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some items to your cart to get started!</p>
            <Link
              href="/"
              className="px-6 py-3 bg-[#6E8EBE] text-white rounded-lg hover:bg-[#5a7aa8] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <button
            onClick={() => void handleClearCart()}
            className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-70"
            disabled={clearing}
          >
            {clearing ? 'Clearing...' : 'Clear Cart'}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-6"
              >
                {/* Book Cover Placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-32 flex flex-col items-center justify-center border border-gray-300 bg-orange-100 text-sm text-gray-700 font-serif p-2">
                    {item.title
                      .split(' ')
                      .slice(0, 3)
                      .map((word, idx) => (
                        <div key={idx} className="text-center text-xs">
                          {word}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Item Details */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        href={`/book/${item.id}`}
                        className="text-lg font-semibold text-gray-800 hover:text-[#6E8EBE] transition-colors"
                      >
                        {item.title}
                      </Link>
                      <div className="text-sm text-gray-600 mt-1 space-y-1">
                        {item.condition && <div>Condition: {item.condition}</div>}
                        {item.degree && <div>Degree: {item.degree}</div>}
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                          onClick={() => void handleQuantityChange(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          disabled={busyItemId === item.id || clearing}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(event) =>
                            void handleQuantityChange(item.id, parseInt(event.target.value, 10) || 1)
                          }
                          className="w-16 px-2 py-1 text-center border-x border-gray-300 focus:outline-none disabled:bg-gray-100"
                          disabled={busyItemId === item.id || clearing}
                        />
                        <button
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                          onClick={() => void handleQuantityChange(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          disabled={busyItemId === item.id || clearing}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => void handleRemove(item.id)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                      aria-label="Remove item"
                      disabled={busyItemId === item.id || clearing}
                    >
                      <MdDelete size={20} />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>

                  {/* Item Subtotal */}
                  <div className="mt-3 text-right text-gray-700">
                    Subtotal: <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/cart/checkout"
                className="block w-full bg-[#6E8EBE] text-white py-3 rounded-lg text-center font-semibold hover:bg-[#5a7aa8] transition-colors mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="block w-full text-center py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

