import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types";

type CartItem = { product: Product; qty: number };

type CartContextValue = {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function add(product: Product, qty = 1) {
    setItems((prev) => {
      const found = prev.find((p) => p.product.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.product.id === product.id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { product, qty }];
    });
  }

  function remove(productId: string) {
    setItems((prev) => prev.filter((p) => p.product.id !== productId));
  }

  function clear() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
