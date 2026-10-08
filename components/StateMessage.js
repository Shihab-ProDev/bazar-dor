import Link from "next/link";

export default function StateMessage({ emoji = "🔍", title, text, cta = "হোম পেজে ফিরে যান", href = "/" }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-line bg-white/70 px-6 py-12 text-center">
      <div className="text-5xl">{emoji}</div>
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      {text && <p className="mt-2 text-muted">{text}</p>}
      <Link href={href} className="btn mt-6 border-0 bg-brand text-white hover:bg-brand-dark">{cta}</Link>
    </div>
  );
}
