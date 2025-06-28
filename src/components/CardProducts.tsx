"use client";
import React, { useState } from "react";
import { Product } from "@/types/products";
import { useCartStore } from "@/store/cartStore";
import { FaRegStar } from "react-icons/fa";
import Image from "next/image";

interface CardProductsProps {
  products: Product[];
}

const CardProducts: React.FC<CardProductsProps> = ({ products }) => {
  const { addToCart } = useCartStore();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {products?.map((product) => (
          <div
            key={product.id}
            className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-slate-700"
            onClick={() => handleProductClick(product)}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                loading="lazy"
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {product.title}
              </h3>
              <div className="flex items-center mb-2">
                {product.rating && (
                  <div className="flex items-center">
                    <FaRegStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">
                  ./S {product.price}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles del producto */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 bg-black/75">
          <div className="rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-scroll bg-slate-900">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
                <button onClick={closeModal} className="text-2xl">
                  ×
                </button>
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
                      <span className="ml-2 text-gray-600">
                        {selectedProduct.rating.rate} de 5 (
                        {selectedProduct.rating.count} reseñas)
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <span className="text-sm text-gray-500 uppercase tracking-wide">
                      {selectedProduct.category}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      closeModal();
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
      )}
    </div>
  );
};

export default CardProducts;
