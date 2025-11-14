'use client';

import type { NurseRequest } from "@/data/mockData";
import { useState } from "react";

type Props = {
  summary: {
    totalHours: number;
    openRequests: number;
    aiApprovals: number;
    fulfillment: number;
  };
  requests: NurseRequest[];
};

const defaultAvailability = [
  { day: "Today", slots: ["08:00 - 12:00", "18:00 - 22:00"] },
  { day: "Tomorrow", slots: ["Night shift"] },
  { day: "Fri", slots: ["Full day"] },
];

export default function NurseDashboard({ summary, requests }: Props) {
  const [availability, setAvailability] = useState(defaultAvailability);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  function toggleSlot(day: string, slot: string) {
    setAvailability((prev) =>
      prev.map((record) =>
        record.day === day
          ? {
              ...record,
              slots: record.slots.includes(slot)
                ? record.slots.filter((s) => s !== slot)
                : [...record.slots, slot],
            }
          : record
      )
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Hours this week", value: `${summary.totalHours}` },
          { label: "Open requests", value: `${summary.openRequests}` },
          { label: "AI approvals", value: `${summary.aiApprovals}` },
          { label: "Fulfillment", value: `${summary.fulfillment}%` },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-gray-300"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              {item.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Availability management
              </h2>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Sync with families
              </p>
            </div>
            <button className="text-xs text-pink-300 underline decoration-dotted">
              Share calendar
            </button>
          </div>
          <div className="space-y-4">
            {availability.map((record) => (
              <div key={record.day}>
                <p className="text-sm text-gray-400">{record.day}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {record.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(record.day, slot)}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white hover:border-pink-400"
                    >
                      {slot}
                    </button>
                  ))}
                  <button
                    onClick={() => toggleSlot(record.day, "On call")}
                    className="rounded-full border border-dashed border-white/15 px-3 py-1 text-xs text-gray-400"
                  >
                    + slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Request approvals
              </h2>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Pending ({requests.length})
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {requests.map((request) => {
              const active = selectedRequest === request.id;
              return (
                <button
                  key={request.id}
                  onClick={() => setSelectedRequest(request.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    active
                      ? "border-transparent bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-white"
                      : "border-white/10 text-gray-300 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gray-500">
                    <span>{request.patient}</span>
                    <span>{request.acuity}</span>
                  </div>
                  <p className="mt-1 text-base text-white">{request.procedure}</p>
                  <p className="text-xs text-gray-400">{request.location}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {request.scheduledFor}
                  </p>
                </button>
              );
            })}
          </div>
          {selectedRequest && (
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-gray-300">
              Request {selectedRequest} pre-approved. AI verification checklist will
              be generated once you confirm.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

