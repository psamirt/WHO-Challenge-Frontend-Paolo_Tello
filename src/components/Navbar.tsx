"use client";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { Button } from "flowbite-react";

const Navbar = () => {
  const { cart, clearCart } = useCartStore();
  const router = useRouter();
  const handleClickCart = () => {
    router.push("/cart");
  };
  const handleClickHome = () => {
    router.push("/");
  };

  const handleCreateProduct = () => {
    router.push("/products/create");
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav className="flex items-center max-w-[1500px] mx-auto ">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 justify-between">
        <Button
          color={""}
          onClick={() => handleClickHome()}
          className="items-center flex justify-center px-2 cursor-pointer transition-transform duration-300 hover:bg-gray-100 font-semibold md:gap-2  md:py-2 md:rounded-lg"
        >
          <FaHome size={30} />
          <span className="text-md">Inicio</span>
        </Button>
        <h1 className="md:text-3xl font-bold">
          Prueba técnica de Welding Helmets Online
        </h1>

        <Button
          color={"light"}
          onClick={() => {
            handleCreateProduct();
          }}
        >
          Crear producto
        </Button>
        <Button
          onClick={() => {
            localStorage.removeItem("cart");
            clearCart();
          }}
        >
          Limpiar el carrito
        </Button>

        <button
          onClick={() => handleClickCart()}
          className="flex gap-2 cursor-pointer items-center"
        >
          <LuShoppingCart size={30} />
          <span className="rounded-full bg-slate-100 p-1 text-black">
            {totalQuantity}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
