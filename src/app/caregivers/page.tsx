import NurseDirectory from "@/components/caregivers/NurseDirectory";
import { getNurses } from "@/lib/api";
import Link from "next/link";

export default async function CaregiversPage() {
  const nurses = await getNurses();

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white">
            Care team marketplace
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Hire verified nurses & caregivers
          </h1>
          <p className="text-sm text-white">
            Filter by city, specialty, hourly rate, and AI verification readiness. Every
            nurse shown below has completed KYC, background checks, and skills assessments.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-white hover:border-pink-400"
        >
          Nurse dashboard →
        </Link>
      </header>

      <NurseDirectory nurses={nurses} />
    </div>
  );
}
