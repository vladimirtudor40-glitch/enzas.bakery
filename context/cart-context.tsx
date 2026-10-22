"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/bakery-data";

const STORAGE_KEY = "enzas-bakery:cart:v1";

export interface CartItem {
  /** Product id + notes, so the same pastry with different notes stays separate. */
  id: string;
  productId: string;
  name: string;
  portion?: string;
  price: number;
  priceFrom?: boolean;
  image: string;
  imageAlt: string;
  quantity: number;
  notes: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, notes?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  /** Increments on every add — drives the badge bounce animation. */
  addedPulse: number;
  /** False until the cart has been restored from localStorage (avoids hydration mismatch). */
  hydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const MAX_QUANTITY = 50;

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === "string" && typeof v.name === "string" && typeof v.price === "number" && typeof v.quantity === "number";
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedPulse, setAddedPulse] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.filter(isCartItem));
      }
    } catch {
      // Storage unavailable or corrupted — start with an empty cart.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private mode / quota exceeded — the cart still works for this visit.
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity = 1, notes = "") => {
    const cleanNotes = notes.trim();
    const id = cleanNotes ? `${product.id}::${cleanNotes}` : product.id;
    setItems((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + quantity) } : item,
        );
      }
      return [
        ...current,
        {
          id,
          productId: product.id,
          name: product.name,
          portion: product.portion,
          price: product.price,
          priceFrom: product.priceFrom,
          image: product.image,
          imageAlt: product.imageAlt,
          quantity: Math.min(MAX_QUANTITY, quantity),
          notes: cleanNotes,
        },
      ];
    });
    setAddedPulse((n) => n + 1);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen,
      addedPulse,
      hydrated,
    };
  }, [items, addItem, removeItem, updateQuantity, clearCart, isCartOpen, addedPulse, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart trebuie folosit în interiorul <CartProvider>.");
  return ctx;
}
