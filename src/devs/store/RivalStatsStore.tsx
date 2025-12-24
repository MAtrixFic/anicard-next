import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList";
import { create } from "zustand";

interface IRivalStats {
    cards: ICard[],
    score: number,
    battleHistory: {
        user1: string,
        user2: string,
        user1Name: string,
        user2Name: string,
        win: string | undefined
    }[],
    getValue: (key: keyof Omit<IRivalStats, 'setValue'>) => any;
    setValue: (key: keyof Omit<IRivalStats, 'setValue'>, value: any) => void;
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