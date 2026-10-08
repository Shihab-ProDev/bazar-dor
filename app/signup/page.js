"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = f.get("name").trim();
    const email = f.get("email").trim();
    const password = f.get("password");
    const confirm = f.get("confirm");

    if (!name) return toast.error("আপনার নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("সঠিক ইমেইল দিন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return toast.error("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    if (error) return toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-2 text-center text-muted">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>

      <div className="mt-6 rounded-2xl border border-line bg-white/70 p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm font-medium">
            নাম
            <input name="name" placeholder="যেমন: রহিম উদ্দিন" className="input mt-1 w-full bg-white" />
          </label>
          <label className="block text-sm font-medium">
            ইমেইল
            <input name="email" type="email" placeholder="you@example.com" className="input mt-1 w-full bg-white" />
          </label>
          <label className="block text-sm font-medium">
            পাসওয়ার্ড
            <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input mt-1 w-full bg-white" />
          </label>
          <label className="block text-sm font-medium">
            পাসওয়ার্ড নিশ্চিত করুন
            <input name="confirm" type="password" placeholder="আবার লিখুন" className="input mt-1 w-full bg-white" />
          </label>
          <button disabled={loading} className="btn w-full border-0 bg-brand text-white shadow-md shadow-brand/30 hover:bg-brand-dark">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="divider my-4 text-xs text-muted">অথবা</div>
        <SocialButtons callbackURL="/" />

        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="text-brand hover:underline">সাইন ইন করুন</Link>
        </p>
      </div>
      <p className="mt-6 text-center text-sm text-muted"><Link href="/">← হোম পেজে ফিরে যান</Link></p>
    </div>
  );
}
