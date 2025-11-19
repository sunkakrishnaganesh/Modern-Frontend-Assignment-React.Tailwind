import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { items } = useCart();
  const totalQty = items.reduce((s, it) => s + it.qty, 0);

  const [dark, setDark] = useState<boolean>(() =>
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">🛍️ Listings</div>
          <nav className="hidden md:flex gap-4 text-sm text-gray-600 dark:text-gray-300">
            <a className="hover:underline">Products</a>
            <a className="hover:underline">Categories</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-xl"
            title="Toggle theme"
          >
            {dark ? "🌙" : "☀️"}
          </button>

          <div className="relative">
            <button className="px-3 py-1 rounded-md border bg-white dark:bg-gray-800 flex items-center gap-2">
              🧾 Cart
              <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
                {totalQty}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
