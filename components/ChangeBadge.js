import { fmtPct } from "@/lib/format";

// Colours follow the Figma: price up = red, price down = green, flat = gray.
export default function ChangeBadge({ pct }) {
  if (pct > 0)
    return <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-up">▲ {fmtPct(pct)}</span>;
  if (pct < 0)
    return <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-down">▼ {fmtPct(pct)}</span>;
  return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-muted">— {fmtPct(0)}</span>;
}
