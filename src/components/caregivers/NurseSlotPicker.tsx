'use client';

import type { Nurse } from "@/data/mockData";
import { useState } from "react";

type Props = {
  nurse: Nurse;
};

export default function NurseSlotPicker({ nurse }: Props) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold text-white">Select a slot</h3>
      <p className="text-xs uppercase tracking-[0.3em] text-white">
        Live availability
      </p>
      <div className="space-y-3">
        {nurse.availability.map((block) => (
          <div key={block.day}>
            <p className="text-sm text-white">{block.day}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {block.slots.map((slot) => {
                const key = `${block.day}-${slot}`;
                const active = selectedSlot === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedSlot(key);
                      setMessage(null);
                    }}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      active
                        ? "border-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                        : "border-white/15 text-white hover:border-white/40"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          selectedSlot
            ? setMessage(`Slot ${selectedSlot.split("-").pop()} requested.`)
            : setMessage("Select a slot to continue.")
        }
        className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:shadow-pink-500/40"
      >
        Request booking
      </button>

      {message && (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-xs text-white">
          {message}
        </div>
      )}
    </div>
  );
}

