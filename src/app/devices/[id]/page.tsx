import React from 'react'
import BookingModal from '../../bookings/page'

type Props = { params: { id: string } }

// ----------------------------
// Local getDevice() function
// ----------------------------
async function getDevice(id: string) {
  const devices = [
    {
      id: "1",
      name: "ICU Ventilator",
      description: "High-grade ventilator suitable for ICU use.",
      category: "Ventilation",
      city: "Mumbai",
      pricePerDay: 2500,
    },
    {
      id: "2",
      name: "Patient Monitor",
      description: "Multi-parameter patient monitoring system.",
      category: "Monitoring",
      city: "Delhi",
      pricePerDay: 900,
    },
  ]

  return devices.find((d) => d.id === id) || null
}

// ----------------------------
// Device Detail Page
// ----------------------------
export default async function DeviceDetail({ params }: Props) {
  const device = await getDevice(params.id)

  if (!device) {
    return <div>Device not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gray-900 p-4 rounded">
          <div className="h-64 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-gray-500">Image carousel placeholder</span>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold">{device.name}</h2>
            <p className="text-sm text-gray-400 mt-2">{device.description}</p>
            <p className="mt-4"><strong>Category:</strong> {device.category}</p>
            <p><strong>Location:</strong> {device.city}</p>
          </div>
        </div>

        <aside className="bg-gray-900 p-4 rounded">
          <div className="text-2xl font-bold">₹{device.pricePerDay}/day</div>
          <div className="mt-4 space-y-2">
            <BookingModal deviceId={device.id} pricePerDay={device.pricePerDay} />
          </div>
        </aside>
      </div>

      <section className="bg-gray-900 p-4 rounded">
        <h3 className="font-semibold">Specs & maintenance</h3>
        <p className="text-sm text-gray-400 mt-2">
          Serial number, condition, last inspection — add more here.
        </p>
      </section>
    </div>
  )
}
