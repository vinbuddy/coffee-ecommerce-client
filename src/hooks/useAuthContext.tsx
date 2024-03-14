"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { app } from "@/config/firebase";
import useCurrentUser from "./useCurrentUser";
import LoadingPage from "@/components/UI/LoadingPage";
import { IUser } from "@/types/user";

const auth = getAuth(app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: any }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData: IUser = {
                    id: user.uid,
                    email: user.email,
                    avatar: user.photoURL,
                    user_name: user.displayName,
                };
                // Or using uid fetch user -> setCurrentUser
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${user.uid}`,
                    {
                        method: "Get",
                    }
                );
                const resData = await res.json();

                useCurrentUser.setState((state) => ({
                    currentUser: resData.data,
                }));
            } else {
                useCurrentUser.setState((state) => ({ currentUser: null }));
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
