'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopCounters from '@/components/dashboard/TopCounters';
import AISection from '@/components/dashboard/AISection';
import AssignedTasks from '@/components/dashboard/AssignedTasks';
import RecentActivity from '@/components/dashboard/RecentActivity';
import Reminders from '@/components/dashboard/Reminders/Reminders';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // router.replace('/signin');
    }
  }, [router]);

  return (
    <div className=" text-white flex flex-col h-full">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto h-full">
          <div className="max-w-full mx-auto space-y-6">
            <TopCounters />
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1.4fr_0.9fr] gap-6">
              <div className="col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AISection />
                  <AssignedTasks />
                </div>
                <RecentActivity />
              </div>
              <div className="col-span-1">
                <Reminders />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
