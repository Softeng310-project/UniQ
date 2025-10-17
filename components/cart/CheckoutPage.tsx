"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../contexts/CartContext';

// Minimal checkout confirmation view showing order summary before placement
export default function CheckoutPage() {
  const { items, getCartTotal, isLoading, refreshCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmOrder = async () => {
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (response.status === 401) {
        router.push('/sign-in');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to confirm order.');
      }

      await refreshCart();
      router.push('/order-confirmed');
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to confirm order.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Confirm Order</h1>
          <p className="text-gray-600">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Confirm Order</h1>
          <div className="rounded-md border border-gray-200 bg-gray-50 p-6">
            <p className="text-gray-700">Your cart is currently empty. Add items before confirming an order.</p>
            <Link
              href="/cart"
              className="mt-4 inline-block rounded-md bg-[#6E8EBE] px-4 py-2 text-white hover:bg-[#5a7aa8]"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Confirm Order</h1>

        <div className="rounded-lg bg-white shadow-sm p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h2>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div>
                    <p className="text-lg font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                    <p className="text-base font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between text-lg font-semibold text-gray-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Shipping is free for all orders.</p>
          </section>

          {error && (
            <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Back to Cart
            </Link>
            <button
              type="button"
              onClick={handleConfirmOrder}
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-md bg-[#6E8EBE] px-6 py-2 text-white font-semibold hover:bg-[#5a7aa8] disabled:opacity-70"
            >
              {submitting ? 'Placing Order...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
