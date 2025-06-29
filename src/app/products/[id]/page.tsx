"use client";
import { useFetchProductById } from "@/utils/productsApi";
import { useCartStore } from "@/store/cartStore";
import { FaRegStar } from "react-icons/fa";
import Image from "next/image";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const Product = ({ params }: Props) => {
  const { id } = React.use(params);
  const { addToCart } = useCartStore();
  const {
    product: selectedProduct,
    isLoading,
    error,
  } = useFetchProductById(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error al cargar el producto</p>
          <p className="text-gray-600">Por favor, intenta de nuevo más tarde</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 h-[90vh]">
      <div className="rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-scroll">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                width={400}
                height={256}
                className="object-contain"
                priority
              />
            </div>

            <div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-green-600">
                  ${selectedProduct.price}
                </span>
              </div>

              {selectedProduct.rating && (
                <div className="flex items-center mb-4">
                  <FaRegStar className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-2 ">
                    {selectedProduct.rating.rate} de 5 (
                    {selectedProduct.rating.count} reseñas)
                  </span>
                </div>
              )}

              <div className="mb-4">
                <span className="text-sm uppercase tracking-wide">
                  {selectedProduct.category}
                </span>
              </div>

              <p className=" mb-6 leading-relaxed">
                {selectedProduct.description}
              </p>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                }}
                className="w-full bg-blue-600 py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
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
