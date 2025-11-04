import { create } from "zustand";
import type { ICard } from "../../components/additionals/cards/CardGlobalChoiseList";

export interface IUserStore {
    nickname: string,
    id: string,
    avatar: string
}

const useUserStore = create<IUserStore>((set, get) => ({
    nickname: 'MAtrix',
    id: 'ID:41253cka4124',
    avatar: '/'
}));

export { useUserStore }