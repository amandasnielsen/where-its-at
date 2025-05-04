import { create } from 'zustand';

export const useCartStore = create(set => ({
  cart: [],

  // Lägg till eller minska biljetter
  addToCart: item => set(state => {
    const existing = state.cart.find(i => i.id === item.id);
    if (existing) {
      const updatedQty = existing.quantity + item.quantity;

      // Om 0 eller mindre, ta bort från varukorgen
      if (updatedQty <= 0) {
        return {
          cart: state.cart.filter(i => i.id !== item.id),
        };
      }

      return {
        cart: state.cart.map(i =>
          i.id === item.id ? { ...i, quantity: updatedQty } : i
        ),
      };
    }

    // Lägg till ny vara om quantity > 0
    return item.quantity > 0
      ? { cart: [...state.cart, item] }
      : state;
  }),

  // Uppdatera direkt till en specifik mängd
  updateItemQuantity: (id, newQty) =>
    set(state => ({
      cart: newQty > 0
        ? state.cart.map(item =>
            item.id === id ? { ...item, quantity: newQty } : item
          )
        : state.cart.filter(item => item.id !== id),
    })),

  // Töm varukorgen
  clearCart: () => set({ cart: [] }),
}));

// 🔍 Selector för totalpris – importera separat:
export const useTotalPrice = () =>
  useCartStore(state =>
    state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  );
