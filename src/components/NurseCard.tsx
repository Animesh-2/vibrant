import type { Nurse } from "@/data/mockData";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";

type Props = {
  nurse: Nurse;
};

export default function NurseCard({ nurse }: Props) {
  return (
    <Link
      href={`/caregivers/${nurse.id}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-black/40 p-4 text-sm text-gray-300 transition hover:-translate-y-1 hover:border-pink-400/60"
    >
      <div className="flex items-center gap-4">
        <img
          src={nurse.photo}
          alt={nurse.name}
          className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/20"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white">{nurse.name}</h3>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] uppercase tracking-wide text-pink-200">
              {nurse.specialty}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-2 text-xs text-gray-400">
            <MapPin size={14} /> {nurse.city}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-wider text-gray-400">
        <span className="flex items-center gap-1 text-white">
          <Star className="h-3 w-3 text-yellow-300" /> {nurse.rating.toFixed(2)}
        </span>
        <span>{nurse.experience} yrs exp</span>
        <span>₹{nurse.hourlyRate}/hr</span>
      </div>

      <p className="mt-3 text-sm text-gray-300">
        {nurse.bio.length > 110 ? `${nurse.bio.slice(0, 107)}...` : nurse.bio}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {nurse.focusTags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1 text-[11px]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-white">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-gray-400">
            Next slot
          </p>
          <p>{nurse.availability[0]?.slots[0] ?? "On request"}</p>
        </div>
        <span className="rounded-full border border-pink-400/60 px-3 py-1 text-[11px] font-semibold text-pink-200 group-hover:bg-pink-500/10">
          View profile
        </span>
      </div>
    </Link>
  );
}

