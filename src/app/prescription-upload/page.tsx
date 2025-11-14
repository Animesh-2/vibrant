"use client";

import { useState } from "react";
import { Camera, FileText, Mic, Upload } from "lucide-react";

export default function PrescriptionUploadStyled() {
  const [mode, setMode] = useState("upload");

  return (
    <div className="min-h-screen px-6 py-10 text-white">

      <h1 className="text-3xl font-bold mb-8">
        Upload Prescription
      </h1>

      {/* TAB BUTTONS */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { key: "upload", label: "Upload Photo", icon: <Camera size={16} /> },
          { key: "form", label: "Enter Manually", icon: <FileText size={16} /> },
          { key: "voice", label: "Speak", icon: <Mic size={16} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setMode(tab.key)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition border
              ${
                mode === tab.key
                  ? "border-transparent bg-gradient-to-r from-pink-500/30 to-violet-500/30 text-white shadow-[0_0_20px_rgba(255,0,150,0.2)]"
                  : "bg-white/5 border-white/10 text-white hover:border-white/30"
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTAINER */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-8">

        {/* UPLOAD MODE */}
        {mode === "upload" && (
          <>
            <p className="text-sm text-white/70">
              Upload a clear picture of your prescription.
            </p>

            <label className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/30 px-8 py-12 text-sm text-white cursor-pointer transition hover:bg-white/5">
              <Upload size={32} className="text-pink-400 mb-3" />
              <span>Click to upload</span>

              <span className="text-xs text-white/40">
                Supported: JPG, PNG
              </span>

              <input type="file" accept="image/*" className="hidden" />
            </label>

            <button className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white">
              Submit Prescription
            </button>
          </>
        )}

        {/* FORM MODE */}
        {mode === "form" && (
          <>
            <p className="text-sm text-white/70">Fill in your prescription details.</p>

            <input
              className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-xl text-sm"
              placeholder="Medicine Name"
            />
            <input
              className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-xl text-sm"
              placeholder="Dosage (500mg)"
            />
            <input
              className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-xl text-sm"
              placeholder="Frequency (Twice a day)"
            />

            <textarea
              className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-xl text-sm"
              placeholder="Additional Instructions"
            />

            <button className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white">
              Submit Prescription
            </button>
          </>
        )}

        {/* VOICE MODE */}
        {mode === "voice" && (
          <div className="text-center">
            <p className="text-sm text-white/70 mb-4">
              Tap below and speak your prescription.
            </p>

            <button className="mx-auto bg-gradient-to-r from-pink-500 to-violet-500 p-6 rounded-full shadow-lg hover:scale-105 transition">
              <Mic size={28} className="text-white" />
            </button>

            <p className="text-xs text-white/50 mt-4">
              Example: “Paracetamol 500mg twice daily for 3 days”
            </p>

            <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white">
              Submit Prescription
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
