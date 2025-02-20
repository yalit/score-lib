import {create} from "zustand";
import User from "../../model/user.interface";

type Security = {
    user: User | null,
}

export type SecurityActions = {
    setUser: (user: User | null) => void,
}

export const useSecurityStore = create<Security & SecurityActions>((set, get) => ({
    user: null,
    setUser: (user: User | null) => {
        set((state) => ({user: user}))
    }
}))


