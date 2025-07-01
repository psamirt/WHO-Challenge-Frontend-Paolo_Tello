import { PaginationStore } from "@/types/types";
import { create } from "zustand";

export const usePaginationStore = create<PaginationStore>((set, get) => ({
  currentPage: 1,
  totalPages: 0,
  itemsPerPage: 8,

  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items }),
  setTotalItems: (total) =>
    set({
      totalPages: Math.ceil(total / get().itemsPerPage),
    }),
}));
