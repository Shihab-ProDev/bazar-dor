"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect");
  const target = redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//") ? redirectTo : "/";
  const [loading, setLoading] = useState(false);
  const toasted = useRef(false);

  useEffect(() => {
    if (params.get("reason") === "login" && !toasted.current) {
      toasted.current = true;
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    }
  }, [params]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");
    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) return toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(target);
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-3xl font-bold">সাইন ইন</h1>
      <p className="mt-2 text-center text-muted">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>

      <div className="mt-6 rounded-2xl border border-line bg-white/70 p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm font-medium">
            ইমেইল
            <input name="email" type="email" placeholder="you@example.com" className="input mt-1 w-full bg-white" />
          </label>
          <label className="block text-sm font-medium">
            পাসওয়ার্ড
            <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input mt-1 w-full bg-white" />
          </label>
          <button disabled={loading} className="btn w-full border-0 bg-brand text-white shadow-md shadow-brand/30 hover:bg-brand-dark">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
          </button>
        </form>

        <div className="divider my-4 text-xs text-muted">অথবা</div>
        <SocialButtons callbackURL={target} />

        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট নেই? <Link href="/signup" className="text-brand hover:underline">সাইন আপ করুন</Link>
        </p>
      </div>
      <p className="mt-6 text-center text-sm text-muted"><Link href="/">← হোম পেজে ফিরে যান</Link></p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-10"><div className="skeleton h-96 w-full rounded-2xl" /></div>}>
      <SignInForm />
    </Suspense>
  );
}
