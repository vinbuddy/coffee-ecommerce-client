import { realTimeDb } from "@/config/firebase";
import { getCurrentDateTimeString } from "@/lib/utils";
import { ICurrentOrder, IFirebaseOrder } from "@/types/order";
import { set as setDb, ref, onValue, remove, update } from "firebase/database";
import { create } from "zustand";

interface CurrentOrderState {
    currentOrder: ICurrentOrder | null;
    setCurrentOrder: (order: ICurrentOrder) => void;
    insertOrderToFirebase: (order: IFirebaseOrder) => Promise<void>;
    updateOrderStatusToFirebase: (orderId: string, status: string) => Promise<void>;
    completeOrder: (orderId: string) => void;
}

const useCurrentOrderStore = create<CurrentOrderState>((set, get) => ({
    currentOrder: null,
    setCurrentOrder: (order) => set((state) => ({ ...state, currentOrder: order })),
    insertOrderToFirebase: async (order) => {
        // insert order to firebase using async await
        const orderRef = ref(realTimeDb, "orders/" + order.orderId);
        try {
            await setDb(orderRef, {
                statuses: order.statuses,
                userId: order.userId,
                isCompleted: order.isCompleted,
            });
        } catch (error) {
            // Handle error here
            console.error("Failed to insert order to Firebase:", error);
        }
    },
    updateOrderStatusToFirebase: async (orderId, status) => {
        // update order status using async await like insertOrderToFirebase
        const orderRef = ref(realTimeDb, "orders/" + orderId + "/statuses");
        const newStatus = {
            status: {
                status: status,
                time: getCurrentDateTimeString(),
            },
        };
        try {
            await update(orderRef, newStatus);
        } catch (error) {
            console.error("Failed to update order status to Firebase:", error);
        }
    },
    completeOrder: (orderId) => {
        // update isCompleted field in order item using async await
        const orderRef = ref(realTimeDb, "orders/" + orderId);
        try {
            update(orderRef, {
                isCompleted: true,
            });
        } catch (error) {
            console.error("Failed to complete order:", error);
        }
    },
}));

export default useCurrentOrderStore;
