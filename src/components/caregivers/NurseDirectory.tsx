'use client';

import NurseCard from "@/components/NurseCard";
import { useMemo, useState } from "react";

type Nurse = {
  id: string;
  name: string;
  city: string;
  specialty: string;
  experience: number;
  hourlyRate: number;
  rating: number;
  reviews: number;
  skills: string[];
  bio: string;
  photo: string;
};

type Props = {
  nurses: Nurse[];
};

export default function NurseDirectory({ nurses }: Props) {
  // Build dynamic city list from API
  const cityFilters = ["All", ...new Set(nurses.map((n) => n.city))];

  const specialtyFilters = [
    "All",
    ...new Set(nurses.map((n) => n.specialty)),
  ];

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All");
  const [specialty, setSpecialty] = useState("All");
  const [minRating, setMinRating] = useState(4.8);

  const filtered = useMemo(() => {
    return nurses.filter((nurse) => {
      const matchesQuery = query
        ? nurse.name.toLowerCase().includes(query.toLowerCase()) ||
          nurse.specialty.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesCity = city === "All" || nurse.city === city;

      const matchesSpecialty =
        specialty === "All" ||
        nurse.specialty.toLowerCase().includes(specialty.toLowerCase());

      const matchesRating = nurse.rating >= minRating;

      return matchesQuery && matchesCity && matchesSpecialty && matchesRating;
    });
  }, [nurses, query, city, specialty, minRating]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
        {/* Search */}
        <div className="md:col-span-2">
          <label className="text-xs uppercase tracking-[0.3em] text-white">
            Search
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Wound care, monitoring..."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white focus:border-pink-400 focus:outline-none"
            />
          </label>
        </div>

        {/* Dynamic City Filter */}
        <FilterSelect
          label="City"
          value={city}
          options={cityFilters}
          onChange={setCity}
        />

        {/* Dynamic Specialty Filter */}
        <FilterSelect
          label="Specialty"
          value={specialty}
          options={specialtyFilters}
          onChange={setSpecialty}
        />

        {/* Rating Filter */}
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-white">
            Min rating {minRating.toFixed(1)}★
            <input
              type="range"
              min={4.5}
              max={5}
              step={0.05}
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="mt-3 w-full"
            />
          </label>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-white">
        Showing {filtered.length} nurse{filtered.length === 1 ? "" : "s"}.
      </p>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((nurse) => (
          <NurseCard key={nurse.id} nurse={nurse} />
        ))}
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="text-xs uppercase tracking-[0.3em] text-white">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-white focus:border-pink-400 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#05080f]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
