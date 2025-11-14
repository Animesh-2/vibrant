"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/hooks/cart";

export default function Navbar() {
  const { data: cart = [] } = useCart();

  return (
    <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-50 shadow-[0_5px_20px_rgba(255,0,130,0.2)]">
      <div className="w-full mx-auto px-4 py-6 flex items-center justify-between">
        
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent"
        >
          MerilCare
        </Link>

        <nav className="flex gap-6 items-center">
          <Link href="/devices" className="text-sm hover:text-pink-400">Devices</Link>
          <Link href="/caregivers" className="text-sm hover:text-pink-400">Caregivers</Link>
          <Link href="/bookings" className="text-sm hover:text-pink-400">My Bookings</Link>

          <Link href="/cart" className="relative">
            <ShoppingCart size={24} className="text-gray-200 hover:text-white" />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs flex items-center justify-center bg-pink-500 text-white">
                {cart.length}
              </span>
            )}
          </Link>

          <Link
            href="/login"
            className="ml-4 px-4 py-1.5 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-md text-sm font-semibold hover:scale-105 transition-all"
          >
            Login
          </Link>
        </nav>

      </div>
    </header>
  );
}
