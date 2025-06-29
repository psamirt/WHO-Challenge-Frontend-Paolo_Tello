"use client";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { cart } = useCartStore();
  const router = useRouter();
  const handleClick = () => {
    router.push("/cart");
  };
  return (
    <nav className="flex items-center justify-evenly p-4 ">
      <div>Bienvenido a la prueba técnica de Welding Helmets Online </div>
      <button
        onClick={() => handleClick()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <LuShoppingCart size={30} />
        <span className="rounded-full bg-amber-50 p-1 text-black">
          {cart.length}
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
