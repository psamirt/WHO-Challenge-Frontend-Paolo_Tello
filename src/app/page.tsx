"use client";
import { useFetchProducts } from "@/utils/productsApi";
import CardProducts from "@/components/CardProducts";
import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import { usePaginationStore } from "@/store/paginationStore";
import { AnimatePresence, motion } from "motion/react";

export default function Home() {
  const { products, isLoading, error } = useFetchProducts();
  const { setProducts, filtered } = useProductStore();
  const { currentPage, itemsPerPage, setTotalItems, setCurrentPage } =
    usePaginationStore();

  useEffect(() => {
    if (products) {
      setProducts(products);
    }
  }, [products, setProducts]);

  useEffect(() => {
    setTotalItems(filtered.length);
    setCurrentPage(1);
  }, [filtered, setTotalItems, setCurrentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error al cargar los productos</p>
          <p className="text-gray-600">Por favor, intenta de nuevo más tarde</p>
        </div>
      </div>
    );
  }

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedProducts = filtered.slice(startIdx, endIdx);

  return (
    <div className="min-h-[90vh]">
      <main className="md:flex flex-row px-4 md:px-8 h-[90vh] mt-20 md:mt-0">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="md:flex md:flex-col md:items-center md:justify-center"
          >
            <Filters />
            <Pagination />
          </motion.div>
        </AnimatePresence>
        <div className="flex-1 flex flex-col">
          <CardProducts products={paginatedProducts} />
        </div>
      </main>
    </div>
  );
}
