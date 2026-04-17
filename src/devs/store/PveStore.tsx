import { IPveStarResponse } from '@/components/server/comp/PVEApi'
import { create } from 'zustand'
import { GetStars, GetCurrentStar } from '@/components/server/comp/Apis'

interface IPveStore {
    stars: IPveStarResponse[],
    currentStar: IPveStarResponse | null,
    setValue: (key: keyof Omit<IPveStore, 'setValue' | 'getValue'>, value: IPveStarResponse[] | IPveStarResponse) => void,
    getValue: (key: keyof Omit<IPveStore, 'setValue' | 'getValue'>, param?: any) => Promise<IPveStarResponse[] | IPveStarResponse | null>,
}

const usePveStore = create<IPveStore>((set, get) => ({
    stars: [],
    currentStar: null,
    setValue: (key, value) => set((state) => ({
        ...state,
        [key]: value
    })),
    getValue: async (key, param) => {
        if (key == 'currentStar') {
            if (get().currentStar === null) {
                const data = await GetCurrentStar(param as number);
                get().setValue('currentStar', data!);       
            }
        }
        else if (key == 'stars') {
            if (get().stars.length <= 0) {
                const data = await GetStars();
                get().setValue('stars', data);      
            }
        }
        return get()[key]
    }
}))

export default usePveStore