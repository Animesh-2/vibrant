'use client';

import type { AIVerificationTask } from "@/data/mockData";
import { submitAiVerification } from "@/lib/api";
import { type ChangeEvent, useState } from "react";

type Props = {
  tasks: AIVerificationTask[];
};

export default function VerificationFlow({ tasks }: Props) {
  const [activeTaskId, setActiveTaskId] = useState(tasks[0]?.id ?? null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [aiConfidence, setAiConfidence] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const activeTask = tasks.find((task) => task.id === activeTaskId);
  const approved = statusMessage?.includes("cleared") ?? false;

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    if (!activeTask) return;
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatusMessage("Uploading evidence…");
    try {
      const response = await submitAiVerification({
        taskId: activeTask.id,
        fileName: file.name,
      });
      setAiConfidence(response.confidence);
      setStatusMessage(response.message);
    } catch {
      setStatusMessage("Upload failed. Retake the photo and try again.");
      setAiConfidence(null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,2fr]">
      <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Pending checks
        </p>
        <div className="space-y-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => setActiveTaskId(task.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                task.id === activeTaskId
                  ? "border-transparent bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-white"
                  : "border-white/10 text-gray-300 hover:border-white/40"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                {task.patient}
              </p>
              <p className="text-base text-white">
                {task.type} - {task.requirement}
              </p>
              <p className="text-xs text-gray-500">{task.reference}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6">
        {activeTask ? (
          <>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Current task
              </p>
              <h2 className="text-2xl font-semibold text-white">
                {activeTask.requirement}
              </h2>
              <p className="text-sm text-gray-400">{activeTask.reference}</p>
            </div>

            <label className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/30 p-6 text-sm text-gray-400">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
              <span className="text-white">
                Drag & drop evidence or click to upload
              </span>
              <span className="text-xs text-gray-500">
                Medicine vial label, insulin syringe, injection prep…
              </span>
            </label>

            {statusMessage && (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-gray-200">
                <p>{statusMessage}</p>
                {aiConfidence && (
                  <p className="mt-2 text-xs text-gray-400">
                    AI confidence: {(aiConfidence * 100).toFixed(1)}%
                  </p>
                )}
              </div>
            )}

            <button
              disabled={!approved || uploading}
              className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {approved ? "Proceed with medication" : "Awaiting AI approval"}
            </button>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/20 bg-black/30 p-6 text-center text-sm text-gray-400">
            All clear - no pending AI checks.
          </div>
        )}
      </div>
    </div>
  );
}

