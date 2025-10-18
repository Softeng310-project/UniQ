"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';

// Define the structure of a cart item
export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  category?: string;
  degree?: string;
  condition?: string;
  description?: string;
}

// Define the shape of the cart context
interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  resetCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

function parseError(response: Response, fallback: string) {
  return response
    .json()
    .then((data) => (data?.error as string) || fallback)
    .catch(() => fallback);
}

function normalizeItems(items: any[]): CartItem[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => ({
      id: String(item?.id ?? ''),
      title: String(item?.title ?? ''),
      price: Number(item?.price ?? 0),
      quantity: Math.max(0, Number(item?.quantity ?? 0)),
      category: item?.category ? String(item.category) : undefined,
      degree: item?.degree ? String(item.degree) : undefined,
      condition: item?.condition ? String(item.condition) : undefined,
      description: item?.description ? String(item.description) : undefined,
    }))
    .filter((item) => item.id && item.title && item.quantity > 0);
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Cart provider component to wrap the application
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setItemsFromResponse = useCallback(async (response: Response, fallbackMessage: string) => {
    if (response.status === 401) {
      setItems([]);
      throw new Error('Not authenticated');
    }

    if (!response.ok) {
      const message = await parseError(response, fallbackMessage);
      throw new Error(message);
    }

    const data = await response.json();
    setItems(normalizeItems(data?.items));
  }, []);

  const refreshCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.status === 401) {
        setItems([]);
        return;
      }

      if (!response.ok) {
        const message = await parseError(response, 'Unable to load cart.');
        throw new Error(message);
      }

      const data = await response.json();
      setItems(normalizeItems(data?.items));
    } catch (error) {
      console.error('Error loading cart:', error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(
    async (item: Omit<CartItem, 'quantity'>, quantity: number) => {
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ item, quantity }),
        });

        await setItemsFromResponse(response, 'Unable to add item to cart.');
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      }
    },
    [setItemsFromResponse]
  );

  const removeFromCart = useCallback(
    async (id: string) => {
      try {
        const response = await fetch('/api/cart', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ id }),
        });

        await setItemsFromResponse(response, 'Unable to remove item from cart.');
      } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
      }
    },
    [setItemsFromResponse]
  );

  const updateQuantity = useCallback(
    async (id: string, quantity: number) => {
      try {
        const response = await fetch('/api/cart', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ id, quantity }),
        });

        await setItemsFromResponse(response, 'Unable to update cart item.');
      } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
      }
    },
    [setItemsFromResponse]
  );

  const clearCart = useCallback(async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        credentials: 'include',
      });

      await setItemsFromResponse(response, 'Unable to clear cart.');
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }, [setItemsFromResponse]);

  const resetCart = useCallback(() => {
    setItems([]);
    setIsLoading(false);
  }, []);

  // Calculate total price of all items in cart
  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  // Get total number of items in cart
  const getCartCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  const value: CartContextType = {
    items,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
    resetCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
