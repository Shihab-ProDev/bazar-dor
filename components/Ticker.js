import { getProducts } from "@/lib/api";
import { fmtNum, fmtPct } from "@/lib/format";

export function TickerSkeleton() {
  return <div className="h-[38px] border-b border-line bg-white/70"><div className="skeleton h-full w-full rounded-none" /></div>;
}

export default async function Ticker() {
  let products = [];
  try {
    products = await getProducts();
  } catch {
    return null;
  }
  if (!products.length) return null;
  const items = [...products, ...products];

  return (
    <div className="marquee overflow-hidden border-b border-line bg-white/70 text-sm" aria-label="দামের তালিকা">
      <div className="marquee-track">
        {items.map((p, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap px-5 py-2 border-r border-line">
            <span>{p.emoji}</span>
            <span className="font-medium">{p.name}</span>
            <span className="text-muted">{fmtNum(p.price)} টাকা/{p.unitShort}</span>
            {p.change > 0 && <span className="font-semibold text-up">▲ {fmtPct(p.change)}</span>}
            {p.change < 0 && <span className="font-semibold text-down">▼ {fmtPct(p.change)}</span>}
            {p.change === 0 && <span className="text-muted">— {fmtPct(0)}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
