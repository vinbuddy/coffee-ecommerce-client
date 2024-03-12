"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { app } from "@/config/firebase";
import useCurrentUser from "./useCurrentUser";
import LoadingPage from "@/components/UI/LoadingPage";

const auth = getAuth(app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: any }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // useCurrentUser.setState((state) => ({ currentUser: user }));
                useCurrentUser.setState((state) => ({ isLogged: true }));
            } else {
                useCurrentUser.setState((state) => ({ isLogged: false }));
                // useCurrentUser.setState((state) => ({ currentUser: null }));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{}}>
            {loading ? <LoadingPage /> : children}
        </AuthContext.Provider>
    );
};
