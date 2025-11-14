import React from 'react'

export default function MyBookingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My bookings</h1>
      <p className="text-white">When authenticated, fetch `/api/bookings` and render booking cards with actions (cancel, complete, rate).</p>
    </div>
  )
}
