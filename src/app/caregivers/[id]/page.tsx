import NurseSlotPicker from "@/components/caregivers/NurseSlotPicker";
import { getNurseById } from "@/lib/api";
import { ArrowLeft, CheckCircle2, MapPin, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  params: { id: string };
};

export default async function NurseProfilePage({ params }: Props) {
  const nurse = await getNurseById(params.id);
  if (!nurse) notFound();

  return (
    <div className="space-y-8">
      <Link
        href="/caregivers"
        className="flex items-center gap-2 text-sm text-white hover:text-white"
      >
        <ArrowLeft size={16} /> Back to nurse directory
      </Link>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <img
              src={nurse.photo}
              alt={nurse.name}
              className="h-40 w-40 rounded-3xl object-cover"
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-white">{nurse.name}</h1>
              <p className="text-sm text-pink-200">{nurse.specialty}</p>
              <p className="flex items-center gap-2 text-sm text-white">
                <MapPin size={14} /> {nurse.city} | {nurse.experience} yrs exp
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full border border-white/10 px-3 py-1 text-yellow-200">
                  {nurse.rating.toFixed(2)}★ | {nurse.reviews} reviews
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1">
                  ₹{nurse.hourlyRate}/hr
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-teal-200">
                  AI verification ready
                </span>
              </div>
            </div>
          </div>

          <section className="space-y-4 text-sm text-white">
            <p>{nurse.bio}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard
                title="Certifications"
                values={nurse.certifications}
                icon={<Shield size={16} />}
              />
              <InfoCard
                title="Languages"
                values={nurse.languages}
                icon={<CheckCircle2 size={16} />}
              />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Focus areas
            </h2>
            <div className="flex flex-wrap gap-2">
              {nurse.focusTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-4 py-1 text-xs text-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <NurseSlotPicker nurse={nurse} />
          <div className="rounded-3xl border border-dashed border-white/20 bg-black/30 p-4 text-xs text-white">
            Uploads from this nurse route to the AI verification flow before medication
            administration. Track status inside the dashboard.
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  values,
  icon,
}: {
  title: string;
  values: string[];
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-gray-200">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white">
        {icon}
        {title}
      </div>
      <ul className="mt-2 space-y-2">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

