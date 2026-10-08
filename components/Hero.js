import { bnDate } from "@/lib/format";

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
        <div className="flex justify-center">
          <svg viewBox="0 0 320 260" className="w-64 sm:w-80" role="img" aria-label="সবজির ঝুড়ি">
            <ellipse cx="170" cy="238" rx="120" ry="14" fill="#e5e7eb" />
            <circle cx="115" cy="95" r="42" fill="#ef4444" />
            <circle cx="190" cy="82" r="44" fill="#22c55e" />
            <circle cx="90" cy="135" r="26" fill="#a855f7" />
            <circle cx="148" cy="125" r="24" fill="#f97316" />
            <circle cx="225" cy="120" r="26" fill="#f59e0b" />
            <path d="M190 40c0-14 8-22 14-28M190 40c-8-10-8-20-2-28" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M52 140h232l-24 92H78z" fill="#b45309" />
            <rect x="46" y="130" width="244" height="20" rx="6" fill="#92400e" />
            {[110, 150, 190, 230].map((x) => (
              <path key={x} d={`M${x} 150l-6 82`} stroke="#78350f" strokeWidth="3" />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
