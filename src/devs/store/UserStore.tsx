import { create } from "zustand";
import type { ICard } from "../../components/additionals/Windows/CardGlobalChoiseList";

export interface IUserStore {
    nickname: string,
    id: string,
    avatar: string,
    isAdmin?: boolean
}

const useUserStore = create<IUserStore>((set, get) => ({
    nickname: 'MAtrix',
    id: 'ID:41253cka4124',
    avatar: '/',
    isAdmin: true
}));

export { useUserStore }