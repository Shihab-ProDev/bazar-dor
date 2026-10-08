import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-line bg-white/70 p-4">
          <div className="flex items-center gap-3">
            <div className="skeleton size-12 rounded-xl" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-28" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="space-y-2">
              <div className="skeleton h-3 w-14" />
              <div className="skeleton h-6 w-24" />
            </div>
            <div className="skeleton h-6 w-14 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
