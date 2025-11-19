import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "./useproducts";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { pushToast } from "../../components/Toast";
import Modal from "../../components/Modal";
import SkeletonCard from "../../components/SkeletonCard";

export default function ProductList() {
  const {
    products = [],
    total = 0,
    loading,
    error,
    query,
    setQuery,
    category,
    setCategory,
    sort,
    setSort,
    page,
    setPage,
    limit,
  } = useProducts();

  const { add } = useCart();
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / (limit || 1)));

  const categories: string[] = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category && typeof p.category === "string") set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  // FRONTEND SORTING (reliable)
  const sortedProducts = useMemo(() => {
    const list = [...(products || [])];
    if (sort === "price_asc" || sort === "price-asc") {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === "price_desc" || sort === "price-desc") {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    return list;
  }, [products, sort]);

  function onAddToCart(product: Product) {
    if (!product.inStock) {
      pushToast("Product is out of stock", "error");
      return;
    }
    add(product, 1);
    pushToast(`${product.name} added to cart`, "success");
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 text-gray-900 dark:text-gray-200">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Products</h1>
          <p className="text-gray-500 dark:text-gray-400">Clean listings with images, modal and filters.</p>
        </div>

        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search products..."
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button
          onClick={() => { setCategory(""); setPage(1); }}
          className={`px-3 py-1 rounded-full border text-sm ${!category ? "bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300" : "bg-white dark:bg-gray-800 dark:border-gray-700"}`}
        >
          All
        </button>

        {categories.map((c) => (
          <button
            key={c}
            onClick={() => { setCategory(c); setPage(1); }}
            className={`px-3 py-1 rounded-full border text-sm ${category === c ? "bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300" : "bg-white dark:bg-gray-800 dark:border-gray-700"}`}
          >
            {c}
          </button>
        ))}

        <div className="flex-1" />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-sm"
        >
          <option value="">Sort</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      {error && <div className="mt-6 text-red-600 dark:text-red-400 font-medium">{error}</div>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : sortedProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  <img
                    src={product.imageUrl || `https://picsum.photos/seed/${product.id}/600/400`}
                    alt={product.name}
                    className="w-full h-44 object-cover transition dark:brightness-[0.7] dark:saturate-50"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x400?text=No+Image"; }}
                  />

                  <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={() => setOpenProduct(product)} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-3 py-1 rounded-lg text-sm shadow border dark:border-gray-600 hover:scale-105 transition">View</button>

                    <button onClick={() => onAddToCart(product)} disabled={!product.inStock}
                      className={`px-3 py-1 rounded-lg text-sm shadow ${product.inStock ? "bg-red-600 text-white hover:scale-105" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}>
                      Add
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-2xl font-bold dark:text-red-300">₹{product.price}</p>

                    <span className={`px-2 py-1 text-xs rounded-full ${product.inStock ? "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300" : "bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <Link to={`/products/${product.id}`} className="text-sm text-gray-700 dark:text-gray-300 underline">Open page</Link>

                    <button onClick={() => onAddToCart(product)} disabled={!product.inStock} className="ml-auto px-3 py-1 rounded border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                      Quick add
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-10">
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 border rounded disabled:opacity-50">Prev</button>
        <span>Page <strong>{page}</strong> of <strong>{totalPages}</strong></span>
        <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-4 py-2 border rounded disabled:opacity-50">Next</button>
      </div>

      <Modal open={!!openProduct} onClose={() => setOpenProduct(null)}>
        {openProduct && (
          <div className="flex gap-6 text-gray-900 dark:text-gray-200">
            <img src={openProduct.imageUrl || `https://picsum.photos/seed/${openProduct.id}/600/400`} className="w-1/3 h-48 object-cover rounded-lg dark:brightness-75 dark:saturate-50" alt={openProduct.name} />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{openProduct.name}</h2>
              <p className="text-gray-500 dark:text-gray-300">{openProduct.category}</p>
              <div className="text-3xl font-extrabold mt-4 text-red-600 dark:text-red-300">₹{openProduct.price}</div>
              <button onClick={() => { onAddToCart(openProduct); setOpenProduct(null); }} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md">Add to Cart</button>
              <p className="mt-4">{openProduct.description || "No description available."}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
