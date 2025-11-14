import VerificationFlow from "@/components/dashboard/VerificationFlow";
import { getAiVerificationTasks } from "@/lib/api";
import Link from "next/link";

export default async function VerificationPage() {
  const tasks = await getAiVerificationTasks();

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white">
            AI verification
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Upload evidence before procedures
          </h1>
          <p className="text-sm text-white">
            Each upload is scanned for labels, dosage, and expiry before you can proceed
            with medicine administration.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-white hover:border-pink-400"
        >
          Back to dashboard →
        </Link>
      </header>

      <VerificationFlow tasks={tasks} />
    </div>
  );
}

