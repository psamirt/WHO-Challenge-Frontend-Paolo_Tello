import React, { useState, useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import { Range } from "react-range";

const Filters = () => {
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

  return (
    <div className="flex gap-8 p-4 bg-white rounded mb-6 flex-wrap">
      <div>
        <label className="block mb-1 font-semibold">Categoría</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="w-64">
        <label className="block mb-1 font-semibold">
          Precio: S/ {priceLimits[0]} - S/ {priceLimits[1]}
        </label>
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
        <div className="text-sm text-center">
          S/ {priceRange[0]} - S/ {priceRange[1]}
        </div>
      </div>
    </div>
  );
};

export default Filters;
