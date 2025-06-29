"use client";
import { useFetchProducts } from "@/utils/productsApi";
import CardProducts from "@/components/CardProducts";
import { Button } from "flowbite-react";
import { useCartStore } from "@/store/cartStore";

export default function Home() {
  const { products, isLoading, error } = useFetchProducts();
  const { clearCart } = useCartStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
      <header className=" shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-around">
          <h1 className="text-3xl font-bold text-amber-50">
            Bienvenido a la prueba técnica de Welding Helmets Online
          </h1>
          <Button
            onClick={() => {
              localStorage.removeItem("cart");
              clearCart();
            }}
          >
            Limpiar el carrito
          </Button>
        </div>
      </header>

      <main>
        {products && products.length > 0 ? (
          <CardProducts products={products} />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-amber-50 text-lg">
                No se encontraron productos
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
