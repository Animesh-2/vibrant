// TEMP MEMORY CART STORE
let cart: any[] = [];

export async function getCart() {
  return cart;
}

export async function addToCart(item: {
  id: string;
  name: string;
  pricePerDay?: number;
  quantity?: number;
  image?: string;
}) {
  const exists = cart.find((x) => x.id === item.id);

  if (exists) {
    exists.quantity = (exists.quantity || 1) + 1;
    return exists;
  }

  const newItem = {
    ...item,
    quantity: item.quantity || 1,
  };

  cart.push(newItem);
  return newItem;
}

export async function updateCartItem(
  id: string,
  updates: Partial<{ quantity: number }>
) {
  cart = cart.map((item) =>
    item.id === id ? { ...item, ...updates } : item
  );

  return cart.find((item) => item.id === id);
}

export async function removeFromCart(id: string) {
  cart = cart.filter((item) => item.id !== id);
  return true;
}

export async function clearCart() {
  cart = [];
  return true;
}
