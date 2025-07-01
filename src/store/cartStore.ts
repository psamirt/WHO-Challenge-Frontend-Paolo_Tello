import { CartStore, CartItem } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find(
          (item: CartItem) => item.id === product.id
        );

        if (existingItem) {
          set({
            cart: cart.map((item: CartItem) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== productId),
        })),
      sumItem: (productId: number) =>
        set((state) => ({
          cart: state.cart.map((product) =>
            product.id === productId
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        })),
      restItem: (productId: number) =>
        set((state) => ({
          cart: state.cart.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  quantity: product.quantity > 1 ? product.quantity - 1 : 1,
                }
              : product
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);
