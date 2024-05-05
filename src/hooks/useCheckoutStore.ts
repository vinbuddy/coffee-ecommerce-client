import { IStore } from "@/types/store";
import { IVoucher } from "@/types/voucher";
import { create } from "zustand";

type CheckoutState = {
    voucher: IVoucher | null;
    storeId: number | null;
    applyVoucher: (voucher: IVoucher) => void;
    clearVoucher: () => void;
    selectStoreId: (store: number) => void;
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
}));

export default useCheckoutStore;
