'use client'
import React, { useState } from 'react'
import { bookDevice } from '../lib/api'

export default function BookingModal({ deviceId, pricePerDay }: { deviceId: string; pricePerDay: number }) {
  const [open, setOpen] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleBook(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      // user_id hardcoded for now — replace with auth user id
      const res: any = await bookDevice(deviceId, { user_id: 'u_demo', start, end })
      setMessage(`Booked! id: ${res.bookingId}`)
    } catch (err) {
      setMessage('Failed to book — try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="w-full px-3 py-2 bg-white text-black rounded">Reserve</button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#0f1720] p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-semibold">Reserve device</h3>
            <form onSubmit={handleBook} className="mt-4 space-y-3">
              <div>
<<<<<<< Updated upstream
                <label className="text-sm text-gray-400">Start</label>
                <input type="date" value={start} onChange={e=>setStart(e.target.value)} required className="w-full p-2 rounded bg-gray-900 border border-gray-800" />
              </div>
              <div>
                <label className="text-sm text-gray-400">End</label>
                <input type="date" value={end} onChange={e=>setEnd(e.target.value)} required className="w-full p-2 rounded bg-gray-900 border border-gray-800" />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">Est total: {start && end ? `₹${calcTotal(start, end, pricePerDay)}` : '—'}</div>
                <div className="flex gap-2">
                  <button type="button" onClick={()=>setOpen(false)} className="px-3 py-1 rounded border border-gray-700">Close</button>
                  <button type="submit" disabled={loading} className="px-3 py-1 bg-white text-black rounded">Confirm</button>
=======
                <p className="text-xs uppercase tracking-[0.4em] text-white">
                  Reservation
                </p>
                <h3 className="text-2xl font-semibold text-white">
                  Schedule delivery
                </h3>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  setMessage(null);
                }}
                className="text-sm text-white hover:text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleBook} className="mt-6 space-y-4 text-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Start date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
                <Field
                  label="End date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white">
                      Estimated charge
                    </p>
                    <p className="text-2xl font-semibold">₹{estimatedCost}</p>
                    <p className="text-xs text-white">₹{pricePerDay}/day</p>
                  </div>
                  <div className="text-right text-xs text-white">
                    Includes doorstep QC, installation, and pickup.
                  </div>
>>>>>>> Stashed changes
                </div>
              </div>

              {message && <div className="text-sm text-gray-300 mt-2">{message}</div>}
            </form>
          </div>
        </div>
      )}
    </>
<<<<<<< Updated upstream
  )
=======
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="text-xs uppercase tracking-[0.3em] text-white">
      {label}
      <input
        required
        type="date"
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-3 text-white focus:border-pink-400 focus:outline-none"
      />
    </label>
  );
>>>>>>> Stashed changes
}

function calcTotal(start: string, end: string, perDay: number) {
  try {
    const s = new Date(start)
    const e = new Date(end)
    const days = Math.max(1, Math.ceil((e.getTime() - s.getTime()) / (1000*60*60*24)) + 1) // inclusive
    return days * perDay
  } catch {
    return 0
  }
}
