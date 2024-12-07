import { create } from "zustand";

import { ICart } from "@/types";

interface CartState {
    totalItem: number;
    selectedCartItems: ICart[];
    addSelectedCartItems: (cartItem: ICart) => void;
    removeSelectedCartItems: (cartItem: ICart) => void;
    clearSelectedCartItems: () => void;
}

const useCartStore = create<CartState>((set) => ({
    totalItem: 0,
    selectedCartItems: [],
    clearSelectedCartItems: () => {
        set((state) => ({
            selectedCartItems: [],
        }));
    },
    addSelectedCartItems: (cartItem) => {
        set((state) => ({
            selectedCartItems: [...state.selectedCartItems, cartItem],
        }));
    },
    removeSelectedCartItems: (cartItem) => {
        set((state) => ({
            selectedCartItems: state.selectedCartItems.filter((item) => item.id !== cartItem.id),
        }));
    },
}));

export default useCartStore;
