import "./globals.css";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker, { TickerSkeleton } from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategories, getProducts, categoriesFromProducts } from "@/lib/api";

const font = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজার দর।",
};

export default async function RootLayout({ children }) {
  let categories = [];
  try {
    categories = await getCategories();
  } catch (e) {
    console.error("[bazardor] categories:", e.message);
  }
  if (!categories.length || categories.some((c) => !c.name)) {
    try {
      categories = categoriesFromProducts(await getProducts());
    } catch {}
  }

  return (
    <html lang="bn" data-theme="light">
      <body className={`${font.className} min-h-screen flex flex-col`}>
        <Navbar categories={categories} />
        <Suspense fallback={<TickerSkeleton />}>
          <Ticker />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
