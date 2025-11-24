import { create } from "zustand";
import type { ICard } from "../../components/additionals/Windows/CardGlobalChoiseList";

export interface ICardStore {
    favoriteCards: ICard[];
    battleCards: ICard[];
    allCards: ICard[];
    SetCards: (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>, cards: ICard[]) => void;
    GetCards: (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>) => ICard[];
}

const useCardsStore = create<ICardStore>((set, get) => ({
    favoriteCards: [],
    battleCards: [
        {
            src: '/Rem.jpg', desc: 'Мега вайфу', id: 1, rang: "S", name: 'Рем', options: {
                rating: 80,
                attribute: 'Стан'
            }
        },
        {
            src: '/Ram.jpg', desc: 'Сестра мега вайфу', id: 2, rang: "A", name: 'Рам', options: {
                rating: 70,
                attribute: 'Лед'
            }
        },
        {
            src: '/Akame.jpg', desc: 'Убийца Акаме', id: 3, rang: "B", name: 'Акаме', options: {
                rating: 50,
                attribute: 'Токсин'
            }
        },
        {
            src: '/Rey.jpg', desc: 'Дед инсайд', id: 4, rang: "S", name: 'Рей', options: {
                rating: 80,
                attribute: 'Отрава'
            }
        },
        {
            src: '/Chisato.jpg', desc: 'Крутой киллер', id: 5, rang: "S", name: 'Чисато', options: {
                rating: 80,
                attribute: 'Горение'
            }
        },
        { src: '/02.jpg', desc: 'Мой дорогой...', id: 6, rang: "B", name: '02', options: { rating: 60, attribute: 'Вода' } },
    ],
    allCards: [
        {
            src: '/Rem.jpg', desc: 'Мега вайфу', id: 1, rang: "S", name: 'Рем', options: {
                rating: 80,
                attribute: 'Стан'
            }
        },
        {
            src: '/Ram.jpg', desc: 'Сестра мега вайфу', id: 2, rang: "A", name: 'Рам', options: {
                rating: 70,
                attribute: 'Лед'
            }
        },
        {
            src: '/Akame.jpg', desc: 'Убийца Акаме', id: 3, rang: "B", name: 'Акаме', options: {
                rating: 50,
                attribute: 'Токсин'
            }
        },
        {
            src: '/Rey.jpg', desc: 'Дед инсайд', id: 4, rang: "S", name: 'Рей', options: {
                rating: 80,
                attribute: 'Отрава'
            }
        },
        {
            src: '/Chisato.jpg', desc: 'Крутой киллер', id: 5, rang: "S", name: 'Чисато', options: {
                rating: 80,
                attribute: 'Горение'
            }
        },
        { src: '/02.jpg', desc: 'Мой дорогой...', id: 6, rang: "B", name: '02', options: { rating: 60, attribute: 'Вода' } },
        { src: '/Senko.jpg', desc: 'Няшная хозяйка', id: 7, rang: "D", name: 'Сенко', options: { rating: 40, attribute: 'Земля' } }
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