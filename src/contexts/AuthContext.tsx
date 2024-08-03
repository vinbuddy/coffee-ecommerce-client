"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { setCookie, getCookie } from "cookies-next";
import { app } from "@/config/firebase";
import useCurrentUser from "../hooks/useCurrentUser";
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
                const token: string = await user.getIdToken();
                setCookie("token", token);
                setCookie("uid", user.uid);

                // Or using uid fetch user -> setCurrentUser
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${user.uid}`, {
                    method: "Get",
                });
                const resData = await res.json();

                useCurrentUser.setState((state) => ({
                    currentUser: resData.data,
                }));
                setLoading(false);
            } else {
                useCurrentUser.setState((state) => ({ currentUser: null }));
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
