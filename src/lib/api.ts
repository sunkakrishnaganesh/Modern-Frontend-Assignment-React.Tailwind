export async function fetchProducts(params: {
  query?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
}) {
  const search = new URLSearchParams();
  if (params.query) search.set("query", params.query);
  if (params.category) search.set("category", params.category);
  search.set("page", String(params.page ?? 1));
  search.set("limit", String(params.limit ?? 9));
  if (params.sort) search.set("sort", params.sort);

  const res = await fetch("/products?" + search.toString());
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(id: string) {
  const res = await fetch(`/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
