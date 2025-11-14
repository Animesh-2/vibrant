"use client";


import { useCart, useRemoveFromCart, useUpdateCartItem } from "@/lib/hooks/cart";
import Link from "next/link";

export default function CartPage() {
  const { data: cart = [] } = useCart();
  const remove = useRemoveFromCart();
  const update = useUpdateCartItem();

  const total = cart.reduce(
    (sum, item) => sum + item.pricePerDay * item.quantity,
    0
  );

  return (
    <div className="px-6 py-24 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white text-center mb-10 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p>Your cart is empty 🚑</p>
          <Link
            href="/devices"
            className="text-pink-400 underline hover:text-pink-300 mt-3 inline-block"
          >
            Browse devices
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl shadow-[0_0_20px_rgba(255,0,180,0.15)]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white">{item.name}</h2>
                <p className="text-gray-400 mt-1">
                  ₹{item.pricePerDay} / day
                </p>

                {/* QUANTITY */}
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() =>
                      update.mutate({ id: item.id, updates: { quantity: item.quantity - 1 } })
                    }
                    disabled={item.quantity === 1}
                    className="px-3 py-1 rounded-lg bg-white/10 text-white"
                  >
                    -
                  </button>

                  <span className="text-white">{item.quantity}</span>

                  <button
                    onClick={() =>
                      update.mutate({ id: item.id, updates: { quantity: item.quantity + 1 } })
                    }
                    className="px-3 py-1 rounded-lg bg-white/10 text-white"
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => remove.mutate(item.id)}
                  className="text-pink-400 text-sm mt-3 hover:text-pink-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL + CHECKOUT */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md mt-10 shadow-[0_0_30px_rgba(150,0,255,0.25)]">
            <div className="flex justify-between text-white text-lg font-semibold">
              <p>Total</p>
              <p>₹{total}</p>
            </div>

            <button
              className="w-full py-3 mt-5 rounded-lg text-white font-semibold 
              bg-gradient-to-r from-pink-500 to-violet-500 hover:scale-[1.03] 
              transition-all hover:shadow-[0_0_20px_rgba(255,0,180,0.5)]"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
