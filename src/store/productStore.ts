import { Product, ProductStore } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      filtered: [],
      setProducts: (products) => set({ products, filtered: products }),
      setFiltered: (filtered: Product[]) => set({ filtered }),

      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
      },

      filterProductByCategory: (category) => {
        const { products } = get();
        set({ filtered: products.filter((p) => p.category === category) });
      },
      filterProductByPrice: (min, max) => {
        const { products } = get();
        set({
          filtered: products.filter((p) => p.price >= min && p.price <= max),
        });
      },
    }),
    {
      name: "product-storage",
      partialize: (state) => ({
        products: state.products,
      }),
    }
  )
);
