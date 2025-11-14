import React from 'react'
import { getDevices } from '../../lib/api'
import DeviceCard from '../../components/DeviceCard'

type Props = { searchParams?: { [key: string]: string | string[] | undefined } }

export default async function DevicesPage({ searchParams }: Props) {
  const params = {
    city: typeof searchParams?.city === 'string' ? searchParams.city : undefined,
    category: typeof searchParams?.category === 'string' ? searchParams.category : undefined,
    from: typeof searchParams?.from === 'string' ? searchParams.from : undefined,
    to: typeof searchParams?.to === 'string' ? searchParams.to : undefined,
  }
  const devices = await getDevices(params)

  return (
<<<<<<< Updated upstream
    <div>
      <h1 className="text-2xl font-semibold mb-4">Devices</h1>

      {devices.length === 0 ? (
        <div className="text-gray-400">No devices found for selected filters.</div>
=======
    <div className="space-y-8">
      <header className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white">
            Devices
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Medical devices & home ICU hardware
          </h1>
          <p className="mt-2 text-sm text-white">
            Filters pass directly into our logistics engine. Every device ships
            with AI-calibrated maintenance reports.
          </p>
        </div>
        <SearchBar />
      </header>

      <div className="flex flex-wrap gap-3">
        {quickFilters.map((filter) => (
          <Link
            key={filter.label}
            href={`/devices${toQuery(filter.params)}`}
            className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-gray-200 transition hover:border-pink-400 hover:text-white"
          >
            {filter.label}
          </Link>
        ))}
        {hasFilters && (
          <Link
            href="/devices"
            className="text-xs text-white underline decoration-dotted underline-offset-4"
          >
            Reset filters
          </Link>
        )}
      </div>

      <p className="text-sm text-white">
        Showing {devices.length} device{devices.length === 1 ? "" : "s"}
        {filters.city && ` | ${filters.city}`}
        {filters.category && ` | ${filters.category}`}
        {filters.price && ` | ${filters.price === "budget" ? "Budget" : "Premium"}`}
      </p>

      {devices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center text-white">
          No devices match the selected filters yet. Try changing the city or price
          preference.
        </div>
>>>>>>> Stashed changes
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {devices.map(d => <DeviceCard key={d.id} device={d} />)}
        </div>
      )}
    </div>
  )
}
