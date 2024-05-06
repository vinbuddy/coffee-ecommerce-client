import { realTimeDb } from "@/config/firebase";
import { IFirebaseOrder } from "@/types/order";
import { set as setDb, ref, onValue, remove, update } from "firebase/database";
import { create } from "zustand";

interface CurrentOrderState {
    currentOrder: IFirebaseOrder | null;
    setCurrentOrder: (order: IFirebaseOrder) => void;
    insertOrderToFirebase: (order: IFirebaseOrder) => Promise<void>;
    updateOrderStatusToFirebase: (orderId: string, status: string) => Promise<void>;
}

const useCurrentOrderStore = create<CurrentOrderState>((set, get) => ({
    currentOrder: null,
    setCurrentOrder: (order) => set({ currentOrder: order }),
    insertOrderToFirebase: async (order) => {
        // insert order to firebase using async await
        const orderRef = ref(realTimeDb, "orders/" + order.orderId);
        try {
            await setDb(orderRef, {
                status: order.status,
                userId: order.userId,
                isClose: order.isClose,
            });
        } catch (error) {
            // Handle error here
            console.error("Failed to insert order to Firebase:", error);
        }
    },
    updateOrderStatusToFirebase: async (orderId, status) => {
        // update order status using async await
    },
}));

export default useCurrentOrderStore;
