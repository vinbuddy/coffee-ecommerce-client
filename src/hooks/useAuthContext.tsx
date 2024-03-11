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
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // setUser(user);
                useCurrentUser.setState((state) => ({ currentUser: user }));
            } else {
                // setUser(null);
                useCurrentUser.setState((state) => ({ currentUser: null }));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <LoadingPage /> : children}
        </AuthContext.Provider>
    );
};
