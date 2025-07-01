import React, { useState, useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import { Range } from "react-range";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

const Filters = () => {
  const router = useRouter();
  const { clearCart } = useCartStore();
  const { products, setFiltered } = useProductStore();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceLimits, setPriceLimits] = useState<[number, number]>([0, 0]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  const PRICE_STEP = 1;

  const filteredByCategory = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  useEffect(() => {
    if (filteredByCategory.length === 0) return;

    const prices = filteredByCategory.map((p) => p.price);
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));

    setPriceLimits((prevLimits) => {
      if (prevLimits[0] !== min || prevLimits[1] !== max) {
        setPriceRange([min, max]);
        return [min, max];
      }
      return prevLimits;
    });
  }, [selectedCategory, products]);

  useEffect(() => {
    const filtered = filteredByCategory.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    setFiltered(filtered);
  }, [selectedCategory, priceRange, products, setFiltered]);

  useEffect(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    setCategories(unique);
  }, [products]);

  const handlePriceChange = (values: number[]) => {
    if (values.length === 2 && values[0] < values[1]) {
      setPriceRange([values[0], values[1]]);
    }
  };

  const handleCreateProduct = () => {
    router.push("/products/create");
  };

  return (
    <div className="flex flex-col card bg-base-100 shadow-md md:gap-8 gap-1 p-4 rounded mb-2 flex-wrap items-center justify-between">
      <div className="flex card-body bg-base-200 flex-col gap-3 justify-between w-full">
        <div>
          <label className="block mb-1 font-semibold">Categoría</label>
          <select
            className="border rounded px-2 py-1 w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option className="text-black" value="">
              Todas
            </option>
            {categories.map((cat) => (
              <option className="text-black" key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-64">
          <div className="text-sm text-center font-semibold">
            Precio S/ {priceRange[0]} - S/ {priceRange[1]}
          </div>
          {priceLimits[0] < priceLimits[1] && (
            <Range
              step={PRICE_STEP}
              min={priceLimits[0]}
              max={priceLimits[1]}
              values={priceRange}
              onChange={handlePriceChange}
              allowOverlap={false}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    background: "#ddd",
                    borderRadius: "4px",
                    margin: "1rem 0",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => {
                const { key, ...rest } = props;
                return (
                  <div
                    key={key}
                    {...rest}
                    style={{
                      ...rest.style,
                      height: "20px",
                      width: "20px",
                      backgroundColor: "#3b25c1",
                      borderRadius: "50%",
                    }}
                  />
                );
              }}
            />
          )}
        </div>
        <div className="flex md:flex-col gap-3 justify-between w-full mb-4">
          <button
            className="items-center flex justify-center px-2 btn cursor-pointer transition-transform duration-300 font-semibold md:gap-2  md:py-2 md:rounded-lg"
            onClick={() => {
              handleCreateProduct();
            }}
          >
            Crear producto
          </button>
          <button
            className="items-center flex justify-center px-2 btn cursor-pointer transition-transform duration-300 font-semibold md:gap-2  md:py-2 md:rounded-lg"
            onClick={() => {
              localStorage.removeItem("cart");
              clearCart();
            }}
          >
            Limpiar el carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
