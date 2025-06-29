"use client";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  const { cart } = useCartStore();
  const router = useRouter();
  const handleClickCart = () => {
    router.push("/cart");
  };
  const handleClickHome = () => {
    router.push("/");
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav className="flex items-center justify-evenly p-4">
      <button
        onClick={() => handleClickHome()}
        className="items-center flex flex-col justify-center px-2 cursor-pointer"
      >
        <FaHome size={30} />
        <span className="text-md">Inicio</span>
      </button>
      <button
        onClick={() => handleClickCart()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <LuShoppingCart size={30} />
        <span className="rounded-full bg-amber-50 p-1 text-black">
          {totalQuantity}
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
