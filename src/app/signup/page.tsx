"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: any) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Account created! (demo)");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center mt-6 p-4">
      {/* CARD */}
      <div
        className="w-full max-w-lg rounded-2xl p-8 bg-white/5 backdrop-blur-xl 
        border border-white/10 shadow-[0_0_30px_rgba(255,0,150,0.15)]
        relative"
      >
        {/* TITLE */}
        <h1
          className="text-3xl font-extrabold text-center bg-gradient-to-r 
          from-pink-400 to-violet-400 bg-clip-text text-transparent"
        >
          Create Account
        </h1>

        <p className="text-center text-white mt-1 text-sm">
          Sign up to start using MerilCare
        </p>

        {/* FORM */}
        <form onSubmit={handleSignup} className="mt-6 grid grid-cols-2 gap-4">
          {/* FULL NAME */}
          {/* FULL NAME - FULL WIDTH */}
          <div className="col-span-2">
            <label className="text-sm text-white">Full Name</label>
            <input
              type="text"
              required
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border 
      border-white/10 text-gray-100 placeholder-white 
      focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
              placeholder="John Doe"
            />
          </div>

          {/* EMAIL - LEFT */}
          <div className="col-span-1">
            <label className="text-sm text-white">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border 
      border-white/10 text-gray-100 placeholder-white 
      focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
              placeholder="you@example.com"
            />
          </div>

          {/* PHONE - RIGHT */}
          <div className="col-span-1">
            <label className="text-sm text-white">Phone Number</label>
            <input
              type="tel"
              required
              maxLength={10}
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border 
      border-white/10 text-gray-100 placeholder-white 
      focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
              placeholder="9876543210"
            />
          </div>

          {/* PASSWORD - LEFT */}
          <div className="col-span-1">
            <label className="text-sm text-white">Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border 
      border-white/10 text-gray-100 placeholder-white 
      focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* CONFIRM PASSWORD - RIGHT */}
          <div className="col-span-1">
            <label className="text-sm text-white">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border 
      border-white/10 text-gray-100 placeholder-white 
      focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* SUBMIT BUTTON - FULL WIDTH */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 w-full py-2.5 rounded-lg text-white font-semibold text-base
    bg-gradient-to-r from-pink-500 to-violet-500 
    hover:scale-[1.03] transition-all hover:shadow-[0_0_20px_rgba(255,0,180,0.5)]
    disabled:opacity-40"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          {/* ROLE SELECTOR */}
          <div className="col-span-2 mt-4 space-y-2">
            <p className="text-center text-white text-sm">Register as</p>

            <div className="grid grid-cols-3 gap-3">
              <Link
                href="/signup?role=doctor"
                className="text-center px-3 py-2 rounded-lg bg-white/5 
                border border-white/10 backdrop-blur-md text-sm
                hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(255,0,150,0.3)]
                transition-all font-semibold text-gray-200"
              >
                Doctor
              </Link>

              <Link
                href="/signup?role=patient"
                className="text-center px-3 py-2 rounded-lg bg-white/5 
                border border-white/10 backdrop-blur-md text-sm
                hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(150,0,255,0.3)]
                transition-all font-semibold text-gray-200"
              >
                Patient
              </Link>

              <Link
                href="/signup?role=nurse"
                className="text-center px-3 py-2 rounded-lg bg-white/5 
                border border-white/10 backdrop-blur-md text-sm
                hover:border-pink-400/40 hover:shadow-[0_0_20px_rgba(255,0,180,0.3)]
                transition-all font-semibold text-gray-200"
              >
                Nurse
              </Link>
            </div>
          </div>
        </form>

        {/* ALREADY HAVE ACCOUNT */}
        <p className="text-center text-white mt-6 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-pink-400 hover:text-pink-300 transition font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
