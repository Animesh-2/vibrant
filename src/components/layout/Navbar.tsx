"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/hooks/cart";
<<<<<<< Updated upstream
=======
import { usePathname } from "next/navigation";

const links = [
  { href: "/devices", label: "Devices" },
  { href: "/caregivers", label: "Nurses" },
  { href: "/dashboard", label: "Nurse Dashboard" },
  { href: "/dashboard/verification", label: "MedCheck" },
];
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
        <nav className="flex gap-6 items-center">
          <Link href="/devices" className="text-sm hover:text-pink-400">Devices</Link>
          <Link href="/caregivers" className="text-sm hover:text-pink-400">Caregivers</Link>
          <Link href="/bookings" className="text-sm hover:text-pink-400">My Bookings</Link>

          <Link href="/cart" className="relative">
            <ShoppingCart size={24} className="text-gray-200 hover:text-white" />

=======
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  active ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link href="/cart" className="relative">
            <ShoppingCart
              size={22}
              className="text-white transition hover:text-white"
            />
>>>>>>> Stashed changes
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs flex items-center justify-center bg-pink-500 text-white">
                {cart.length}
              </span>
            )}
          </Link>

          <Link
            href="/login"
<<<<<<< Updated upstream
            className="ml-4 px-4 py-1.5 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-md text-sm font-semibold hover:scale-105 transition-all"
          >
            Login
          </Link>
        </nav>

=======
            className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-pink-500/70 hover:bg-pink-500/20"
          >
            <Sparkles size={16} className="text-white" />
            Sign in
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/cart"
            className="relative rounded-full border border-white/20 p-2"
          >
            <ShoppingCart size={18} className="text-white" />
            {cart.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white">
                {cart.length}
              </span>
            )}
          </Link>

          <Link
            href="/dashboard"
            className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-2 text-xs font-semibold text-white"
          >
            Menu
          </Link>
        </div>
>>>>>>> Stashed changes
      </div>
    </header>
  );
}
