"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth, UserRole } from "../AuthProvider/page";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  // 🎯 FIX: Destructure setRole and setErrorMessage from context
  const { setRole, setErrorMessage } = useAuth();

  const selectedRole =
    (searchParams.get("role")?.toUpperCase() as
      | "DOCTOR"
      | "PATIENT"
      | "NURSE") || "PATIENT";

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://10.11.7.87:5000/api/auth/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: selectedRole,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        // 🎯 FIX: Replaced alert() with context error message
        setErrorMessage(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      const { token, user } = data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      document.cookie = `token=${token}; path=/; max-age=31536000`;
      document.cookie = `role=${user.role}; path=/; max-age=31536000`;

      // 🎯 FIX: IMMEDIATELY UPDATE THE GLOBAL CONTEXT STATE (Instant Navbar update!)
      setRole(user.role as UserRole);

      if (user.role === "NURSE") router.push("/dashboard");
      else if (user.role === "DOCTOR") router.push("/devices");
      else router.push("/");

      setLoading(false);
    } catch (err) {
      console.log(err);
      // 🎯 FIX: Replaced alert() with context error message
      setErrorMessage("Server connection failed");
      setLoading(false);
    }
  };

  const activeClass = (role: string) =>
    selectedRole === role
      ? "border-pink-500 shadow-[0_0_20px_rgba(255,0,180,0.5)] scale-[1.05] text-white"
      : "border-white/10 text-gray-200";

  return (
    <div className="flex items-center justify-center mt-1 p-4">
      <div
        className="w-full max-w-md rounded-2xl p-10 bg-white/5 backdrop-blur-xl 
      border border-white/10 shadow-[0_0_30px_rgba(255,0,150,0.15)]
      relative"
      >
        <h1
          className="text-3xl font-extrabold text-center bg-gradient-to-r 
        from-pink-400 to-violet-400 bg-clip-text text-transparent"
        >
          Welcome Back
        </h1>

        <p className="text-center text-white mt-2">
          Login to continue using MerilCare
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label className="text-sm text-white">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              className="w-full mt-1 px-4 py-3 rounded-lg bg-black/30 border 
              border-white/10 text-gray-100 placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-pink-500/50 
              transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-white">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              required
              className="w-full mt-1 px-4 py-3 rounded-lg bg-black/30 border 
              border-white/10 text-gray-100 placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-pink-500/50 
              transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-white hover:text-pink-400 transition"
            >
              Forgot password?
            </Link>
          </div>

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
        </form>

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
