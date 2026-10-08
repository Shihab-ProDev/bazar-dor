import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { fmtPrice } from "@/lib/format";

export default function ProductCard({ p }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-line bg-white/70 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-2xl">{p.emoji}</span>
        <div className="min-w-0">
          <h3 className="truncate font-bold leading-tight">{p.name}</h3>
          <p className="text-sm text-muted">{p.unitLabel}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-xl font-bold">
            {fmtPrice(p.price)} <span className="text-base font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge pct={p.change} />
      </div>
    </Link>
  );
}
