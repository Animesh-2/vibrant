<<<<<<< Updated upstream
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const router = useRouter()

  function onSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (category) params.set('category', category)
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    router.push(`/devices?${params.toString()}`)
  }

  return (
    <form onSubmit={onSearch} className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
      <input value={city} onChange={e => setCity(e.target.value)} placeholder="City (e.g., Mumbai)" className="p-2 rounded bg-gray-900 border border-gray-800" />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category (ventilator, infusion...)" className="p-2 rounded bg-gray-900 border border-gray-800" />
      <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="p-2 rounded bg-gray-900 border border-gray-800" />
      <div className="flex gap-2">
        <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="p-2 rounded bg-gray-900 border border-gray-800" />
        <button className="px-3 py-2 bg-white text-black rounded">Search</button>
=======
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
      {/* City */}
      <div className="min-w-0">
        <label className="text-xs uppercase tracking-[0.2em] text-white/70">
          City
        </label>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 
            bg-black/20 px-3 py-2 
            text-white 
            transition 
            hover:border-pink-500/40 hover:bg-white/10 
            focus:border-pink-400 focus:outline-none"
        >
          {cityOptions.map((option) => (
            <option
              className="bg-[#05080f] text-white hover:bg-white/20"
              value={option === "All cities" ? "" : option}
              key={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="min-w-0">
        <label className="text-xs uppercase tracking-[0.2em] text-white/70">
          Device
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 
            bg-black/20 px-3 py-2 
            text-white 
            transition 
            hover:border-pink-500/40 hover:bg-white/10
            focus:border-pink-400 focus:outline-none"
        >
          {categoryOptions.map((option) => (
            <option
              className="bg-[#05080f] text-white hover:bg-white/20"
              key={option.label}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Keyword */}
      <div className="min-w-0">
        <label className="text-xs uppercase tracking-[0.2em] text-white/70">
          Keyword
        </label>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ventilator, monitor..."
          className="mt-1 w-full rounded-xl border border-white/20 
            bg-black/20 px-3 py-2 
            text-white placeholder:text-white/50 
            transition hover:border-pink-500/40 hover:bg-white/10
            focus:border-pink-400 focus:outline-none"
        />
      </div>

      {/* Pricing */}
      <div className="min-w-0">
        <label className="text-xs uppercase tracking-[0.2em] text-white/70">
          Pricing
        </label>

        <div className="mt-1 grid grid-cols-2 gap-2">
          {[
            { label: "Budget < ₹1k", value: "budget" },
            { label: "Premium", value: "premium" },
          ].map((option) => (
            <div key={option.value} className="relative group">
              {/* Tooltip */}
              <span
                className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 
                   mb-2 hidden group-hover:block whitespace-nowrap 
                   rounded-md bg-black/90 px-2 py-1 text-[10px] text-white shadow-lg"
              >
                {option.label}
              </span>

              <button
                type="button"
                onClick={() =>
                  setPrice((prev) =>
                    prev === option.value
                      ? ""
                      : (option.value as "budget" | "premium")
                  )
                }
                className={`rounded-xl border px-2 py-2 text-xs font-semibold transition truncate w-full
          ${
            price === option.value
              ? "border-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg shadow-pink-500/30"
              : "border-white/20 bg-black/20 text-white/70 hover:border-pink-500/50 hover:text-white hover:bg-white/10 hover:shadow-md hover:shadow-pink-500/20"
          }`}
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col justify-end gap-2 min-w-0">
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 
            py-3 text-sm font-semibold text-white 
            shadow-lg shadow-pink-500/20 
            transition 
            hover:scale-[1.02] hover:shadow-pink-500/40"
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
          className="text-xs text-white/60 underline decoration-dotted underline-offset-4 transition hover:text-white"
        >
          Clear filters
        </button>
>>>>>>> Stashed changes
      </div>
    </form>
  )
}
