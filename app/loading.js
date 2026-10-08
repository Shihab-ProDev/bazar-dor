import { GridSkeleton } from "@/components/ProductGrid";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <div className="skeleton h-64 w-full rounded-3xl" />
      <div className="skeleton h-7 w-48" />
      <GridSkeleton />
      <div className="skeleton h-7 w-48" />
      <GridSkeleton />
    </div>
  );
}
