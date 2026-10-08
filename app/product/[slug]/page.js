import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCategories, getProduct } from "@/lib/api";
import { fmtPct, fmtPrice } from "@/lib/format";
import StateMessage from "@/components/StateMessage";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  // Protected route: real session validation on the server
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?reason=login&redirect=${encodeURIComponent(`/product/${slug}`)}`);

  let product, cats;
  try {
    [product, cats] = await Promise.all([getProduct(slug), getCategories()]);
  } catch (e) {
    console.error("[bazardor] product page:", e);
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <StateMessage emoji="⚠️" title="ডেটা লোড করা যায়নি" text={process.env.NODE_ENV !== "production" ? e.message : "কিছুক্ষণ পরে আবার চেষ্টা করুন।"} />
      </div>
    );
  }
  if (!product) notFound();

  const tags = product.categories.map((r) => ({
    id: r.id,
    name: r.name || cats.find((c) => c.id === r.id)?.name || r.id,
  }));
  const up = product.change > 0;
  const down = product.change < 0;

  const summary = [
    { label: "সর্বনিম্ন দাম", value: product.minPrice, note: "সবচেয়ে কম দামের বাজার", color: "text-down" },
    { label: "সর্বাধিক দাম", value: product.maxPrice, note: "সবচেয়ে বেশি দামের বাজার", color: "text-up" },
    { label: "গড় দাম", value: product.avgPrice, note: `প্রতি ${product.unitShort}-এর হিসাবে`, color: "text-down" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted" aria-label="breadcrumb">
        <Link href="/" className="hover:text-ink">হোম</Link>›
        {tags[0] && (<><Link href={`/category/${tags[0].id}`} className="hover:text-ink">{tags[0].name}</Link>›</>)}
        <span className="text-ink">{product.name}</span>
      </nav>

      <section className="flex flex-col gap-6 rounded-2xl border border-line bg-white/70 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-slate-100 text-4xl">{product.emoji}</span>
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted">{product.unitLabel}</p>
            {tags.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Link key={t.id} href={`/category/${t.id}`} className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-brand">
                    {t.name}
                  </Link>
                ))}
              </div>
            )}
            <p className="mt-2 text-sm">
              গতকালের তুলনায় আজ দাম{" "}
              <b>{up ? "বেড়েছে" : down ? "কমেছে" : "অপরিবর্তিত"}</b>
              {product.change !== 0 && <> · {fmtPrice(product.changeAmount)} টাকা</>}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-100 px-8 py-4 text-center">
          <p className="text-sm text-muted">আজকের দাম</p>
          <p className="text-4xl font-bold">{fmtPrice(product.price)}</p>
          <p className="text-sm text-muted">টাকা / {product.unitShort}</p>
          <p className={`mt-1 text-sm font-semibold ${up ? "text-up" : down ? "text-down" : "text-muted"}`}>
            {up ? "▲" : down ? "▼" : "—"} {fmtPct(product.change)}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white/70 p-6">
        <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {summary.map((s) => (
            <div key={s.label} className="rounded-xl border border-line p-4">
              <p className="text-xs text-muted">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{fmtPrice(s.value)} <span className="text-base font-medium">টাকা</span></p>
              <p className="text-xs text-muted">{s.note}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 mt-8 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {product.markets.length === 0 ? (
          <p className="text-muted">বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">বাজার</th>
                  <th className="px-4 py-3 font-medium">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m, i) => (
                  <tr key={i} className="border-t border-ink/80 even:bg-slate-50">
                    <td className="px-4 py-3">{m.name}</td>
                    <td className="px-4 py-3 text-muted">{m.division}</td>
                    <td className="px-4 py-3 text-right">{fmtPrice(m.min)} টাকা</td>
                    <td className="px-4 py-3 text-right">{fmtPrice(m.max)} টাকা</td>
                    <td className="px-4 py-3 text-right font-bold">{fmtPrice(m.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
