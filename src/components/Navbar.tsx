"use client";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import ThemeMode from "./ThemeMode";
import { motion } from "framer-motion";

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md md:sticky md:top-0">
      {/* Desktop */}
      <div className="max-w-[1500px] mx-auto rounded-lg container px-4 py-6 flex-col md:flex-row gap-4 justify-between hidden md:flex">
        <title className="md:text-3xl font-bold">
          Prueba técnica de Welding Helmets Online
        </title>
        <div className="container mx-auto px-4 flex-col md:flex-row gap-4 justify-between hidden md:flex">
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

          <div className="flex items-center gap-4">
            <ThemeMode />
            <button
              onClick={() => handleClickCart()}
              className="items-center flex justify-center px-2 btn cursor-pointer transition-transform duration-300 font-semibold md:gap-2  md:py-2 md:rounded-lg"
            >
              <motion.div
                key={totalQuantity}
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.4 }}
              >
                <LuShoppingCart size={24} />
              </motion.div>
              <span className="rounded-full bg-slate-100 p-1 text-black">
                {totalQuantity}
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="navbar bg-base-100 shadow-sm justify-between px-4 py-2 flex items-center md:hidden">
        <button onClick={handleClickHome}>
          <FaHome size={24} />
        </button>
        <h1 className="text-lg font-bold">Welding Helmets</h1>
        <ThemeMode />
        <button onClick={handleClickCart} className="relative">
          <motion.div
            key={totalQuantity}
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.4 }}
          >
            <LuShoppingCart size={24} />
          </motion.div>
          <span className="absolute -top-2 -right-2 bg-slate-100 rounded-full px-1 text-sm text-black">
            {totalQuantity}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
