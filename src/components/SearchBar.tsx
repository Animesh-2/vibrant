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
      </div>
    </form>
  )
}

