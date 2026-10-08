// The API field names are normalised in ONE place. If your JSON uses different
// keys, add them to the pick(...) lists below.
const BN = "০১২৩৪৫৬৭৮৯";

// Converts 148, "148", "১৪৮", "১,৮৫০" -> number (needed for correct sorting)
export function toNum(v) {
  if (v == null || v === "") return 0;
  if (typeof v === "number") return v;
  const s = String(v)
    .replace(/[০-৯]/g, (d) => BN.indexOf(d))
    .replace(/,/g, "")
    .replace(/[^\d.\-]/g, "");
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

const pick = (o, ...keys) => {
  for (const k of keys) if (o?.[k] != null) return o[k];
  return undefined;
};

function trendSign(o) {
  const t = String(pick(o, "trend", "direction", "changeType", "change_type", "status") ?? "").toLowerCase();
  if (/up|rise|inc|বাড়/.test(t)) return 1;
  if (/down|fall|dec|drop|কম/.test(t)) return -1;
  if (/flat|same|stable|none|neutral/.test(t)) return 0;
  return null;
}

export function normalizeCategory(c) {
  return {
    id: String(pick(c, "id", "slug", "_id")),
    name: pick(c, "nameBn", "name_bn", "name", "title", "label") ?? "",
    icon: pick(c, "emoji", "icon", "image") ?? "🛒",
  };
}

function refs(raw) {
  if (raw == null) return [];
  const arr = Array.isArray(raw) ? raw : [raw];
  return arr.map((r) =>
    typeof r === "object"
      ? { id: String(pick(r, "id", "slug", "_id")), name: pick(r, "nameBn", "name", "title") }
      : { id: String(r), name: undefined }
  );
}

const UNITS = { kg: "কেজি", litre: "লিটার", liter: "লিটার", dozen: "ডজন", piece: "পিস", pcs: "পিস" };

export function normalizeProduct(p) {
  const price = toNum(pick(p, "today", "price", "todayPrice", "today_price", "currentPrice", "current_price", "avgPrice"));
  let change;
  if (p.change && typeof p.change === "object") {
    // { dir: "up" | "down" | "flat", pct: 2.1 }
    const pct = Math.abs(toNum(p.change.pct));
    change = p.change.dir === "up" ? pct : p.change.dir === "down" ? -pct : 0;
  } else {
    change = toNum(pick(p, "changePercent", "change_percent", "percentChange", "percent", "changePct", "change"));
    const s = trendSign(p);
    if (s === 0) change = 0;
    else if (s !== null) change = Math.abs(change) * s;
  }

  const prev = pick(p, "yesterday", "previousPrice", "previous_price", "yesterdayPrice", "yesterday_price", "prevPrice");
  const changeAmount =
    pick(p, "changeAmount", "change_amount") != null
      ? Math.abs(toNum(pick(p, "changeAmount", "change_amount")))
      : prev != null
      ? Math.abs(price - toNum(prev))
      : Math.round(Math.abs(price - price / (1 + change / 100)));

  const rawUnit = String(pick(p, "unit", "unitBn", "unit_bn") ?? "কেজি").trim();
  const unitShort = UNITS[rawUnit.toLowerCase()] ?? rawUnit.replace(/^প্রতি\s*/, "");

  const marketsRaw = pick(p, "markets", "marketPrices", "market_prices", "bazars", "bazaars") ?? [];
  const markets = (Array.isArray(marketsRaw) ? marketsRaw : []).map((m) => {
    const min = toNum(pick(m, "min", "minPrice", "min_price", "lowest"));
    const max = toNum(pick(m, "max", "maxPrice", "max_price", "highest"));
    return {
      name: pick(m, "name", "market", "bazar", "bazarName", "marketName", "market_name") ?? "",
      division: pick(m, "division", "region", "location", "area", "city") ?? "",
      min,
      max,
      avg: toNum(pick(m, "avg", "average", "avgPrice", "avg_price", "price")) || (min + max) / 2,
    };
  });

  const mins = markets.map((m) => m.min).filter(Boolean);
  const maxs = markets.map((m) => m.max).filter(Boolean);
  const avgs = markets.map((m) => m.avg).filter(Boolean);

  return {
    id: String(pick(p, "id", "slug", "_id")),
    name: pick(p, "nameBn", "name_bn", "name", "title") ?? "",
    emoji: pick(p, "emoji", "image", "icon", "thumbnail") ?? "🛒",
    slug: String(pick(p, "slug", "id", "_id")),
    unitLabel: `প্রতি ${unitShort}`,
    categoryIcon: pick(p, "categoryIcon", "category_icon") ?? "🛒",
    unitShort,
    price,
    change,
    changeAmount,
    categories: refs(pick(p, "categories", "category", "categoryId", "category_id", "tags")).map((r, i) => ({
      ...r,
      name: r.name ?? (i === 0 ? pick(p, "categoryNameBn", "categoryName", "category_name") : undefined),
    })),
    markets,
    minPrice: toNum(pick(p, "minPrice", "min_price", "min")) || (mins.length ? Math.min(...mins) : price),
    maxPrice: toNum(pick(p, "maxPrice", "max_price", "max")) || (maxs.length ? Math.max(...maxs) : price),
    // the Figma shows today's price as the average
    avgPrice: toNum(pick(p, "avgPrice", "avg_price", "average", "avg")) || price,
  };
}
