import { create } from "zustand";

interface IBattleSocketStore {
    WS?: WebSocket,
    environment?: 'location' | 'weather',
    battleId?: string,
    players: [string, string];
    setValue: (key: keyof Omit<IBattleSocketStore, 'setValue'>, value: any) => void,
    location: string,
    weather: string
}

export enum EventTypes {
    BATTLE_STARTED = 'battle_started',
    BATTLE_STATE = 'battle_state',
    BATTLE_ENDED = 'battle_ended',
    PHASE_CHANGED = 'phase_changed',
    TIMER_UPDATE = 'timer_update',
    ROUND_RESULT = 'round_result',
    ERROR = 'error',
    SUBMIT_SETTINGS = 'submit_settings',
}

const useBattleSocketStore = create<IBattleSocketStore>((set, get) => ({
    WS: undefined,
    location: '',
    weather: '',
    players: ['', ''],
    environment: undefined,
    setValue: (key, value) => set(() => ({
        ...get(),
        [key]: value
    }))
}))

export default useBattleSocketStore