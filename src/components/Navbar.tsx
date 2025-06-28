"use client";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import { LuShoppingCart } from "react-icons/lu";

const Navbar = () => {
  const { cart } = useCartStore();
  return (
    <nav className="flex items-center justify-evenly p-4 ">
      <div>Bienvenido a la prueba técnica de Welding Helmets Online </div>
      <div className="items-center flex gap-1">
        <button>
          <LuShoppingCart size={30} />
        </button>
        <span className="rounded-full bg-amber-50 p-1 text-black">
          {cart.length}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
