"use client";
import { useCartStore } from "@/store/cartStore";
import React from "react";

const Cart = () => {
  const { cart } = useCartStore();
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
              <th className="p-2 border-b">Precio</th>
              <th className="p-2 border-b">Cantidad</th>
              <th className="p-2 border-b">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border-b">{item.title}</td>
                <td className="p-2 border-b">S/ {item.price.toFixed(2)}</td>
                <td className="p-2 border-b">{item.quantity}</td>
                <td className="p-2 border-b">
                  S/ {(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="text-right font-bold p-2">
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
