"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const cityOptions = [
  "All cities",
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
];

const categoryOptions = [
  { label: "All devices", value: "" },
  { label: "Respiratory", value: "Respiratory" },
  { label: "Monitoring", value: "Monitoring" },
  { label: "Infusion", value: "Infusion" },
  { label: "Diagnostics", value: "Diagnostics" },
  { label: "Patient Care", value: "Patient Care" },
];

export default function SearchBar() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState<"budget" | "premium" | "">("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city && city !== "All cities") params.set("city", city);
    if (category) params.set("category", category);
    if (query) params.set("query", query);
    if (price) params.set("price", price);

    const queryString = params.toString();
    router.push(queryString ? `/devices?${queryString}` : "/devices");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm md:grid-cols-5"
    >
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white">
          City
        </label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white focus:border-pink-400 focus:outline-none"
        >
          {cityOptions.map((option) => (
            <option
              className="bg-[#05080f]"
              value={option === "All cities" ? "" : option}
              key={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white">
          Device
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white focus:border-pink-400 focus:outline-none"
        >
          {categoryOptions.map((option) => (
            <option
              className="bg-[#05080f]"
              key={option.label}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white">
          Keyword
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ventilator, monitor..."
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-white focus:border-pink-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white">
          Pricing
        </label>
        <div className="mt-1 grid grid-cols-2 gap-2">
          {[
            { label: "Budget < ₹1k", value: "budget" },
            { label: "Premium devices for ICU rentals", value: "premium" },
          ].map((option) => (
            <div key={option.value} className="relative group">
              <button
                type="button"
                onClick={() =>
                  setPrice((prev) =>
                    prev === option.value
                      ? ""
                      : (option.value as "budget" | "premium")
                  )
                }
                className={`w-full rounded-xl border px-2 py-2 text-xs font-semibold transition whitespace-nowrap overflow-hidden text-ellipsis ${
                  price === option.value
                    ? "border-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                    : "border-white/15 bg-black/20 text-white hover:border-white/40"
                }`}
              >
                {option.label}
              </button>

              {/* Tooltip on hover */}
              <span className="pointer-events-none absolute left-1/2 top-full z-30 hidden -translate-x-1/2 mt-1 w-max max-w-xs rounded-lg bg-black/90 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-end gap-2">
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:shadow-pink-500/40"
        >
          Search devices
        </button>
        <button
          type="button"
          onClick={() => {
            setCity("");
            setCategory("");
            setQuery("");
            setPrice("");
            router.push("/devices");
          }}
          className="text-xs text-white underline decoration-dotted underline-offset-4 hover:text-white"
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}
