"use client";
import { useRouter, usePathname } from "next/navigation";

export default function SortSelect({ value }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      সাজান
      <select
        value={value}
        onChange={(e) => router.replace(e.target.value === "default" ? pathname : `${pathname}?sort=${e.target.value}`, { scroll: false })}
        className="select select-sm bg-white text-ink"
      >
        <option value="default">ডিফল্ট</option>
        <option value="asc">দাম: কম থেকে বেশি</option>
        <option value="desc">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}
