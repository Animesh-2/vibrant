'use client';

import type { Nurse } from "@/data/mockData";
import NurseCard from "@/components/NurseCard";
import { useMemo, useState } from "react";

type Props = {
  nurses: Nurse[];
};

const cityFilters = ["All", "Mumbai", "Delhi", "Bengaluru", "Chennai"];
const specialtyFilters = [
  "Critical Care",
  "Pediatric",
  "Oncology",
  "Geriatric",
  "Physiotherapy",
];

export default function NurseDirectory({ nurses }: Props) {
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
      const matchesCity = city === "All" ? true : nurse.city === city;
      const matchesSpecialty =
        specialty === "All" ||
        nurse.specialty.toLowerCase().includes(specialty.toLowerCase());
      const matchesRating = nurse.rating >= minRating;
      return matchesQuery && matchesCity && matchesSpecialty && matchesRating;
    });
  }, [nurses, query, city, specialty, minRating]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Search
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ventilator, pediatrics, chemo..."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white focus:border-pink-400 focus:outline-none"
            />
          </label>
        </div>
        <FilterSelect
          label="City"
          value={city}
          options={cityFilters}
          onChange={setCity}
        />
        <FilterSelect
          label="Specialty"
          value={specialty}
          options={["All", ...specialtyFilters]}
          onChange={setSpecialty}
        />
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-gray-400">
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

      <p className="text-sm text-gray-400">
        Showing {filtered.length} nurse{filtered.length === 1 ? "" : "s"} with AI
        verification enabled.
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((nurse) => (
          <NurseCard key={nurse.id} nurse={nurse} />
        ))}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-xs uppercase tracking-[0.3em] text-gray-400">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-white focus:border-pink-400 focus:outline-none"
      >
        {options.map((option) => (
          <option className="bg-[#05080f]" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

