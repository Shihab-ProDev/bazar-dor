import StateMessage from "@/components/StateMessage";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <StateMessage emoji="🧺" title="৪০৪ — পেজটি পাওয়া যায়নি" text="আপনি যে পেজটি খুঁজছেন তা নেই বা সরিয়ে ফেলা হয়েছে।" />
    </div>
  );
}
