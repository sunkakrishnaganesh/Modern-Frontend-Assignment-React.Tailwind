import { useEffect, useState } from "react";
import { fetchProducts } from "../../lib/api";
import { Product } from "../../types";

export function useProducts() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(9);

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchProducts({ query, category, page, limit, sort })
      .then((res) => {
        // support multiple possible shapes from MSW/mock
        // some mocks return { items: [...], total } or { data: [...], total } or { products: [...] }
        const items = (res && (res.items || res.data || res.products)) || [];
        setProducts(items);
        setTotal(res.total || 0);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, [query, category, sort, page, limit]);

  return {
    products,
    total,
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
  };
}
