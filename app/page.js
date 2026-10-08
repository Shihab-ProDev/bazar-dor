import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import StateMessage from "@/components/StateMessage";
import { getProducts } from "@/lib/api";
import { fmtNum } from "@/lib/format";

export const revalidate = 300; // refresh prices every 5 min

export default async function HomePage() {
  let products;
  try {
    products = await getProducts();
  } catch (e) {
    console.error("[bazardor] home page:", e);
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <StateMessage emoji="⚠️" title="ডেটা লোড করা যায়নি" text={process.env.NODE_ENV !== "production" ? e.message : "কিছুক্ষণ পরে আবার চেষ্টা করুন।"} cta="আবার চেষ্টা করুন" />
      </div>
    );
  }

  const risers = products.filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = products.filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8">
      <Hero />

      <section>
        <h2 className="mb-4 text-2xl font-bold"><span className="mr-2 text-base text-up">▲</span>আজ দাম বেড়েছে</h2>
        <ProductGrid products={risers} />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold"><span className="mr-2 text-base text-down">▼</span>আজ দাম কমেছে</h2>
        <ProductGrid products={fallers} />
      </section>

      <section id="সব-পণ্য">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-1 text-sm text-muted">মোট {fmtNum(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
