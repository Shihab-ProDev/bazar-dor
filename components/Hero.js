import { bnDate } from "@/lib/format";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-line bg-white/70 p-6 sm:p-10">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-brand" suppressHydrationWarning>
            {bnDate()}
          </span>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-4 text-muted">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn mt-6 border-0 bg-brand text-white shadow-md shadow-brand/30 hover:bg-brand-dark"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image src="/hero.png" alt="সবজির ঝুড়ি" width={400} height={320} className="w-64 sm:w-80 h-auto" priority />
        </div>
      </div>
    </section>
  );
}
