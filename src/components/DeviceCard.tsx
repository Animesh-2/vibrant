'use client'

import Link from "next/link"

export default function DeviceCard({ device }) {
  return (
    <Link href={`/devices/${device.id}`}>
      <div className="bg-gray-900 p-4 rounded shadow hover:shadow-lg transition cursor-pointer">
        <div className="h-40 bg-gray-800 rounded flex items-center justify-center">
          <span className="text-gray-500">Image</span>
        </div>

        <h3 className="mt-3 text-lg font-semibold">{device.name}</h3>

        <p className="text-sm text-gray-400">{device.category}</p>
        <p className="text-sm text-gray-500">{device.city}</p>

        <p className="mt-2 text-xl font-bold">
          ₹{device.pricePerDay}/day
        </p>
      </div>
    </Link>
  )
}
