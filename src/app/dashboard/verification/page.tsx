'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import VerificationFlow from "@/components/dashboard/VerificationFlow";

const API = "http://10.11.7.87:5000";

export default function VerificationPageClient() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function loadVerificationTasks() {
      try {
        /** --------------------------------------------------------
         * 1️⃣ Load booking requests (direct API)
         * -------------------------------------------------------- */
        const reqRes = await axios.get(`${API}/api/nurse/booking/requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allRequests = reqRes.data.data || [];

        /** --------------------------------------------------------
         * 2️⃣ Find first accepted request
         * status = RESERVED or ACCEPTED
         * -------------------------------------------------------- */
        const accepted = allRequests.find(
          (r: any) =>
            r.status === "RESERVED" ||
            r.status === "ACCEPTED"
        );

        if (!accepted) {
          console.log("No accepted request found");
          setTasks([]);
          setLoading(false);
          return;
        }

        const patientId = accepted.requesterId;
        const patientName = accepted.requester?.name ?? "Patient";

        /** --------------------------------------------------------
         * 3️⃣ Get patient medications
         * -------------------------------------------------------- */
        const medsRes = await axios.get(
          `${API}/api/patient/prescriptions/${patientId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const meds = medsRes.data.data || [];

        /** --------------------------------------------------------
         * 4️⃣ Convert medications → AI tasks
         * -------------------------------------------------------- */
        const formattedTasks = meds.map((m: any) => ({
          id: String(m.id),
          patient: patientName,
          type: "Medicine",
          requirement: m.medicine,
          reference: `${m.dosage} | ${m.foodTiming}`,
        }));

        setTasks(formattedTasks);
      } catch (err) {
        console.log("Error loading verification tasks:", err);
      }

      setLoading(false);
    }

    loadVerificationTasks();
  }, []);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white">
            AI verification
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Upload evidence before procedures
          </h1>
          <p className="text-sm text-white">
            Each upload is scanned for labels, dosage, and expiry before you can proceed
            with medicine administration.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-white hover:border-pink-400"
        >
          Back to dashboard →
        </Link>
      </header>

      {/* BODY */}
      {loading ? (
        <p className="text-white">Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="text-white/60">No accepted booking or no medications found.</p>
      ) : (
        <VerificationFlow tasks={tasks} />
      )}
    </div>
  );
}
