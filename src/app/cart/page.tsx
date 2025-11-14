'use client';

import Link from "next/link";
import { useState } from "react";

import {
  useCart,
  useRemoveFromCart,
  useUpdateCartItem,
} from "@/lib/hooks/cart";

const paymentOptions = [
  { label: "UPI AutoPay", value: "upi" },
  { label: "Card on file", value: "card" },
  { label: "Bank transfer", value: "bank" },
];

export default function CartPage() {
  const { data: cart = [] } = useCart();
  const remove = useRemoveFromCart();
  const update = useUpdateCartItem();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [note, setNote] = useState("Engineer to carry sterile circuit set");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.pricePerDay * item.quantity,
    0
  );
  const deposit = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + deposit;

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold text-white">Your cart is empty</h1>
        <p className="text-sm text-white">
          Add medical devices and caregiver shifts to align delivery and staffing.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/devices"
            className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white"
          >
            Browse devices
          </Link>
          <Link
            href="/caregivers"
            className="rounded-full border border-white/20 px-5 py-3 text-sm text-white"
          >
            Book caregivers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-white">
            Unified cart
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Devices & caregiver shifts
          </h1>
          <p className="text-sm text-white">
            Once you check out, VIBRANT syncs delivery slots with nurse schedules and
            sends AI verification steps automatically.
          </p>
        </header>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white sm:flex-row sm:items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-28 w-28 rounded-2xl object-cover"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{item.name}</h2>
                  <p className="text-xs uppercase tracking-[0.3em] text-white">
                    ₹{item.pricePerDay} / day
                  </p>
                </div>
                <button
                  onClick={() => remove.mutate(item.id)}
                  className="text-xs text-pink-300 underline decoration-dotted"
                >
                  Remove
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full border border-white/10 px-3 py-1">
                  Engineer install included
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1">
                  AI verification enabled
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
              <button
                onClick={() =>
                  update.mutate({
                    id: item.id,
                    updates: { quantity: Math.max(1, item.quantity - 1) },
                  })
                }
                className="text-lg text-white"
              >
                -
              </button>
              <span className="text-white">{item.quantity}</span>
              <button
                onClick={() =>
                  update.mutate({
                    id: item.id,
                    updates: { quantity: item.quantity + 1 },
                  })
                }
                className="text-lg text-white"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <label className="text-xs uppercase tracking-[0.3em] text-white">
            Delivery note
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white focus:border-pink-400 focus:outline-none"
            />
          </label>
        </div>
      </div>

      <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Checkout summary</h2>

        <div className="space-y-2 text-sm text-white">
          <Row label="Subtotal" value={`₹${subtotal}`} />
          <Row label="Refundable deposit" value={`₹${deposit}`} />
          <Row label="AI verification fee" value="₹0" />
          <div className="h-px bg-white/10" />
          <Row label="Amount due" value={`₹${grandTotal}`} bold />
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white">
            Payment method
          </p>
          <div className="space-y-2">
            {paymentOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPaymentMethod(option.value)}
                className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  paymentMethod === option.value
                    ? "border-transparent bg-gradient-to-r from-pink-500/70 to-violet-500/70 text-white"
                    : "border-white/15 text-white hover:border-white/40"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:shadow-pink-500/40">
          Confirm schedule & pay
        </button>

        <div className="rounded-2xl border border-dashed border-white/20 bg-black/30 p-4 text-xs text-white">
          Nurses will receive AI verification steps right after checkout. Cart
          merges into a single itinerary for the family.
        </div>
      </aside>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-semibold text-white" : undefined}>{label}</span>
      <span className={bold ? "text-white" : undefined}>{value}</span>
    </div>
  );
}
