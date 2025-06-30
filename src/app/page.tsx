"use client";
import { useFetchProducts } from "@/utils/productsApi";
import CardProducts from "@/components/CardProducts";
import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";

export default function Home() {
  const { products, isLoading, error } = useFetchProducts();
  const { setProducts, filtered } = useProductStore();

  useEffect(() => {
    if (products) {
      setProducts(products);
    }
  }, [products, setProducts]);

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

  return (
    <div className="min-h-screen ">
      <main>
        <CardProducts products={filtered} />
      </main>
    </div>
  );
}
