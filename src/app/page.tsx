import DeviceCard from "@/components/DeviceCard";
import NurseCard from "@/components/NurseCard";
import SearchBar from "@/components/SearchBar";
import { getDevices, getNurses } from "@/lib/api";
import Link from "next/link";

const heroStats = [
  { label: "AI-verified nurse actions", value: "3.2k+" },
  { label: "Cities served", value: "42" },
  { label: "Critical devices on standby", value: "160+" },
];

const featurePillars = [
  {
    title: "Rent medical devices",
    description:
      "ICU ventilators, infusion pumps, monitors, and therapy beds ready with NABL-backed maintenance.",
  },
  {
    title: "Hire vetted caregivers",
    description:
      "Nurses, caregivers, physios, and respiratory therapists with live calendars and background checks.",
  },
  {
    title: "AI assurance",
    description:
      "Every injection, medication, and device setup is verified through computer vision before execution.",
  },
];

export default async function HomePage() {
  const [devices, nurses] = await Promise.all([getDevices(), getNurses()]);

  return (
    <div className="space-y-16">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%),_linear-gradient(120deg,_rgba(255,115,179,0.25),_rgba(124,58,237,0.15)_60%,_rgba(14,165,233,0.15)_90%)] p-6 text-white sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-pink-200">
              VIBRANT Health Stack
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
              Rent medical devices, hire caregivers, and unlock AI-verified
              nursing actions in one flow.
            </h1>
            <p className="mt-6 text-lg text-gray-200">
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

            <div className="mt-10 grid gap-6 text-sm text-gray-200 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
              Instant search
            </p>
            <SearchBar />
            <div className="mt-6 space-y-3 text-xs text-gray-400">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                <span>Cart & checkout</span>
                <span className="text-xs text-gray-400">Devices + nurses</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>AI verification</span>
                <span className="text-teal-200">Live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
              Device marketplace
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              ICU-grade hardware available on-demand
            </h2>
          </div>
          <Link
            href="/devices"
            className="text-sm text-pink-300 hover:text-pink-200"
          >
            See full catalog →
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {devices.slice(0, 3).map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
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

      <section className="grid gap-6 lg:grid-cols-3">
        {featurePillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-black/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
            <p className="mt-3 text-sm text-gray-300">{pillar.description}</p>
            <div className="mt-4 h-px w-12 bg-gradient-to-r from-pink-500 to-transparent" />
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-pink-200">
              End-to-end visibility
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
