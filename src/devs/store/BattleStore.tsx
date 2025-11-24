import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import { create } from "zustand";

export interface IBattleCard extends ICard {
    hp: number
}

export interface IBattleStore {
    userBattleCards: (IBattleCard | null)[];
    rivalBattleCards: (IBattleCard | null)[];
    setCards: (key: 'userBattleCards' | 'rivalBattleCards', cards: (IBattleCard | null)[]) => void;

    battleState: 'waiting-users' | 'battle' | 'waiting-battle' | 'finished';
    setBattleState: (state: IBattleStore['battleState']) => void;


}

const useBattleStore = create<IBattleStore>()(set => ({
    userBattleCards: [],
    rivalBattleCards: [
        {
            src: '/Ram.jpg', desc: 'Сестра мега вайфу', id: 2, rang: "A", name: 'Рам', hp: 70, options: {
                rating: 70,
                attribute: 'Лед'
            }
        },
        {
            src: '/Akame.jpg', desc: 'Убийца Акаме', id: 3, rang: "B", name: 'Акаме', hp: 50, options: {
                rating: 50,
                attribute: 'Токсин'
            }
        },
        {
            src: '/Rey.jpg', desc: 'Дед инсайд', id: 4, rang: "S", name: 'Рей', hp: 80, options: {
                rating: 80,
                attribute: 'Отрава'
            }
        }
    ],
    setCards: (key, cards) => set((state) => ({
        ...state,
        [key]: cards
    })),
    battleState: 'waiting-users',
    setBattleState: (state) => set((store) => ({
        ...store,
        battleState: state
    })),
}));

export { useBattleStore }