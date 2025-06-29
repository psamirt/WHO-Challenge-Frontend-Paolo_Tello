export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export type CartItem = Product & {
  quantity: number;
};

export interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  sumItem: (productId: number) => void;
  restItem: (productId: number) => void;
}

export type CartStore = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  sumItem: (productId: number) => void;
  restItem: (productId: number) => void;
};
