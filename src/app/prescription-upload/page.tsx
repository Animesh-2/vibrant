"use client";

import { useEffect, useState, useRef } from "react";
import { Camera, FileText, Mic, Upload, X } from "lucide-react";

/**
 * PrescriptionUploadStyled
 *
 * - Create prescriptions via Upload / Form / Voice
 * - Fetches ongoing prescriptions and displays them
 * - Shows today's checklist (morning/afternoon/night) per prescription
 * - Persists taken-checks to localStorage as: medTaken:{prescriptionId}:{yyyy-mm-dd}:{time}
 *
 * Notes:
 * - Adjust API_BASE if your backend path differs.
 * - If your backend requires auth, add Authorization header in fetch calls.
 */

const API_BASE = "http://10.11.7.87:5000"; // e.g. "" or "http://10.11.7.87:5000"

function authHeaders() {
  const token = localStorage.getItem("token"); // token from login
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function PrescriptionUploadStyled() {
  const [mode, setMode] = useState("upload");
  const [loading, setLoading] = useState(false);

  // upload state
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // form state
  const [form, setForm] = useState({
    medicine: "",
    startDate: "",
    endDate: "",
    dosage: "",
    times: [], // example ["morning","night"]
    foodTiming: "after_food",
    notes: "",
  });

  // voice state
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // prescriptions (from backend)
  const [prescriptions, setPrescriptions] = useState([]);

  // local UI message
  const [msg, setMsg] = useState(null);

  // fetch prescriptions on mount
  useEffect(() => {
    fetchPrescriptions();
    // cleanup preview object
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchPrescriptions() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/patient/prescriptions`, {
        headers: {
          "Content-Type": "application/json",
         ...authHeaders(),
        },
        credentials: "include",
      });
      if (!res.ok) {
        setMsg("Failed to load prescriptions");
        setLoading(false);
        return;
      }
      const data = await res.json();
      // your ok(res, data) format may wrap in { success: true, data }
      // handle both shapes:
      const payload = Array.isArray(data) ? data : data.data ?? data;
      setPrescriptions(payload);
    } catch (err) {
      console.error(err);
      setMsg("Network error while fetching prescriptions");
    } finally {
      setLoading(false);
    }
  }

  // utility to toggle times array in the form
  function toggleFormTime(t) {
    setForm((f) => {
      const has = f.times.includes(t);
      return { ...f, times: has ? f.times.filter(x => x !== t) : [...f.times, t] };
    });
  }

  // handle file input
  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }

  // create prescription POST
  async function submitPrescription(payload) {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/patient/prescriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         ...authHeaders(),
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.message || "Failed to create prescription");
        setLoading(false);
        return;
      }
      // success — depending on your response shape, extract created object
      const created = data.data ?? data;
      // optimistic update — put on top
      setPrescriptions(prev => [created, ...prev]);
      setMsg("Prescription created");
      // reset form/file
      setForm({
        medicine: "",
        startDate: "",
        endDate: "",
        dosage: "",
        times: [],
        foodTiming: "after_food",
        notes: "",
      });
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      setMsg("Network error while creating prescription");
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(null), 3000);
    }
  }

  // UI submit handlers per mode
  async function handleUploadSubmit(e) {
    e?.preventDefault();
    if (!file) return setMsg("Select an image first");
    // NOTE: backend OCR endpoint not implemented in this repo.
    // We'll fallback: open a quick modal to let user manually confirm parsed data.
    // For simplicity, prompt for medicine name (quick)
    const medicine = prompt("Enter medicine name parsed from image (quick):");
    if (!medicine) return;
    // create minimal prescription with defaults (today)
    const today = todayKey();
    const payload = {
      medicine,
      startDate: today,
      endDate: today,
      dosage: "as directed",
      times: ["morning"],
      foodTiming: "after_food",
      notes: "Uploaded image (manual confirm)",
    };
    await submitPrescription(payload);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const { medicine, startDate, endDate, dosage, times, foodTiming, notes } = form;
    if (!medicine || !startDate || !endDate || !dosage || !times.length) {
      setMsg("Please fill medicine, dates, dosage and times");
      setTimeout(()=>setMsg(null), 2500);
      return;
    }
    const payload = {
      medicine,
      startDate,
      endDate,
      dosage,
      times,
      foodTiming,
      notes,
    };
    submitPrescription(payload);
  }

  // VOICE: simple speech to text to capture medicine details.
  function startListening() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setMsg("Speech recognition not supported in this browser");
      setTimeout(()=>setMsg(null),2500);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    recognitionRef.current = rec;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = (ev) => {
      console.error(ev);
      setListening(false);
      setMsg("Speech recognition error");
      setTimeout(()=>setMsg(null),2500);
    };
    rec.onresult = (ev) => {
      const txt = ev.results[0][0].transcript;
      // naive parsing: try to capture "MedicineName 500mg twice daily"
      // We'll put transcript into medicine field and prompt user to confirm.
      const confirmed = confirm(`Detected: "${txt}". Use as medicine name?`);
      if (confirmed) {
        setForm(f => ({ ...f, medicine: txt }));
        setMode("form");
      }
    };
    rec.start();
  }

  // Checklist: mark taken for prescription id, date, time
  function isTaken(prescriptionId, dateStr, timeSlot) {
    const key = `medTaken:${prescriptionId}:${dateStr}:${timeSlot}`;
    return localStorage.getItem(key) === "1";
  }
  function toggleTaken(prescriptionId, dateStr, timeSlot) {
    const key = `medTaken:${prescriptionId}:${dateStr}:${timeSlot}`;
    const cur = localStorage.getItem(key);
    if (cur === "1") {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, "1");
    }
    // force re-render
    setPrescriptions(p => [...p]);
  }

  // UI helper: friendly time label
  const timeLabel = (t) => {
    if (t === "morning") return "Morning";
    if (t === "afternoon") return "Afternoon";
    if (t === "night") return "Night";
    return t;
  };

  // create simple pill from times
  function TimesPills({ times }) {
    if (!Array.isArray(times) || times.length === 0) return null;
    return (
      <div className="flex gap-2 flex-wrap">
        {times.map((t) => (
          <span key={t} className="text-xs px-2 py-1 bg-white/6 rounded-full">
            {timeLabel(t)}
          </span>
        ))}
      </div>
    );
  }

  // Today's date key
  const today = todayKey();

  return (
    <div className="min-h-screen px-6 py-10 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload Prescription</h1>

      {/* TAB BUTTONS */}
      <div className="grid grid-cols-3 gap-4 mb-8">
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
                  ? "border-transparent bg-gradient-to-r from-pink-500/30 to-violet-500/30 text-white shadow-[0_0_20px_rgba(255,0,150,0.12)]"
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
        {/* STATUS MESSAGE */}
        {msg && (
          <div className="p-3 rounded-md bg-yellow-900/40 text-yellow-100">{msg}</div>
        )}

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

              <input onChange={onFile} type="file" accept="image/*" className="hidden" />
            </label>

            {preview && (
              <div className="relative mt-3">
                <img src={preview} alt="preview" className="w-40 h-40 object-cover rounded-md border" />
                <button onClick={() => { setFile(null); URL.revokeObjectURL(preview); setPreview(null); }} className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1">
                  <X size={12} />
                </button>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={handleUploadSubmit} disabled={loading} className="mt-4 flex-1 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white">
                {loading ? "Working..." : "Submit Prescription"}
              </button>
            </div>
          </>
        )}

        {/* FORM MODE */}
        {mode === "form" && (
          <form onSubmit={handleFormSubmit} className="space-y-3">
            <p className="text-sm text-white/70">Fill in your prescription details.</p>

            <input
              value={form.medicine}
              onChange={(e) => setForm({ ...form, medicine: e.target.value })}
              className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-xl text-sm"
              placeholder="Medicine Name"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-xl text-sm"
                type="date"
                placeholder="Start Date"
              />
              <input
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-xl text-sm"
                type="date"
                placeholder="End Date"
              />
            </div>

            <input
              value={form.dosage}
              onChange={(e) => setForm({ ...form, dosage: e.target.value })}
              className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-xl text-sm"
              placeholder="Dosage (e.g., 500mg / 1 tablet)"
            />

            <div className="flex gap-3">
              {["morning", "afternoon", "night"].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => toggleFormTime(t)}
                  className={`px-3 py-2 rounded-lg text-sm ${form.times.includes(t) ? "bg-pink-500/70" : "bg-white/5"}`}
                >
                  {timeLabel(t)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select value={form.foodTiming} onChange={(e) => setForm({ ...form, foodTiming: e.target.value })} className="bg-black/30 border border-white/10 px-3 py-2 rounded-xl text-sm">
                <option value="after_food">After Food</option>
                <option value="before_food">Before Food</option>
                <option value="no_preference">No preference</option>
              </select>
              <input
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Notes (optional)"
                className="flex-1 bg-black/30 border border-white/10 px-3 py-2 rounded-xl text-sm"
              />
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white">
              {loading ? "Saving..." : "Submit Prescription"}
            </button>
          </form>
        )}

        {/* VOICE MODE */}
        {mode === "voice" && (
          <div className="text-center">
            <p className="text-sm text-white/70 mb-4">
              Tap below and speak your prescription.
            </p>

            <button
              onClick={() => {
                if (listening) {
                  recognitionRef.current?.stop();
                  setListening(false);
                } else {
                  startListening();
                }
              }}
              className={`mx-auto ${listening ? "bg-red-600" : "bg-gradient-to-r from-pink-500 to-violet-500"} p-6 rounded-full shadow-lg hover:scale-105 transition`}
            >
              <Mic size={28} className="text-white" />
            </button>

            <p className="text-xs text-white/50 mt-4">
              Example: “Paracetamol 500mg twice daily for 3 days”
            </p>

            <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white" onClick={() => setMode("form")}>
              Edit / Confirm Detected Prescription
            </button>
          </div>
        )}
      </div>

      {/* ONGOING MEDICATIONS */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Ongoing Medications</h2>

        {loading && <div className="text-sm text-white/60">Loading prescriptions...</div>}

        {!loading && prescriptions.length === 0 && (
          <div className="p-4 bg-white/6 rounded-lg text-sm text-white/60">No active prescriptions</div>
        )}

        <div className="space-y-4 mt-4">
          {prescriptions.map((p) => {
            // ensure times exist
            const times = Array.isArray(p.times) ? p.times : (p.times ? JSON.parse(p.times) : []);
            // only show if today within start-end
            const now = new Date();
            const start = new Date(p.startDate);
            const end = new Date(p.endDate);
            const activeToday = now >= start && now <= end;

            return (
              <div key={p.id} className="p-4 rounded-xl bg-white/3 border border-white/8">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg font-semibold">{p.medicine}</div>
                    <div className="text-xs text-white/60">{p.dosage} • {p.foodTiming?.replace("_", " ")}</div>
                    <div className="text-xs text-white/50 mt-1">Duration: {new Date(p.startDate).toLocaleDateString()} → {new Date(p.endDate).toLocaleDateString()}</div>
                    <div className="mt-2"><TimesPills times={times} /></div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-white/50">Added: {new Date(p.createdAt || p.createdAt).toLocaleDateString()}</div>
                    <div className={`mt-2 text-sm ${activeToday ? "text-green-300" : "text-yellow-300"}`}>{activeToday ? "Active today" : "Not active today"}</div>
                  </div>
                </div>

                {/* Checklist for today */}
                <div className="mt-4 flex gap-3 items-center flex-wrap">
                  {times.length === 0 && <div className="text-xs text-white/50">No times set</div>}
                  {times.map((t) => {
                    const taken = isTaken(p.id, today, t);
                    return (
                      <label key={t} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${taken ? "bg-green-600/30" : "bg-white/5"}`}>
                        <input
                          type="checkbox"
                          checked={taken}
                          onChange={() => toggleTaken(p.id, today, t)}
                        />
                        <div className="text-sm">{timeLabel(t)}</div>
                      </label>
                    );
                  })}
                  <button
                    onClick={() => {
                      // quick mark all today's times as taken
                      times.forEach(t => {
                        const key = `medTaken:${p.id}:${today}:${t}`;
                        localStorage.setItem(key, "1");
                      });
                      setPrescriptions(pres => [...pres]);
                    }}
                    className="ml-auto text-sm bg-white/6 px-3 py-2 rounded-lg"
                  >
                    Mark all taken today
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
