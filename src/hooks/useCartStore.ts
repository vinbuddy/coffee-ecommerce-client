import { create } from "zustand";

interface CartState {
    totalItem: number;
}

const useCartStore = create<CartState>((set) => ({
    totalItem: 0,
}));

export default useCartStore;
