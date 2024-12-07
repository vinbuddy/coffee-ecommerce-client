import { create } from "zustand";

import { IUser } from "@/types";

interface CurrentUserState {
    currentUser: null | IUser;
}

const useCurrentUser = create<CurrentUserState>((set, get) => ({
    currentUser: null,
}));

export default useCurrentUser;
