"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name").trim();
    if (!name) return toast.error("নাম খালি রাখা যাবে না");

    setLoading(true);
    // https://better-auth.com/docs/concepts/users-accounts#update-user
    const { error } = await authClient.updateUser({ name });
    setLoading(false);
    if (error) return toast.error(error.message || "তথ্য আপডেট করা যায়নি");

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-3xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-muted">আপনার নাম পরিবর্তন করুন।</p>

      <div className="mt-6 rounded-2xl border border-line bg-white/70 p-6">
        {isPending ? (
          <div className="skeleton h-28 w-full" />
        ) : (
          <form onSubmit={onSubmit} className="space-y-4" key={session?.user?.name}>
            <label className="block text-sm font-medium">
              নাম
              <input name="name" defaultValue={session?.user?.name ?? ""} className="input mt-1 w-full bg-white" />
            </label>
            <button disabled={loading} className="btn w-full border-0 bg-brand text-white shadow-md shadow-brand/30 hover:bg-brand-dark">
              {loading ? <span className="loading loading-spinner loading-sm" /> : "আপডেট"}
            </button>
          </form>
        )}
      </div>
      <p className="mt-6 text-center text-sm text-muted"><Link href="/profile">← প্রোফাইলে ফিরে যান</Link></p>
    </div>
  );
}
