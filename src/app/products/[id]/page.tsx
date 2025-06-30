"use client";
import { useFetchProductById } from "@/utils/productsApi";
import { useCartStore } from "@/store/cartStore";
import { FaRegStar } from "react-icons/fa";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";

const Product = () => {
  const params = useParams();
  const id = Number(params?.id);
  const { addToCart } = useCartStore();
  const {
    product: selectedProduct,
    isLoading,
    error,
  } = useFetchProductById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-2xl">Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto bg-white rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedProduct.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                width={400}
                height={300}
                className="object-contain max-h-[300px]"
                priority
              />
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-3xl font-bold text-blue-600">
                  S/ {selectedProduct.price}
                </span>
              </div>

              {selectedProduct.rating && (
                <div className="flex items-center gap-2 text-yellow-500">
                  <FaRegStar className="w-5 h-5" />
                  <span className="text-gray-700">
                    {selectedProduct.rating.rate} de 5 (
                    {selectedProduct.rating.count} reseñas)
                  </span>
                </div>
              )}

              <div>
                <span className="text-sm uppercase text-gray-500 tracking-widest">
                  {selectedProduct.category}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {selectedProduct.description}
              </p>

              <button
                className="btn btn-primary"
                onClick={() => addToCart(selectedProduct)}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
