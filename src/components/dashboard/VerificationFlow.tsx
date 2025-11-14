'use client';

import type { AIVerificationTask } from "@/data/mockData";
import { useState, type ChangeEvent, useEffect } from "react";

type Props = {
  tasks: AIVerificationTask[];
};

export default function VerificationFlow({ tasks }: Props) {
  const [activeTaskId, setActiveTaskId] = useState(tasks[0]?.id ?? null);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [match, setMatch] = useState<boolean | null>(null);
  const [uploading, setUploading] = useState(false);

  // completed tasks
  const [completed, setCompleted] = useState<string[]>([]);

  const activeTask = tasks.find((t) => t.id === activeTaskId);
  const approved = match === true;

  // ⬅ Auto-select next task when one completes
  useEffect(() => {
    if (completed.length === 0) return;
    const pending = tasks.filter((t) => !completed.includes(t.id));
    if (pending.length > 0) {
      setActiveTaskId(pending[0].id);
      setMatch(null);
      setStatusMessage(null);
    }
  }, [completed]);

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    if (!activeTask) return;

    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMessage("Analyzing prescription…");
    setMatch(null);

    try {
      const body = new FormData();
      body.append("prescription_text", activeTask.requirement || "");
      body.append("image", file);

      const res = await fetch("http://10.11.7.87:8000/verify", {
        method: "POST",
        body,
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      setMatch(data.match);

      if (data.match) {
        setStatusMessage("Prescription Verified ✓");

        // mark task completed
        setCompleted((prev) =>
          prev.includes(activeTask.id) ? prev : [...prev, activeTask.id]
        );
      } else {
        setStatusMessage("Mismatch ❌ — upload correct medicine label");
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("Upload failed. Try again.");
      setMatch(null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,2fr]">

      {/* LEFT SIDE — Pending + Completed */}
      <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5">

        {/* Pending */}
        <p className="text-xs uppercase tracking-[0.3em] text-white">Pending checks</p>

        <div className="space-y-2">
          {tasks
            .filter((t) => !completed.includes(t.id))
            .map((task) => {
              const isActive = task.id === activeTaskId;

              return (
                <button
                  key={task.id}
                  onClick={() => {
                    setActiveTaskId(task.id);
                    setMatch(null);
                    setStatusMessage(null);
                  }}
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition flex justify-between items-center ${
                    isActive
                      ? "border-transparent bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-white"
                      : "border-white/10 text-white hover:border-white/40"
                  }`}
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white">{task.patient}</p>
                    <p className="text-base text-white">
                      {task.type} - {task.requirement}
                    </p>
                    <p className="text-xs text-white/70">{task.reference}</p>
                  </div>
                </button>
              );
            })}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-4"></div>

        {/* Completed */}
        <p className="text-xs uppercase tracking-[0.3em] text-green-400">Can be Given to patient</p>

        <div className="space-y-2">
          {tasks
            .filter((t) => completed.includes(t.id))
            .map((task) => (
              <div
                key={task.id}
                className="w-full rounded-2xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-left text-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-green-300">
                    {task.patient}
                  </p>
                  <p className="text-base text-green-200">
                    {task.type} - {task.requirement}
                  </p>
                  <p className="text-xs text-green-300/60">{task.reference}</p>
                </div>

                <span className="text-green-400 text-lg font-bold">✓</span>
              </div>
            ))}
        </div>
      </div>

      {/* RIGHT SIDE — Upload Flow */}
      <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6">
        {activeTask ? (
          <>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white">Current task</p>
              <h2 className="text-2xl font-semibold text-white">{activeTask.requirement}</h2>
              <p className="text-sm text-white/70">{activeTask.reference}</p>
            </div>

            {/* Upload box */}
            <label className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/30 p-6 text-sm text-white cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              {uploading ? (
                <span className="animate-pulse text-white/60">Uploading…</span>
              ) : (
                <>
                  <span>Click to upload medicine label</span>
                  <span className="text-xs text-white/60">Vial, strip, injection label…</span>
                </>
              )}
            </label>

            {/* Status */}
            {statusMessage && (
              <div
                className={`rounded-2xl p-4 text-sm ${
                  match
                    ? "border border-green-400/30 bg-green-500/10 text-green-300"
                    : match === false
                    ? "border border-red-400/30 bg-red-500/10 text-red-300"
                    : "border border-white/20 bg-white/5 text-white/80"
                }`}
              >
                {statusMessage}
              </div>
            )}

            <button
              disabled={!approved || uploading}
              className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {approved ? "Proceed with medication" : "Awaiting AI verification"}
            </button>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/20 bg-black/30 p-6 text-center text-sm text-white">
            All clear — no pending checks.
          </div>
        )}
      </div>
    </div>
  );
}
