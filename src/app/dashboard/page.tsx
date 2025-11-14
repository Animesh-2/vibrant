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
    <div className=" text-white flex flex-col h-full">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto h-full">
          <div className="max-w-full mx-auto space-y-6">
            Dashboard
          </div>
        </main>
      </div>
    </div>
  );
}
