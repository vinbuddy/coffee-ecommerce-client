import { create } from "zustand";
import { app, auth } from "@/config/firebase";
import {
    getAuth,
    signOut,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";
import useCurrentUser from "./useCurrentUser";
import { IUser } from "@/types/user";

interface FirebaseAuthStoreState {
    loading: boolean;
    error: string;
    handleSignInGoogle: () => Promise<void>;
    handleSignInGoogleEmailPassword: (email: string, password: string) => void;
    handleCreateAccount: (
        name: string,
        email: string,
        password: string,
        isAdmin: boolean
    ) => void;
    handleSignOut: () => void;
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const currentUser = useCurrentUser.getState().currentUser;
// const auth = getAuth();

const useFirebaseAuthStore = create<FirebaseAuthStoreState>((set) => ({
    loading: false,
    error: "",
    handleSignInGoogle: async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const token: string = await userCredential.user.getIdToken();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/social-register`,
                {
                    method: "post",
                    body: JSON.stringify({
                        id: userCredential.user.uid,
                        user_name: userCredential.user.displayName,
                        avatar: userCredential.user.photoURL,
                        email: userCredential.user.email,
                        account_type: "google",
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            // if (token) {
            //     localStorage.setItem("@token", token);
            // }
        } catch (error: any) {
            set(() => ({ error: error.code }));
        }
    },
    handleSignInGoogleEmailPassword: (email, password) => {
        set(() => ({ loading: true }));

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => set(() => ({ error: error.code })))
            .finally(() => set(() => ({ loading: false })));
    },
    handleCreateAccount: (name, email, password, isAdmin = false) => {
        set(() => ({ loading: true }));

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return updateProfile(user, {
                    displayName: name,
                });
            })
            .then((res) => console.log(res))
            .catch((error) => set(() => ({ error: error.code })))
            .finally(() => set(() => ({ loading: false })));
    },
    handleSignOut: () => {
        signOut(auth)
            .then(() => {
                console.log("Log out successfully");
            })
            .catch((error) => {});
    },
}));

export default useFirebaseAuthStore;
