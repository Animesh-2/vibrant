"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useCart,
  useRemoveFromCart,
  useUpdateCartItem,
  useClearCart,
} from "@/lib/hooks/cart";

const paymentOptions = [
  { label: "UPI AutoPay", value: "upi" },
  { label: "Card on file", value: "card" },
  { label: "Bank transfer", value: "bank" },
];

// -------------------------------------------------------
//  PAYMENT SHEET
// -------------------------------------------------------
function PaymentSheet({
  method,
  amount,
  onClose,
  onSuccess,
  onFail,
}: {
  method: string;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
  onFail: () => void;
}) {
  const [phase, setPhase] = useState<"processing" | "success" | "fail">(
    "processing"
  );

  useEffect(() => {
    const t = setTimeout(() => {
      const isOk = true; // demo mode
      if (isOk) {
        setPhase("success");
        setTimeout(onSuccess, 1300);
      } else {
        setPhase("fail");
        setTimeout(onFail, 1300);
      }
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-end bg-black/60 backdrop-blur-xl animate-fadeIn">
      <div className="w-full rounded-t-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 shadow-[0_-20px_80px_rgba(0,0,0,0.4)] animate-slideUp">
        {/* PROCESSING */}
        {phase === "processing" && (
          <div className="text-center space-y-4 text-white">
            <div className="mx-auto h-14 w-14 border-4 border-pink-500 border-b-transparent rounded-full animate-spin"></div>
            <h2 className="text-lg font-semibold">Processing your {method}…</h2>
            <p className="text-white/70 text-sm">
              Chill for a sec, confirming everything.
            </p>
          </div>
        )}

        {/* SUCCESS */}
        {phase === "success" && (
          <div className="text-center space-y-4 text-white animate-fadeIn">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-500/20 backdrop-blur">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-xl font-semibold">Payment successful</h2>
            <p className="text-white/70 text-sm">
              You're locked in. Your schedule is synced.
            </p>
          </div>
        )}

        {/* FAIL */}
        {phase === "fail" && (
          <div className="text-center space-y-4 text-white animate-fadeIn">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-500/20 backdrop-blur">
              <span className="text-4xl">❌</span>
            </div>
            <h2 className="text-xl font-semibold">Payment failed</h2>
            <p className="text-white/70 text-sm">Try again real quick.</p>
          </div>
        )}

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-500/70 to-violet-500/70 py-3 font-semibold text-white backdrop-blur shadow-lg hover:shadow-pink-500/30 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------
//  MAIN CART PAGE
// -------------------------------------------------------

export default function CartPage() {
  const { data: cart = [] } = useCart();
  const remove = useRemoveFromCart();
  const update = useUpdateCartItem();
  const clear = useClearCart(); // 🔥 added

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [note, setNote] = useState("Engineer to carry sterile circuit set");

  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.pricePerDay * item.quantity,
    0
  );

  const deposit = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + deposit;

  // -------------------------------------------------------
  //  TRIGGER PAYMENT SHEET
  // -------------------------------------------------------
  const handleCheckout = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    setTimeout(() => {
      setShowPaymentSheet(true);
      setIsProcessing(false);
    }, 400);
  };

  // -------------------------------------------------------
  //  EMPTY STATE
  // -------------------------------------------------------
  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold text-white">
          Your cart is empty
        </h1>
        <p className="text-sm text-white">
          Add medical devices and caregiver shifts to align delivery and
          staffing.
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
    <>
      {/* Payment Bottom Sheet */}
      {showPaymentSheet && (
        <PaymentSheet
          method={paymentMethod}
          amount={grandTotal}
          onClose={() => setShowPaymentSheet(false)}
          onSuccess={() => {
            setShowPaymentSheet(false);
            clear.mutate(); // 🔥 CLEAR CART AFTER SUCCESS
          }}
          onFail={() => setShowPaymentSheet(false)}
        />
      )}

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 lg:grid-cols-[2fr,1fr]">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <header>
            <p className="text-xs uppercase tracking-[0.4em] text-white">
              Unified cart
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Devices & caregiver shifts
            </h1>
            <p className="text-sm text-white">
              Once you check out, MerilCare syncs delivery slots with nurse
              schedules and sends AI verification steps automatically.
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
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-xs uppercase tracking-[0.3em]">
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

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-2">
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
                <span>{item.quantity}</span>
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

          {/* DELIVERY NOTE */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <label className="text-xs uppercase tracking-[0.3em] text-white">
              Delivery note
            </label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white focus:border-pink-400 focus:outline-none"
            />
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Checkout summary</h2>

          <div className="space-y-2 text-sm text-white">
            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label="Refundable deposit" value={`₹${deposit}`} />
            <Row label="AI verification fee" value="₹0" />
            <div className="h-px bg-white/10" />
            <Row label="Amount due" value={`₹${grandTotal}`} bold />
          </div>

          {/* PAYMENT METHOD */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em]">Payment method</p>
            {paymentOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPaymentMethod(option.value)}
                className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  paymentMethod === option.value
                    ? "border-transparent bg-gradient-to-r from-pink-500/70 to-violet-500/70 text-white"
                    : "border-white/15 hover:border-white/40 text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* CHECKOUT BUTTON */}
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition ${
              isProcessing
                ? "bg-gray-500/80 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-violet-500 shadow-pink-500/20 hover:shadow-pink-500/40"
            }`}
          >
            {isProcessing ? "Loading…" : "Confirm schedule & pay"}
          </button>

          <div className="rounded-2xl border border-dashed border-white/20 bg-black/30 p-4 text-xs text-white">
            Nurses will receive AI verification steps right after checkout. Cart
            merges into a single itinerary.
          </div>
        </aside>
      </div>
    </>
  );
}

// row component
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
    <div className="flex items-center justify-between bg-black">
      <span className={bold ? "font-semibold" : ""}>{label}</span>
      <span className={bold ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}
