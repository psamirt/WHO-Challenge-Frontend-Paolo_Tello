"use client";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";

const Cart = () => {
  const { cart, restItem, sumItem, removeFromCart } = useCartStore();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="p-2 border-b">Producto</th>
              <th className="p-2 border-b">Imagen</th>
              <th className="p-2 border-b">Precio</th>
              <th className="p-2 border-b">Cantidad</th>
              <th className="p-2 border-b">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border-b max-w-[300px] align-middle">
                  <div className="flex items-center gap-2">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        toast(
                          (t) => (
                            <div className="flex flex-col gap-2">
                              <h1 className="text-3xl font-bold text-gray-600">
                                Eliminar
                              </h1>
                              <hr className="border-t border-gray-300 my-2" />
                              <span>
                                ¿Estás seguro de eliminar este producto?
                              </span>
                              <div className="flex justify-evenly w-full">
                                <button
                                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                  onClick={() => {
                                    removeFromCart(item.id);
                                    toast.dismiss(t.id);
                                  }}
                                >
                                  Sí
                                </button>
                                <button
                                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                                  onClick={() => toast.dismiss(t.id)}
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          ),
                          {
                            duration: Infinity,
                            id: `confirm-delete-${item.id}`,
                          }
                        )
                      }
                    >
                      <TiDeleteOutline size={20} />
                    </button>
                    <span>{item.title}</span>
                  </div>
                </td>
                <td className="p-2 border-b h-[60px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </td>
                <td className="p-2 border-b">S/ {item.price.toFixed(2)}</td>
                <td className="p-2 border-b align-middle">
                  <div className="flex items-center gap-2">
                    <button
                      className={`${item.quantity === 1 ? "opacity-20 disabled cursor-not-allowed" : " cursor-pointer"}`}
                      onClick={() => restItem(item.id)}
                    >
                      <CiCircleMinus size={20} />
                    </button>
                    <span className="w-4 text-center">{item.quantity}</span>
                    <button
                      className="cursor-pointer"
                      onClick={() => sumItem(item.id)}
                    >
                      <CiCirclePlus size={20} />
                    </button>
                  </div>
                </td>
                <td className="p-2 border-b">
                  S/ {(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="text-right font-bold p-2">
                Total:
              </td>
              <td className="p-2 font-bold">S/ {total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;
