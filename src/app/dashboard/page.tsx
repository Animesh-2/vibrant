'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // router.replace('/signin');
    }
  }, [router]);

  return (
<<<<<<< Updated upstream
    <div className=" text-white flex flex-col h-full">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto h-full">
          <div className="max-w-full mx-auto space-y-6">
            Dashboard
          </div>
        </main>
      </div>
=======
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
>>>>>>> Stashed changes
    </div>
  );
}
