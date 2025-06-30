"use client";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";

const Cart = () => {
  const { cart, restItem, sumItem, removeFromCart } = useCartStore();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setItemToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      removeFromCart(itemToDelete);
      setItemToDelete(null);
      setModalOpen(false);
      toast.success("Producto eliminado del carrito");
    }
  };

  return (
    <div className="container mx-auto md:px-4 py-8">
      <h2 className="md:text-2xl font-bold mb-4">Carrito de Compras</h2>
      <DeleteConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="overflow-x-auto">
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
                        onClick={() => handleDelete(item.id)}
                      >
                        <TiDeleteOutline size={20} />
                      </button>
                      <span className="truncate max-w-[100px] md:truncate-none md:max-w-full block">
                        {item.title}
                      </span>
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
                  <td className="p-2 border-b text-sm md:text-md min-w-[80px]">
                    S/ {item.price.toFixed(2)}
                  </td>
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
                  <td className="p-2 border-b text-sm md:text-md">
                    S/ {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan={4}
                  className="text-right font-bold p-2 text-sm md:text-md"
                >
                  Total:
                </td>
                <td className="p-2 font-bold text-sm md:text-md">
                  S/ {total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
