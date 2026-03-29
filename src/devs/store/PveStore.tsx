import { IPveStarResponse, IPveStarDataResponse } from '@/components/server/comp/PVEApi'
import { create } from 'zustand'
import { StartStar, GetStars, GetCurrentStar } from '@/components/server/comp/Apis'

interface IPveStore {
    stars: IPveStarResponse[],
    currentStar: IPveStarDataResponse | null,
    setValue: (key: keyof Omit<IPveStore, 'setValue' | 'getValue'>, value: IPveStarResponse[] | IPveStarResponse) => void,
    getValue: (key: keyof Omit<IPveStore, 'setValue' | 'getValue'>, param?: any) => IPveStarResponse[] | IPveStarResponse | null,
}

const usePveStore = create<IPveStore>((set, get) => ({
    stars: [],
    currentStar: null,
    setValue: (key, value) => set((state) => ({
        ...state,
        [key]: value
    })),
    getValue: (key, param) => {
        switch (key) {
            case 'currentStar':
                if (get().currentStar === null) {
                    GetCurrentStar(param as number).then(data =>
                        get().setValue('currentStar', data!)
                    )
                }
                break;
            case 'stars':
                if (get().stars.length <= 0) {
                    GetStars().then(data => get().setValue('stars', data))
                }
                break;
        }
        return get()[key]
    }
}))

export default usePveStore