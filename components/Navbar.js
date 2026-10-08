"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { bnDate } from "@/lib/format";
import Avatar from "./Avatar";

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন"),
      },
    });
  };

  return (
    <header className="bg-white/70 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-16 sm:h-[68px]">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid place-items-center size-10 rounded-xl bg-brand text-xl">🛒</span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block text-[11px] text-muted" suppressHydrationWarning>{bnDate()}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-9 w-28 rounded-full" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-black/5">
                <Avatar user={user} size={34} />
                <span className="hidden sm:inline text-sm font-medium">{user.name?.split("")}</span>
                <span className="text-[8px] text-muted">▼</span>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-white rounded-xl border border-line shadow-lg w-48 p-2 mt-2 z-50">
                <li><Link href="/profile">আমার প্রোফাইল</Link></li>
                <li><button onClick={handleSignOut} className="text-up">সাইন আউট</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md font-semibold">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-sm sm:btn-md border-0 bg-brand text-white hover:bg-brand-dark shadow-md shadow-brand/30">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-line">
        <ul className="mx-auto max-w-6xl px-4 flex items-center gap-1 overflow-x-auto no-scrollbar h-12">
          {categories.map((c) => {
            const active = pathname === `/category/${c.id}`;
            return (
              <li key={c.id} className="shrink-0">
                <Link
                  href={`/category/${c.id}`}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    active ? "bg-brand text-white" : "hover:bg-black/5"
                  }`}
                >
                  <span>{c.icon}</span>
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
