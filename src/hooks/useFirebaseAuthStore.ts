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
    AuthError,
} from "firebase/auth";
import useCurrentUser from "./useCurrentUser";
import { IUser } from "@/types/user";

interface FirebaseAuthStoreState {
    loading: boolean;
    error: string;
    handleSignInGoogle: () => Promise<void>;
    handleSignInGoogleEmailPassword: (
        email: string,
        password: string
    ) => Promise<void>;
    handleCreateAccount: (
        name: string,
        email: string,
        password: string
    ) => void;
    handleSignOut: () => void;
    // setErrorCodeToMessage: (error: AuthError) => void;
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const currentUser = useCurrentUser.getState().currentUser;

const setErrorCodeToMessage = (error: AuthError) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            useFirebaseAuthStore.setState(() => ({
                error: "Existing account",
            }));
            break;
        case "auth/invalid-email":
            useFirebaseAuthStore.setState(() => ({ error: "Invalid email" }));
            break;
        case "auth/user-not-found":
            useFirebaseAuthStore.setState(() => ({ error: "Invalid account" }));
            break;
        case "auth/invalid-email":
            useFirebaseAuthStore.setState(() => ({ error: "Invalid email" }));
            break;
        case "auth/wrong-password":
            useFirebaseAuthStore.setState(() => ({
                error: "Invalid password",
            }));
            break;
        case "auth/too-many-requests":
            useFirebaseAuthStore.setState(() => ({
                error: "Too many request, try later",
            }));
            break;
        default:
            useFirebaseAuthStore.setState(() => ({
                error: "Error , Try again later",
            }));
            break;
    }
};

const useFirebaseAuthStore = create<FirebaseAuthStoreState>((set) => ({
    loading: false,
    error: "",

    handleSignInGoogle: async () => {
        set(() => ({ loading: true }));

        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const token: string = await userCredential.user.getIdToken();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/create-user-account`,
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
            setErrorCodeToMessage(error);
        } finally {
            set(() => ({ loading: false }));
        }
    },
    handleSignInGoogleEmailPassword: async (email, password) => {
        // set(() => ({ loading: true }));

        // signInWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         const user = userCredential.user;
        //     })
        //     .catch((error) => setErrorCodeToMessage(error))
        //     .finally(() => set(() => ({ loading: false })));
        try {
            set(() => ({ loading: true }));

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
        } catch (error: any) {
            setErrorCodeToMessage(error);
        } finally {
            set(() => ({ loading: false }));
        }
    },
    handleCreateAccount: async (name, email, password) => {
        set(() => ({ loading: true }));

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            const res = await updateProfile(user, {
                displayName: name,
            });

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/create-user-account`,
                {
                    method: "post",
                    body: JSON.stringify({
                        id: userCredential.user.uid,
                        user_name: userCredential.user.displayName,
                        avatar: userCredential.user.photoURL,
                        email: userCredential.user.email,
                        account_type: "email",
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
        } catch (error: any) {
            setErrorCodeToMessage(error); // Handle error
        } finally {
            set(() => ({ loading: false })); // Set loading to false regardless of success or failure
        }
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
