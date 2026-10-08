import { GridSkeleton } from "@/components/ProductGrid";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div className="skeleton h-24 w-full rounded-2xl" />
      <div className="skeleton h-16 w-full rounded-2xl" />
      <GridSkeleton count={6} />
    </div>
  );
}
