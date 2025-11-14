import './globals.css'
import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'MerilCare — Rental & Post-Discharge Care',
  description: 'Medical equipment rental & caregiver marketplace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0C0C0C] text-gray-100 flex flex-col selection:bg-pink-500 selection:text-white">

        {/* NAVBAR */}
        <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-50 shadow-[0_5px_20px_rgba(255,0,130,0.2)]">
          <div className="w-full mx-auto px-4 py-6 flex items-center justify-between">

            {/* LOGO */}
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent"
            >
              MerilCare
            </Link>

            {/* NAV LINKS */}
            <nav className="flex gap-6 items-center">
              <Link href="/devices" className="text-sm hover:text-pink-400 transition">Devices</Link>
              <Link href="/caregivers" className="text-sm hover:text-pink-400 transition">Caregivers</Link>
              <Link href="/bookings" className="text-sm hover:text-pink-400 transition">My Bookings</Link>

              {/* LOGIN BUTTON */}
              <button className="ml-4 px-4 py-1.5 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-md text-sm font-semibold hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,150,0.6)] transition-all">
                Login
              </button>
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 mx-auto px-4 py-10 w-full">
          {children}
        </main>

        {/* FOOTER ALWAYS AT BOTTOM */}
        <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md mt-auto">
          <div className="mx-auto px-4 py-6 text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} MerilCare — crafted with 💖 for a hackathon MVP
          </div>
        </footer>
      </body>
    </html>
  )
}
