import { create } from "zustand";
import type { ICard } from "../../components/additionals/cards/CardGlobalChoiseList";

export interface ICardStore {
    favoriteCards: ICard[];
    battleCards: ICard[];
    allCards: ICard[];
    SetCards: (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>, cards: ICard[]) => void;
    GetCards: (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>) => ICard[];
}

const useCardsStore = create<ICardStore>((set, get) => ({
    favoriteCards: [],
    battleCards: [],
    allCards: [
        { src: 'Rem.jpg', desc: 'Мега вайфу', id: 1, rang: "S", name: 'Рем' },
        { src: 'Ram.jpg', desc: 'Сестра мега вайфу', id: 2, rang: "A", name: 'Рам' },
        { src: 'Akame.jpg', desc: 'Убийца Акаме', id: 3, rang: "A", name: 'Акаме' },
        { src: 'Rey.jpg', desc: 'Дед инсайд', id: 4, rang: "S", name: 'Рей' },
        { src: 'Chisato.jpg', desc: 'Крутой киллер', id: 5, rang: "S", name: 'Чисато' },
        { src: '02.jpg', desc: 'Мой дорогой...', id: 6, rang: "S", name: '02' },
        { src: 'Senko.jpg', desc: 'Няшная хозяйка', id: 7, rang: "A", name: 'Сенко' }
    ],
    SetCards: (key, cards) => set((state) => ({
        ...state,
        [key]: cards
    })),
    GetCards: (key) => {
        return get()[key]
    }
}));

export { useCardsStore }