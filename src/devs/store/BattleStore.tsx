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
    rivalBattleCards: [],
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