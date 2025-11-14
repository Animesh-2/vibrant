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
    <div>
      <h1 className="text-2xl font-semibold mb-4">Devices</h1>

      {devices.length === 0 ? (
        <div className="text-gray-400">No devices found for selected filters.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {devices.map(d => <DeviceCard key={d.id} device={d} />)}
        </div>
      )}
    </div>
  )
}
