'use client';

import { type ChangeEvent, useState, useEffect } from 'react';
import { bookDevice } from '@/lib/api';
import { useAddToCart } from '@/lib/hooks/cart';

type Props = {
  deviceId: string;
  pricePerDay: number;
  deviceImage: string;
  deviceName: string;
};

export default function BookingModal({
  deviceId,
  pricePerDay,
  deviceImage,
  deviceName,
}: Props) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [bookingCode, setBookingCode] = useState<string | null>(null);

  const { mutate: addToCart } = useAddToCart();

  // Load saved details
  useEffect(() => {
    const raw = localStorage.getItem(`booking:${deviceId}`);
    if (!raw) return;

    const saved = JSON.parse(raw);
    setStart(saved.start || '');
    setEnd(saved.end || '');
    setMessage(saved.message || null);
    setBookingCode(saved.bookingCode || null);
  }, [deviceId]);

  // Auto-save to localStorage
  useEffect(() => {
    const data = { start, end, message, bookingCode };
    localStorage.setItem(`booking:${deviceId}`, JSON.stringify(data));
  }, [start, end, message, bookingCode, deviceId]);

  async function handleBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await bookDevice(deviceId, {
        user_id: 'nurse-demo',
        start,
        end,
      });

      setBookingCode(response.bookingId);
      const msg = `Slot blocked for ${response.totalDays} day(s). Ops team will confirm shortly.`;
      setMessage(msg);

      // Add to cart
      addToCart({
        id: deviceId,
        name: deviceName,
        image: deviceImage,
        start,
        end,
        days: response.totalDays,
        pricePerDay,
        totalCost: response.totalDays * pricePerDay,
        bookingCode: response.bookingId,
      });

      // ⭐ CLOSE MODAL AFTER SUCCESS
      setTimeout(() => setOpen(false), 400);

    } catch {
      setMessage('Booking failed. Please retry or contact concierge.');
    } finally {
      setLoading(false);
    }
  }

  const estimatedCost =
    start && end ? calcTotal(start, end, pricePerDay) : pricePerDay;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:shadow-pink-500/40"
      >
        Reserve this device
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#05080f] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white">
                  Reservation
                </p>
                <h3 className="text-2xl font-semibold text-white">
                  Schedule delivery
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-white hover:text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleBook} className="mt-6 space-y-4 text-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Start date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
                <Field
                  label="End date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white">
                      Estimated charge
                    </p>
                    <p className="text-2xl font-semibold">₹{estimatedCost}</p>
                    <p className="text-xs text-white">₹{pricePerDay}/day</p>
                  </div>
                  <div className="text-right text-xs text-white">
                    Includes doorstep QC, installation, and pickup.
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-white/90 px-4 py-3 font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Blocking slot...' : 'Confirm reservation'}
              </button>

              {message && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200">
                  <p>{message}</p>
                  {bookingCode && (
                    <p className="mt-2 text-xs text-pink-200">
                      Booking code: {bookingCode}
                    </p>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="text-xs uppercase tracking-[0.3em] text-white">
      {label}
      <input
        required
        type="date"
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-3 text-white focus:border-pink-400 focus:outline-none"
      />
    </label>
  );
}

function calcTotal(start: string, end: string, perDay: number) {
  try {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.max(
      1,
      Math.ceil((e.getTime() - s.getTime()) / 86400000)
    ) + 1;
    return diff * perDay;
  } catch {
    return perDay;
  }
}
