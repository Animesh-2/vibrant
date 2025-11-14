"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedRole =
    (searchParams.get("role")?.toUpperCase() as
      | "DOCTOR"
      | "PATIENT"
      | "NURSE") || "PATIENT";

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    city: "",
    role: selectedRole,
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, role: selectedRole }));
  }, [selectedRole]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://10.11.7.87:5000/api/auth/register", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: form.role,
          city: form.city || "Unknown",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      const { token, user } = data.data;

      // LocalStorage (optional)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      // Cookies (SSR navbar needs this)
      document.cookie = `token=${token}; path=/; max-age=31536000`;
      document.cookie = `role=${user.role}; path=/; max-age=31536000`;

      // Redirect by role
      if (user.role === "NURSE") router.push("/dashboard");
      else if (user.role === "DOCTOR") router.push("/devices");
      else router.push("/");

      setLoading(false);
    } catch (error) {
      alert("Server connection failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-6 p-4">
      <div className="w-full max-w-lg rounded-2xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(255,0,150,0.15)] relative">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="mt-6 grid grid-cols-2 gap-4">
          {/* NAME */}
          <div className="col-span-2">
            <label className="text-sm text-white">Full Name</label>
            <input
              name="name"
              onChange={handleChange}
              value={form.name}
              required
              type="text"
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-gray-100"
              placeholder="John Doe"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-white">Email</label>
            <input
              name="email"
              onChange={handleChange}
              value={form.email}
              required
              type="email"
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-gray-100"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm text-white">Phone</label>
            <input
              name="phone"
              onChange={handleChange}
              value={form.phone}
              required
              maxLength={10}
              type="tel"
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-gray-100"
            />
          </div>

          {/* CITY */}
          <div className="col-span-2">
            <label className="text-sm text-white">City</label>
            <input
              name="city"
              onChange={handleChange}
              value={form.city}
              required
              type="text"
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-gray-100"
              placeholder="Surat"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-white">Password</label>
            <input
              name="password"
              onChange={handleChange}
              value={form.password}
              required
              type="password"
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-gray-100"
            />
          </div>

          {/* CONFIRM */}
          <div>
            <label className="text-sm text-white">Confirm Password</label>
            <input
              name="confirm"
              onChange={handleChange}
              value={form.confirm}
              required
              type="password"
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 w-full py-2.5 rounded-lg text-white font-semibold text-base bg-gradient-to-r from-pink-500 to-violet-500"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
