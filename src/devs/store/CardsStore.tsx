import { create } from "zustand";
import type { ICard } from "../../components/additionals/Windows/CardGlobalChoiseList";
import { GetCards } from "@/components/server/comp/AdminApi";
import { GetInventoryCards } from "@/components/server/comp/InventoryApi";
import { CookieGet } from "@/components/server/CookieManager";

export interface ICardStore {
    favorite: ICard[];
    battle: ICard[];
    allCards: ICard[];
    adminCards: ICard[];
    SetCards: (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>, cards: ICard[]) => void;
    GetCards: (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>) => Promise<ICard[]>;
}

const useCardsStore = create<ICardStore>((set, get) => ({
    favorite: [],
    battle: [],
    allCards: [],
    adminCards: [],
    SetCards: (key, cards) => set((state) => ({
        ...state,
        [key]: cards
    })),
    GetCards: async (key) => {
        if (get()[key].length <= 0) {
            if (key === 'adminCards') {
                const userId = await CookieGet('userId')
                if (userId) {
                    const data = await GetCards(userId.value)
                    if (data.ok) {
                        get().SetCards(key, data.cards);
                    }
                }
            }
            else {
                const userId = await CookieGet('userId')
                if (userId) {
                    const data = await GetInventoryCards(userId.value, key === 'allCards' ? undefined : key)
                    if (data.ok) {
                        get().SetCards(key, data.cards);
                    }
                }
            }

        }
        return get()[key]
    }
}));

export { useCardsStore }