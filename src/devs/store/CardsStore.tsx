import { create } from "zustand";
import type { ICard } from "../../components/additionals/Windows/CardGlobalChoiseList";
import { GetCards } from "@/components/server/comp/Apis";
import { GetInventoryCards } from "@/components/server/comp/Apis";

export interface ICardStore {
    favorite: ICard[];
    battle: ICard[];
    allCards: ICard[];
    adminCards: ICard[];
    special: ICard[],
    SetCards: (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>, cards: ICard[]) => void;
    GetCards: (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>) => Promise<ICard[]>;
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
    GetCards: async (key) => {
        if (key === 'adminCards') {
            const data = await GetCards()
            console.log(data)
            if (data.ok) {
                get().SetCards(key, data.cards);
            }

        }
        else {
            const data = await GetInventoryCards(key === 'allCards' ? undefined : key)
            console.log(key, data)
            if (data.ok) {
                get().SetCards(key, data.cards);
            }
        }

        return get()[key]
    }
}));

export { useCardsStore }