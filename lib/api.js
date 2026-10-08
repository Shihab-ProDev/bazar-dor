import { normalizeCategory, normalizeProduct } from "./normalize";

const BASE = (process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

async function get(path) {
  if (!BASE) throw new Error("API_BASE_URL is not set in .env");
  const res = await fetch(`${BASE}/api/bazardor${path}`, { next: { revalidate: 300 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

const unwrap = (d) =>
  Array.isArray(d) ? d : d?.data ?? d?.items ?? d?.products ?? d?.categories ?? [];
const one = (d) => (d && !Array.isArray(d) ? d.data ?? d.product ?? d.category ?? d : d);

export async function getCategories() {
  return unwrap(await get("/categories")).map(normalizeCategory);
}

export async function getCategory(id) {
  const d = await get(`/categories/${encodeURIComponent(id)}`);
  return d ? normalizeCategory(one(d)) : null;
}

export async function getProducts(category) {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  const d = await get(`/products${q}`);
  return unwrap(d ?? []).map(normalizeProduct);
}

export async function getProduct(key) {
  try {
    const d = await get(`/products/${encodeURIComponent(key)}`);
    const p = d ? normalizeProduct(one(d)) : null;
    if (p?.name) return p;
  } catch {}
  // fallback: the URL may carry a slug while the API expects an id
  const all = await getProducts();
  return all.find((x) => x.slug === key || x.id === key) ?? null;
}

// Build a category list from products if the categories endpoint is unusable
export function categoriesFromProducts(products) {
  const map = new Map();
  for (const p of products) {
    const c = p.categories[0];
    if (c && !map.has(c.id)) map.set(c.id, { id: c.id, name: c.name ?? c.id, icon: p.categoryIcon });
  }
  return [...map.values()];
}
