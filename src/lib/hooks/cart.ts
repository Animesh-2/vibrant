import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// localStorage helpers
const STORAGE_KEY = "vibrant_cart";

function readLocalCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocalCart(cart: any[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// Normalize the item so UI always receives correct fields
function normalizeItem(raw: any) {
  return {
    id: raw.id,
    name: raw.name ?? raw.title ?? "Unnamed device",
    image: raw.image ?? raw.imageUrl ?? "",
    pricePerDay:
      raw.pricePerDay ??
      raw.rentalPrice ??
      raw.price ??
      0,

    quantity: raw.quantity || 1,

    // booking info (optional)
    start: raw.start || null,
    end: raw.end || null,
    bookingCode: raw.bookingCode || null,
  };
}

// --- get cart ---
export async function getCart() {
  return readLocalCart();
}

// --- add item ---
export async function addToCart(rawItem: any) {
  const cart = readLocalCart();
  const item = normalizeItem(rawItem);

  const existing = cart.find((x: any) => x.id === item.id);

  let updated;

  if (existing) {
    updated = cart.map((x: any) =>
      x.id === item.id
        ? { ...x, quantity: x.quantity + item.quantity }
        : x
    );
  } else {
    updated = [...cart, item];
  }

  writeLocalCart(updated);
  return updated;
}

// --- update item (quantity, booking, etc.) ---
export async function updateCartItem(id: string, updates: any) {
  const cart = readLocalCart();

  const updated = cart.map((item: any) =>
    item.id === id
      ? { ...item, ...updates }
      : item
  );

  writeLocalCart(updated);
  return updated;
}

// --- remove item ---
export async function removeFromCart(id: string) {
  const cart = readLocalCart();
  const updated = cart.filter((item: any) => item.id !== id);
  writeLocalCart(updated);
  return updated;
}

// --- clear cart ---
export async function clearCart() {
  writeLocalCart([]);
  return [];
}

// --- react-query hooks ---
export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    initialData: readLocalCart(),
  });
};

export const useAddToCart = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["cart"] }),
  });
};

export const useUpdateCartItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: any) =>
      updateCartItem(id, updates),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["cart"] }),
  });
};

export const useRemoveFromCart = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["cart"] }),
  });
};

export const useClearCart = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: clearCart,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["cart"] }),
  });
};
