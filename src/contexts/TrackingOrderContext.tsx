"use client";
import { realTimeDb } from "@/config/firebase";
import useCurrentUser from "@/hooks/useCurrentUser";
import { child, equalTo, get, onValue, orderByChild, query, ref } from "firebase/database";
import React, { useEffect } from "react";

export const TrackingOrderContext = React.createContext({});
export const useTrackingOrderContext = () => React.useContext(TrackingOrderContext);

export const TrackingOrderProvider = ({ children }: { children: any }) => {
    const { currentUser } = useCurrentUser();
    useEffect(() => {
        if (!currentUser) return;

        // listen to tracking order from real-time database
        const ordersRef = ref(realTimeDb, "orders");
        const userOrdersQuery = query(ordersRef, orderByChild("userId"), equalTo(currentUser?.id));

        onValue(
            ordersRef,
            (snapshot) => {
                console.log("snapshot", snapshot.val());
                const orders = Object.values(snapshot.val());
                console.log("orders", orders);
            },
            (error) => {
                console.error(error);
            }
        );
    }, [currentUser]);

    return <TrackingOrderContext.Provider value={{}}>{children}</TrackingOrderContext.Provider>;
};
