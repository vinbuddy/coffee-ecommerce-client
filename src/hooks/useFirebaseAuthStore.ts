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
const currentUser = useCurrentUser.getState().user;
// const auth = getAuth();

const useFirebaseAuthStore = create<FirebaseAuthStoreState>((set) => ({
    loading: false,
    error: "",
    handleSignInGoogle: async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);

            // useCurrentUser.setState((state) => ({ user: userCredential.user }));
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
