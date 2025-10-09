// store/cartStore.ts
import { create } from "zustand";

type MenuItem = {
  id: string;
  title: string;
  price: number;
  fileUrl: string;
};

type CartItem = MenuItem & { quantity: number; totalPrice: number };

type CartState = {
  items: CartItem[];
  addToCart: (item: MenuItem, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addToCart: (item, quantity) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: i.quantity + quantity,
                  totalPrice: (i.quantity + quantity) * i.price,
                }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { ...item, quantity, totalPrice: quantity * item.price },
        ],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ items: [] }),
}));
