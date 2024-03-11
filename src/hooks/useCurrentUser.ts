import { auth } from "@/config/firebase";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

interface CurrentUserState {
    currentUser: null | User;
}

const useCurrentUser = create<CurrentUserState>((set, get) => ({
    currentUser: null,
}));

export default useCurrentUser;
