import { create } from "zustand";

import { IVoucher } from "@/types";

type CheckoutState = {
    voucher: IVoucher | null;
    storeId: number | null;
    applyVoucher: (voucher: IVoucher) => void;
    clearVoucher: () => void;
    selectStoreId: (store: number) => void;
    clearStoreId: () => void;
};

const useCheckoutStore = create<CheckoutState>((set) => ({
    voucher: null,
    storeId: null,
    applyVoucher: (voucher) => {
        set((state) => ({ ...state, voucher: voucher }));
    },
    selectStoreId: (storeId) => {
        set((state) => ({ ...state, storeId: storeId }));
    },
    clearVoucher: () => set((state) => ({ ...state, voucher: null })),
    clearStoreId: () => set((state) => ({ ...state, storeId: null })),
}));

export default useCheckoutStore;
