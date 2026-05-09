import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import { create } from "zustand";

interface IRivalStats {
    cards: ICard[],
    score: number,
    battleHistory: IBattleStats[],
    getValue: (key: keyof Omit<IRivalStats, 'setValue'>) => any;
    setValue: (key: keyof Omit<IRivalStats, 'setValue'>, value: any) => void;
}

export interface IBattleStats {
    user1_nickname: string,
    user2_nickname: string,
    user1_id: number,
    user2_id: number,
    winner_id: number,
}

const useRivalStatsStore = create<IRivalStats>((set, get) => ({
    cards: [],
    score: 0,
    battleHistory: [],
    setValue: (key, value) => set(state => ({
        ...state,
        [key]: value
    })),
    getValue: (key) => {
        return get()[key];
    }
}))

export default useRivalStatsStore