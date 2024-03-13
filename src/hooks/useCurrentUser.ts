import { auth } from "@/config/firebase";
import { IUser } from "@/types/user";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

interface CurrentUserState {
    currentUser: null | IUser;
}

const useCurrentUser = create<CurrentUserState>((set, get) => ({
    currentUser: null,
}));

export default useCurrentUser;
