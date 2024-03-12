import { auth } from "@/config/firebase";
import { IUser } from "@/types/user";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

interface CurrentUserState {
    currentUser: null | IUser;
    isLogged: boolean;
}

const useCurrentUser = create<CurrentUserState>((set, get) => ({
    currentUser: null,
    isLogged: false,
}));

export default useCurrentUser;
