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
    <nav className="items-center max-w-[1500px] mx-auto bg-white shadow-md rounded-lg sticky top-0 z-50">
      <title className="md:text-3xl font-bold">
        Prueba técnica de Welding Helmets Online
      </title>
      <div className="container mx-auto px-4 py-6 flex-col md:flex-row gap-4 justify-between hidden md:flex">
        <button
          onClick={() => handleClickHome()}
          className="items-center flex justify-center px-2 btn cursor-pointer transition-transform duration-300 font-semibold md:gap-2  md:py-2 md:rounded-lg"
        >
          <FaHome size={30} />
          <span className="text-md">Inicio</span>
        </button>
        <h1 className="md:text-3xl font-bold">
          Prueba técnica de Welding Helmets Online
        </h1>

        <button
          onClick={() => handleClickCart()}
          className="items-center flex justify-center px-2 btn cursor-pointer transition-transform duration-300 font-semibold md:gap-2  md:py-2 md:rounded-lg"
        >
          <LuShoppingCart size={30} />
          <span className="rounded-full bg-slate-100 p-1 text-black">
            {totalQuantity}
          </span>
        </button>
      </div>
      <div className="md:hidden navbar bg-base-100 shadow-sm justify-between px-4 py-2">
        <button onClick={handleClickHome}>
          <FaHome size={24} />
        </button>
        <h1 className="text-lg font-bold">Welding Helmets</h1>
        <button onClick={handleClickCart} className="relative">
          <LuShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-slate-100 rounded-full px-1 text-sm">
            {totalQuantity}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
