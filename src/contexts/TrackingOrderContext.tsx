"use client";
import { realTimeDb } from "@/config/firebase";
import useCurrentOrderStore from "@/hooks/useCurrentOrderStore";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ICurrentOrder, IFirebaseOrder, IOrderStatus } from "@/types/order";
import { equalTo, get, onValue, orderByChild, query, ref } from "firebase/database";
import React, { useEffect } from "react";

export const TrackingOrderContext = React.createContext({});
export const useTrackingOrderContext = () => React.useContext(TrackingOrderContext);

export const TrackingOrderProvider = ({ children }: { children: any }) => {
    const { currentUser } = useCurrentUser();
    const { setCurrentOrder } = useCurrentOrderStore();
    useEffect(() => {
        if (!currentUser) return;

        // listen to tracking order from real-time database
        const ordersRef = ref(realTimeDb, "orders");
        const userOrdersQuery = query(ordersRef, orderByChild("userId"), equalTo(currentUser?.id));

        onValue(
            userOrdersQuery,
            (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const orderData = childSnapshot.val();
                    const orderId = childSnapshot.key;

                    if (orderData && !orderData?.isCompleted) {
                        const statuses = Object.values(orderData.statuses) as IOrderStatus[];

                        statuses.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

                        const order: ICurrentOrder = {
                            userId: orderData.userId,
                            orderId: orderId,
                            statuses: statuses,
                            isCompleted: orderData.isCompleted,
                        };

                        setCurrentOrder(order);
                    }
                });
            },
            (error) => {
                console.error(error);
            }
        );
    }, [currentUser]);

    return <TrackingOrderContext.Provider value={{}}>{children}</TrackingOrderContext.Provider>;
};
