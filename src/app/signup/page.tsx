"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // role from URL → default: PATIENT
  const selectedRole =
    (searchParams.get("role")?.toUpperCase() as
      | "DOCTOR"
      | "PATIENT"
      | "NURSE") || "PATIENT";

  const [loading, setLoading] = useState(false);

  // FORM STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    city: "",
    role: selectedRole,
  });

  // 🔥 Update role in form whenever URL role changes
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

      // 🔥 Save auth properly
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      // Redirect based on role
      if (user.role === "NURSE") router.push("/dashboard");
      else if (user.role === "DOCTOR") router.push("/devices");
      else router.push("/");

      setLoading(false);
    } catch (error) {
      alert("Error connecting to server");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-6 p-4">
      <div
        className="w-full max-w-lg rounded-2xl p-8 bg-white/5 backdrop-blur-xl 
        border border-white/10 shadow-[0_0_30px_rgba(255,0,150,0.15)] relative"
      >
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
          Create Account
        </h1>

        <p className="text-center text-white mt-1 text-sm">
          Sign up to start using MerilCare
        </p>

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
          <div className="col-span-1">
            <label className="text-sm text-white">Email</label>
            <input
              name="email"
              onChange={handleChange}
              value={form.email}
              required
              type="email"
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-gray-100"
              placeholder="you@example.com"
            />
          </div>

          {/* PHONE */}
          <div className="col-span-1">
            <label className="text-sm text-white">Phone Number</label>
            <input
              name="phone"
              onChange={handleChange}
              value={form.phone}
              required
              maxLength={10}
              type="tel"
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-gray-100"
              placeholder="9876543210"
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
          <div className="col-span-1">
            <label className="text-sm text-white">Password</label>
            <input
              name="password"
              onChange={handleChange}
              value={form.password}
              required
              type="password"
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-gray-100"
              placeholder="••••••••"
            />
          </div>

          {/* CONFIRM */}
          <div className="col-span-1">
            <label className="text-sm text-white">Confirm Password</label>
            <input
              name="confirm"
              onChange={handleChange}
              value={form.confirm}
              required
              type="password"
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-gray-100"
              placeholder="••••••••"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 w-full py-2.5 rounded-lg text-white font-semibold text-base bg-gradient-to-r from-pink-500 to-violet-500 hover:scale-[1.03] transition-all disabled:opacity-40"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          {/* ROLE SELECTOR */}
          <div className="col-span-2 mt-4 space-y-2">
            <p className="text-center text-white text-sm">Register as</p>

            <div className="grid grid-cols-3 gap-3">
              {["DOCTOR", "PATIENT", "NURSE"].map((role) => (
                <Link
                  key={role}
                  href={`/signup?role=${role.toLowerCase()}`}
                  className={`text-center p-2 rounded-lg border transition-all ${
                    selectedRole === role
                      ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white border-transparent scale-[1.05]"
                      : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
                  }`}
                >
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        </form>

        <p className="text-center text-white mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-400 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
