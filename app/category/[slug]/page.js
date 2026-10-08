import ProductGrid from "@/components/ProductGrid";
import SortSelect from "@/components/SortSelect";
import StateMessage from "@/components/StateMessage";
import { getCategory, getProducts, categoriesFromProducts } from "@/lib/api";
import { fmtNum } from "@/lib/format";

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const { sort = "default" } = await searchParams;

  let category, products;
  try {
    [category, products] = await Promise.all([getCategory(slug), getProducts(slug)]);
  } catch (e) {
    console.error("[bazardor] category page:", e);
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <StateMessage emoji="⚠️" title="ডেটা লোড করা যায়নি" text={process.env.NODE_ENV !== "production" ? e.message : "কিছুক্ষণ পরে আবার চেষ্টা করুন।"} />
      </div>
    );
  }

  if ((!category || !category.name) && products.length) category = categoriesFromProducts(products)[0];

  if (!category || products.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <StateMessage emoji="🧺" title="৪০৪ — কোনো পণ্য পাওয়া যায়নি" text="এই ক্যাটাগরিতে কোনো পণ্য নেই বা ক্যাটাগরিটি সঠিক নয়।" />
      </div>
    );
  }

  // numeric sort (prices are already converted from Bengali digits to numbers)
  const sorted = [...products];
  if (sort === "asc") sorted.sort((a, b) => a.price - b.price);
  if (sort === "desc") sorted.sort((a, b) => b.price - a.price);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-white/70 p-6">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-muted">{fmtNum(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="flex justify-end rounded-2xl border border-line bg-white/70 p-4">
        <SortSelect value={["asc", "desc"].includes(sort) ? sort : "default"} />
      </div>

      <p className="text-sm text-muted">মোট {fmtNum(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={sorted} />
    </div>
  );
}
