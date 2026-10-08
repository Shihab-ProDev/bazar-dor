"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Avatar from "@/components/Avatar";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
      <p className="mt-1 text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      {isPending ? (
        <div className="skeleton mt-6 h-32 w-full rounded-2xl" />
      ) : user ? (
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-white/70 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar user={user} size={80} />
            <div className="min-w-0">
              <p className="truncate text-xl font-semibold">{user.name}</p>
              <p className="truncate text-muted">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/profile/update" className="btn btn-sm sm:btn-md border-0 bg-brand text-white hover:bg-brand-dark">তথ্য আপডেট করুন</Link>
            <button onClick={signOut} className="btn btn-sm sm:btn-md btn-outline border-up text-up hover:bg-up hover:text-white">↩ সাইন আউট</button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-muted">প্রোফাইল দেখতে <Link href="/signin" className="text-brand">সাইন ইন করুন</Link>।</p>
      )}
    </div>
  );
}
