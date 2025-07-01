"use client";
import React from "react";
import { CardProductsProps, Product } from "@/types/types";
import { useCartStore } from "../store/cartStore";
import { FaRegStar } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const CardProducts: React.FC<CardProductsProps> = ({ products }) => {
  const { addToCart } = useCartStore();
  const router = useRouter();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* <Filters /> */}
      {products.length === 0 ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-amber-50 text-lg">No se encontraron productos</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 card">
          {products?.map((product) => (
            <AnimatePresence key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg p-1 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-base-200 cursor-pointer card-body  justify-between flex flex-col w-[300px] mx-auto"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between h-[165px]">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 card-title">
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
                    <span className="text-xl font-bold ">
                      S/{product.price}
                    </span>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardProducts;
