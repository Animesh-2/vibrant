'use client';

import type { Nurse } from "@/data/mockData";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  nurse: Nurse;
};

const API_BASE = "http://10.11.7.87:5000";

export default function NurseSlotPicker({ nurse }: Props) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [notes, setNotes] = useState("");

  async function requestBooking() {
    if (!dateFrom || !dateTo) {
      toast.error("Bro pick both start & end date 😭");
      return;
    }

    const caregiverId = Number(nurse.id.replace(/\D/g, ""));
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${API_BASE}/api/bookings/request`,
        {
          caregiverId,
          dateFrom: new Date(dateFrom).toISOString(),
          dateTo: new Date(dateTo).toISOString(),
          notes: notes || "",
          totalAmount: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      toast.success("Booking request received 🎉");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went sideways 😕");
    }
  }

  return (
    <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold text-white">Book Appointment</h3>

      {/* DATE FROM */}
      <div className="space-y-1">
        <label className="text-xs text-white/70">Start Date & Time</label>
        <input
          type="datetime-local"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="w-full rounded-xl bg-black/30 border border-white/10 p-2 text-white"
        />
      </div>

      {/* DATE TO */}
      <div className="space-y-1">
        <label className="text-xs text-white/70">End Date & Time</label>
        <input
          type="datetime-local"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="w-full rounded-xl bg-black/30 border border-white/10 p-2 text-white"
        />
      </div>

      {/* NOTES */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
        className="w-full rounded-xl bg-black/30 border border-white/10 p-2 text-white text-sm"
      />

      {/* BUTTON */}
      <button
        onClick={requestBooking}
        className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white"
      >
        Request Booking
      </button>
    </div>
  );
}
