import React from "react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import { getDevices } from "../lib/api";
import DeviceCard from "../components/DeviceCard";

export default async function HomePage() {
  const devices = await getDevices();

  return (
<<<<<<< Updated upstream
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
=======
    <div className="space-y-16">
      {/* HERO */}
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%),_linear-gradient(120deg,_rgba(255,115,179,0.25),_rgba(124,58,237,0.15)_60%,_rgba(14,165,233,0.15)_90%)] p-6 text-white sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-pink-200">
              VIBRANT Health Stack
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Rent medical devices, hire caregivers, and unlock AI-verified
              nursing actions in one flow.
            </h1>

            <p className="mt-6 text-lg text-white/80">
              From ICU ventilators to pediatric nurses, VIBRANT keeps families,
              hospitals, and homecare teams aligned. Manage carts, approvals,
              and time slots without juggling multiple tools.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <Link
                href="/devices"
                className="rounded-xl bg-white/90 px-5 py-3 font-semibold text-black shadow-lg shadow-pink-500/20 transition hover:translate-y-0.5"
              >
                Explore devices
              </Link>

              <Link
                href="/caregivers"
                className="rounded-xl border border-white/30 px-5 py-3 font-semibold text-white backdrop-blur hover:border-white"
              >
                Browse caregivers
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 grid gap-6 text-sm text-white/80 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/70">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="rounded-3xl border border-white/15 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              Instant search
            </p>

            <SearchBar />

            <div className="mt-6 space-y-3 text-xs text-white/70">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                <span>Cart & checkout</span>
                <span className="text-xs text-white/60">
                  Devices + nurses
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                <span>AI verification</span>
                <span className="text-teal-200">Live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEVICE SECTION */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white">
              Device marketplace
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              ICU-grade hardware available on-demand
            </h2>
          </div>

          <Link
>>>>>>> Stashed changes
            href="/devices"
            className="text-sm text-gray-400 hover:text-pink-400 transition-all"
          >
            See all →
          </Link>
        </div>

<<<<<<< Updated upstream
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {devices.slice(0, 6).map((d) => (
            <DeviceCard key={d.id} device={d} />
=======
        <div className="grid gap-6 lg:grid-cols-3">
          {devices.slice(0, 3).map((device) => (
            <DeviceCard key={device.id} device={device} />
>>>>>>> Stashed changes
          ))}
        </div>
      </section>

<<<<<<< Updated upstream
=======
      {/* NURSE SECTION */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Care team
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              Book nurses & caregivers with live availability
            </h2>
          </div>

          <Link
            href="/caregivers"
            className="text-sm text-pink-300 hover:text-pink-200"
          >
            View nurse directory →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nurses.slice(0, 3).map((nurse) => (
            <NurseCard key={nurse.id} nurse={nurse} />
          ))}
        </div>
      </section>

      {/* FEATURE PILLARS */}
      <section className="grid gap-6 lg:grid-cols-3">
        {featurePillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-black/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white">
              {pillar.title}
            </h3>

            <p className="mt-3 text-sm text-white/70">
              {pillar.description}
            </p>

            <div className="mt-4 h-px w-12 bg-gradient-to-r from-pink-500 to-transparent" />

            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-pink-200">
              End-to-end visibility
            </p>
          </div>
        ))}
      </section>
>>>>>>> Stashed changes
    </div>
  );
}
