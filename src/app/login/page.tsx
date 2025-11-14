"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Logged in! (demo)");
    }, 1200);
  };

  return (
    <div className="flex items-center justify-center mt-1 p-4">
      {/* CARD */}
      <div
        className="w-full max-w-md rounded-2xl p-10 bg-white/5 backdrop-blur-xl 
      border border-white/10 shadow-[0_0_30px_rgba(255,0,150,0.15)]
      relative"
      >
        {/* TITLE */}
        <h1
          className="text-3xl font-extrabold text-center bg-gradient-to-r 
        from-pink-400 to-violet-400 bg-clip-text text-transparent"
        >
          Welcome Back
        </h1>

        <p className="text-center text-white mt-2">
          Login to continue using MerilCare
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          {/* EMAIL */}
          <div>
            <label className="text-sm text-white">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-4 py-3 rounded-lg bg-black/30 border 
              border-white/10 text-gray-100 placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-pink-500/50 
              transition-all"
              placeholder="you@example.com"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-white">Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-4 py-3 rounded-lg bg-black/30 border 
              border-white/10 text-gray-100 placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-pink-500/50 
              transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* FORGOT */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-white hover:text-pink-400 transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-lg text-white font-semibold text-base
            bg-gradient-to-r from-pink-500 to-violet-500 
            hover:scale-[1.03] transition-all hover:shadow-[0_0_20px_rgba(255,0,180,0.5)]
            disabled:opacity-40"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* ROLE SELECTOR */}
          <div className="mt-10 space-y-4">
            <p className="text-center text-white text-sm">Continue as</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/login?role=doctor"
                className="text-center px-4 py-3 rounded-lg bg-white/5 
      border border-white/10 backdrop-blur-md 
      hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(255,0,150,0.3)]
      transition-all font-semibold text-gray-200"
              >
                Doctor
              </Link>

              <Link
                href="/login?role=patient"
                className="text-center px-4 py-3 rounded-lg bg-white/5 
      border border-white/10 backdrop-blur-md 
      hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(150,0,255,0.3)]
      transition-all font-semibold text-gray-200"
              >
                Patient
              </Link>

              <Link
                href="/login?role=nurse"
                className="text-center px-4 py-3 rounded-lg bg-white/5 
      border border-white/10 backdrop-blur-md 
      hover:border-pink-400/40 hover:shadow-[0_0_20px_rgba(255,0,180,0.3)]
      transition-all font-semibold text-gray-200"
              >
                Nurse
              </Link>
            </div>
          </div>
        </form>

        {/* CREATE ACCOUNT */}
        <p className="text-center text-white mt-8">
          New here?{" "}
          <Link
            href="/signup"
            className="text-pink-400 hover:text-pink-300 transition font-semibold"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
