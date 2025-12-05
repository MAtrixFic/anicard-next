import { create } from "zustand";
import type { ICard } from "../../components/additionals/Windows/CardGlobalChoiseList";
import { GetCards } from "@/components/server/comp/AdminApi";
import { GetInventoryCards } from "@/components/server/comp/InventoryApi";

export interface ICardStore {
    favorite: ICard[];
    battle: ICard[];
    allCards: ICard[];
    adminCards: ICard[];
    special: ICard[],
    SetCards: (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>, cards: ICard[], userId: string) => void;
    GetCards: (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>, userId: string) => Promise<ICard[]>;
}

const useCardsStore = create<ICardStore>((set, get) => ({
    favorite: [],
    battle: [],
    allCards: [],
    adminCards: [],
    special: [],
    SetCards: (key, cards) => set((state) => ({
        ...state,
        [key]: cards
    })),
    GetCards: async (key, userId) => {
        if (key === 'adminCards') {
            if (userId) {
                const data = await GetCards(userId)
                if (data.ok) {
                    get().SetCards(key, data.cards, userId);
                }
            }
        }
        else {
            if (userId) {
                const data = await GetInventoryCards(userId, key === 'allCards' ? undefined : key)
                if (data.ok) {
                    get().SetCards(key, data.cards, userId);
                }
            }
        }

        return get()[key]
    }
}));

export { useCardsStore }