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

export interface CardProductsProps {
  products: Product[];
}

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

export type ProductStore = {
  products: Product[];
  filtered: Product[];
  setProducts: (products: Product[]) => void;
  setFiltered: (filtered: Product[]) => void;
  getProductById: (id: number) => Product | undefined;
  filterProductByCategory: (category: string) => void;
  filterProductByPrice: (min: number, max: number) => void;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export interface PaginationStore {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  setTotalItems: (total: number) => void;
}

