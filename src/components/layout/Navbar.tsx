"use client";

import Link from "next/link";
import { ShoppingCart, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/lib/hooks/cart";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const roleLinks: Record<string, { href: string; label: string }[]> = {
  DOCTOR: [
    { href: "/devices", label: "Devices" },
    { href: "/caregivers", label: "Nurses" },
  ],

  PATIENT: [
    { href: "/devices", label: "Devices" },
    { href: "/caregivers", label: "Nurses" },
    { href: "/prescription-upload", label: "Prescription Upload" },
  ],

  NURSE: [
    { href: "/dashboard", label: "Nurse Dashboard" },
    { href: "/dashboard/verification", label: "Medcheck" },
  ],

  DEFAULT: [],
};

export default function Navbar({ initialRole }: { initialRole: string }) {
  const pathname = usePathname();
  const { data: cart = [] } = useCart();

  const [role, setRole] = useState(initialRole || "DEFAULT");

  useEffect(() => {
    const cookieRole =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("role="))
        ?.split("=")[1] || null;

    const localRole = localStorage.getItem("role");

    if (cookieRole) setRole(cookieRole);
    else if (localRole) setRole(localRole);
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // Clear cookies
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";

    // Reset role state
    setRole("DEFAULT");

    // Redirect
    window.location.href = "/";
  };

  const links = roleLinks[role] || roleLinks.DEFAULT;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060910]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-pink-400" />
          <span className="text-xl font-black tracking-tight text-white">
            VIBRANT
          </span>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden items-center gap-6 md:flex">
          {/* Dynamic Links */}
          {links.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} className="text-white" />
            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[11px] font-semibold text-white">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Sign In / Role + Logout */}
          {role === "DEFAULT" ? (
            <Link
              href="/login"
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-pink-500/70 hover:bg-pink-500/10"
            >
              <Sparkles size={16} />
              Sign in
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-white/80 text-sm font-semibold uppercase">
                {role}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-full border border-red-400/30 text-red-300 px-3 py-1 text-xs font-semibold hover:bg-red-500/10 transition"
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/cart"
            className="relative rounded-full border border-white/10 p-2"
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
      </div>
    </header>
  );
}
