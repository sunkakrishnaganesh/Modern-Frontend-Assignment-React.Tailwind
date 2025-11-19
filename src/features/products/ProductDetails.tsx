import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../../lib/api";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { pushToast } from "../../components/Toast";
import SkeletonCard from "../../components/SkeletonCard";

export default function ProductDetails() {
  const { id } = useParams();
  const { add } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    fetchProductById(id)
      .then((res) => {
        const p = res?.item || res?.product || res || null;
        setProduct(p);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAdd() {
    if (!product) return;
    if (!product.inStock) {
      pushToast("Product is out of stock", "error");
      return;
    }
    add(product, 1);
    pushToast(`${product.name} added to cart`, "success");
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link to="/" className="text-red-600 underline">← Back</Link>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <SkeletonCard />
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Product not found</h2>
        <Link to="/" className="text-red-600 underline mt-4 block">← Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link to="/" className="text-red-600 underline text-sm">← Back to products</Link>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg mt-6 border border-gray-200 dark:border-gray-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img src={product.imageUrl || `https://picsum.photos/seed/${product.id}/600/400`} alt={product.name}
                 onError={(e) => ((e.target as HTMLImageElement).src = "https://via.placeholder.com/600x400?text=No+Image")}
                 className="w-full h-64 md:h-72 object-cover rounded-xl shadow-md transition dark:brightness-[0.75] dark:saturate-50" />
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{product.category || "Uncategorized"}</p>
            <div className="text-4xl font-extrabold mt-4 text-red-600 dark:text-red-300">₹{product.price}</div>

            <span className={`mt-4 inline-block px-4 py-1 rounded-full text-sm font-medium ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>

            <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">{product.description || "No description available."}</p>

            <button onClick={handleAdd} className="mt-6 px-6 py-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">Showing details for product #{product.id}</div>
    </div>
  );
}
