import { create } from "zustand";

interface IBattleSocketStore {
    WS?: WebSocket,
    choise?: string,
    setValue: (key: keyof Omit<IBattleSocketStore, 'setValue'>, value: any) => void
}

export enum EventTypes {
    BATTLE_STARTED = 'battle_started',
    BATTLE_STATE = 'battle_state',
    BATTLE_ENDED = 'battle_ended',
    PHASE_CHANGED = 'phase_changed',
    TIMER_UPDATE = 'timer_update',
    ROUND_RESULT = 'round_result',
    ERROR = 'error'
}

const useBattleSocketStore = create<IBattleSocketStore>((set, get) => ({
    WS: undefined,
    choise: undefined,
    setValue: (key, value) => set(() => ({
        ...get(),
        [key]: value
    }))
}))

export default useBattleSocketStore