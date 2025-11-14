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

<<<<<<< Updated upstream
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
=======
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white">
                {device.category}
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">{device.name}</h1>
              <p className="mt-3 text-sm text-white">{device.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <SpecTile icon={<Clock3 className="h-4 w-4" />} label="Dispatch" value={device.availability} />
              <SpecTile icon={<BadgeCheck className="h-4 w-4" />} label="Rating" value={`${device.rating} ★`} />
              <SpecTile icon={<Shield className="h-4 w-4" />} label="Maintenance" value="NABL-certified" />
            </div>

            <div className="flex flex-wrap gap-3">
              {device.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-white/10 px-4 py-1 text-xs text-gray-200"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Specs snapshot
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {device.specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="text-xs text-white uppercase tracking-widest">
                      {spec.label}
                    </p>
                    <p className="text-white">{spec.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-teal-200">
                <BatteryCharging className="h-4 w-4" />
                Includes latest calibration report & sterile accessories.
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div>
            <p className="text-sm text-white">Starting at</p>
            <p className="text-4xl font-semibold text-white">
              ₹{device.pricePerDay}
              <span className="text-lg text-white"> / day</span>
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white">
            Includes 24/7 remote monitoring, on-site engineer, and AI-driven service logs.
          </div>
          <BookingModal deviceId={device.id} pricePerDay={device.pricePerDay} />
          <div className="text-xs text-white">
            Need a caretaker as well?
            <a
              href="/caregivers"
              className="pl-2 text-pink-300 underline decoration-dotted"
            >
              Match with a nurse
            </a>
>>>>>>> Stashed changes
          </div>
        </aside>
      </div>

<<<<<<< Updated upstream
      <section className="bg-gray-900 p-4 rounded">
        <h3 className="font-semibold">Specs & maintenance</h3>
        <p className="text-sm text-gray-400 mt-2">
          Serial number, condition, last inspection — add more here.
        </p>
      </section>
    </div>
  )
=======
      {related.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Similar devices</h2>
            <span className="text-sm text-white">
              Category | {device.category}
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((item) => (
              <DeviceCard key={item.id} device={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SpecTile({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-200">
      <span className="rounded-full border border-white/10 p-2 text-pink-300">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white">{label}</p>
        <p className="text-white">{value}</p>
      </div>
    </div>
  );
>>>>>>> Stashed changes
}
