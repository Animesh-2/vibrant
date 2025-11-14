import NurseDashboard from "@/components/dashboard/NurseDashboard";
import { getDashboardSnapshot, getNurseRequests } from "@/lib/api";
import Link from "next/link";

export default async function DashboardPage() {
  const [summary, requests] = await Promise.all([
    getDashboardSnapshot(),
    getNurseRequests(),
  ]);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white">
            Nurse cockpit
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Availability & approvals dashboard
          </h1>
          <p className="text-sm text-white">
            Keep shifts, logistics, and AI verification steps in sync. Slots that you
            confirm here reflect in patient carts immediately.
          </p>
        </div>
        <Link
          href="/dashboard/verification"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-white hover:border-pink-400"
        >
          Go to AI verification →
        </Link>
      </header>

      <NurseDashboard summary={summary} requests={requests} />
    </div>
  );
}
