import React from "react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import { getDevices } from "../lib/api";
import DeviceCard from "../components/DeviceCard";

export default async function HomePage() {
  const devices = await getDevices();

  return (
    <div className="space-y-10">

      {/* HERO SECTION */}
      <section className="rounded-xl p-10 bg-gradient-to-br from-pink-600/20 via-purple-700/10 to-slate-900 border border-white/10 shadow-[0_0_30px_rgba(255,0,150,0.15)] backdrop-blur-lg">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
          MerilCare — Rent medical equipment & book caregivers
        </h1>

        <p className="mt-3 text-gray-300 text-lg max-w-2xl">
          Find ventilators, infusion pumps, oxygen concentrators, and verified
          nurses — fast and reliable, all in one place.
        </p>

        <div className="mt-8">
          <SearchBar />
        </div>
      </section>

      {/* FEATURED */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            Featured devices
          </h2>

          <Link 
            href="/devices"
            className="text-sm text-gray-400 hover:text-pink-400 transition-all"
          >
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {devices.slice(0, 6).map((d) => (
            <DeviceCard key={d.id} device={d} />
          ))}
        </div>
      </section>

    </div>
  );
}
