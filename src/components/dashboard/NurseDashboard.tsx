'use client';

import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://10.11.7.87:5000";

type BookingRequest = {
  id: number;
  dateFrom: string;
  dateTo: string;
  notes: string;
  status: string; // NEW
  requesterId: number;
  requester: {
    id: number;
    name: string;
    email: string;
  };
};

export default function NurseDashboard() {
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [selected, setSelected] = useState<BookingRequest | null>(null);

  const [patientPrescriptions, setPatientPrescriptions] = useState<any[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /** ----------------------------------------------------------------
   * 🟣 LOAD ALL INCOMING REQUESTS
   * ---------------------------------------------------------------- */
  async function loadRequests() {
    try {
      const res = await axios.get(`${API}/api/nurse/booking/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load requests");
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  /** ----------------------------------------------------------------
   * 🟢 ACCEPT REQUEST
   * ---------------------------------------------------------------- */
  async function acceptRequest(id: number, patientId: number) {
    try {
      await axios.post(
        `${API}/api/nurse/booking/${id}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update selected status
      setSelected((prev) => prev && { ...prev, status: "RESERVED" });

      loadPatientPrescriptions(patientId);
    } catch (err) {
      console.log(err);
      alert("Failed to accept");
    }
  }

  /** ----------------------------------------------------------------
   * 🔵 LOAD PATIENT PRESCRIPTIONS
   * ---------------------------------------------------------------- */
  async function loadPatientPrescriptions(patientId: number) {
    setLoadingDetails(true);

    try {
      const res = await axios.get(
        `${API}/api/patient/prescriptions?patientId=${patientId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPatientPrescriptions(res.data.data || []);
    } catch (err) {
      console.log(err);
    }

    setLoadingDetails(false);
  }

  /** ----------------------------------------------------------------
   * 🔴 DECLINE REQUEST
   * ---------------------------------------------------------------- */
  async function declineRequest(id: number) {
    try {
      await axios.post(
        `${API}/api/nurse/booking/${id}/decline`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update selected status
      setSelected((prev) => prev && { ...prev, status: "CANCELLED" });

    } catch (err) {
      console.log(err);
      alert("Failed to decline");
    }
  }

  return (
    <div className="space-y-8">

      {/* LEFT LIST */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-lg font-semibold text-white">Request Approvals</h2>

        {requests.length === 0 && (
          <p className="text-white/60 text-sm mt-3">No requests available.</p>
        )}

        {requests.map((req) => {
          const active = selected?.id === req.id;

          return (
            <button
              key={req.id}
              onClick={() => {
                setSelected(req);
                setPatientPrescriptions([]);
              }}
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition mt-3 ${
                active
                  ? "border-transparent bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-white"
                  : "border-white/10 text-white hover:border-white/30"
              }`}
            >
              <div className="flex justify-between text-xs uppercase text-white/80">
                <span>{req.requester.name}</span>
                <span>{new Date(req.dateFrom).toLocaleDateString()}</span>
              </div>

              <p className="text-sm mt-1 text-white">{req.notes || "No notes"}</p>

              <p className="text-xs mt-1 text-white/60">
                Status:{" "}
                {req.status === "REQUESTED" && "Pending"}
                {req.status === "RESERVED" && "Accepted"}
                {req.status === "CANCELLED" && "Rejected"}
              </p>
            </button>
          );
        })}
      </div>

      {/* RIGHT PANEL */}
      {selected && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-5">
          
          <h2 className="text-xl font-semibold text-white">Booking Request</h2>

          <p className="text-sm text-white/70">
            Patient: {selected.requester.name}
          </p>
          <p className="text-sm text-white/70">
            Email: {selected.requester.email}
          </p>

          <p className="text-sm text-white/70">
            From: {new Date(selected.dateFrom).toLocaleString()}
          </p>
          <p className="text-sm text-white/70">
            To: {new Date(selected.dateTo).toLocaleString()}
          </p>

          {/* STATUS */}
          <p className="text-sm text-white/80 mt-2">
            Status:{" "}
            {selected.status === "REQUESTED" && (
              <span className="text-yellow-300">Pending</span>
            )}
            {selected.status === "RESERVED" && (
              <span className="text-green-300">Accepted</span>
            )}
            {selected.status === "CANCELLED" && (
              <span className="text-red-300">Rejected</span>
            )}
          </p>

          {/* SHOW BUTTONS ONLY IF STILL PENDING */}
          {selected.status === "REQUESTED" && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() =>
                  acceptRequest(selected.id, selected.requesterId)
                }
                className="px-4 py-2 bg-green-500 text-white rounded-xl"
              >
                Accept
              </button>

              <button
                onClick={() => declineRequest(selected.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                Reject
              </button>
            </div>
          )}

          {/* SHOW PRESCRIPTIONS ONLY IF ACCEPTED */}
          {selected.status === "RESERVED" && (
            <div className="space-y-4 mt-5">
              <h3 className="text-lg text-white">Medication History</h3>

              {loadingDetails && <p className="text-white">Loading…</p>}

              {!loadingDetails &&
                patientPrescriptions.length === 0 && (
                  <p className="text-white/60 text-sm">
                    No prescriptions found.
                  </p>
                )}

              {!loadingDetails &&
                patientPrescriptions.map((med) => (
                  <div
                    key={med.id}
                    className="border border-white/10 bg-black/20 p-3 rounded-xl text-white text-sm mt-2"
                  >
                    <p className="font-semibold">{med.medicine}</p>
                    <p className="text-white/70 text-xs">
                      Dosage: {med.dosage}
                    </p>
                    <p className="text-white/70 text-xs">
                      Duration: {med.startDate} → {med.endDate}
                    </p>
                    <p className="text-white/70 text-xs">
                      Times: {(Array.isArray(med.times) ? med.times : []).join(", ")}
                    </p>
                  </div>
                ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
