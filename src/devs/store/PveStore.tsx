import { ICurrentStartAllDataResponse, IExpeditionDataResponse, IPveStarResponse } from '@/components/server/comp/PVEApi'
import { create } from 'zustand'
import { GetStars, GetCurrentStar, StartStar } from '@/components/server/comp/Apis'

type TStarValue = IPveStarResponse[] | IPveStarResponse | IExpeditionDataResponse | ICurrentStartAllDataResponse | null

interface IPveStore {
    stars: IPveStarResponse[],
    currentStarInProcess: ICurrentStartAllDataResponse | null,
    currentStarOnStarted: IExpeditionDataResponse | null,
    setValue: (key: keyof Omit<IPveStore, 'setValue' | 'getValue' | 'clearValue'>, value: TStarValue) => void,
    getValue: (key: keyof Omit<IPveStore, 'setValue' | 'getValue' | 'clearValue'>, param?: any) => Promise<TStarValue>,
    clearValue: () => void
}

const usePveStore = create<IPveStore>((set, get) => ({
    stars: [],
    currentStarInProcess: null,
    currentStarOnStarted: null,
    setValue: (key, value) => set((state) => ({
        ...state,
        [key]: value
    })),
    clearValue: () => {
        set(state => ({
            ...state,
            currentStarInProcess: null,
            currentStarOnStarted: null
        }))
    },
    getValue: async (key, param) => {
        const SetValue = get().setValue
        if (key == 'currentStarInProcess') {
            const data = await GetCurrentStar(param as number);
            SetValue('currentStarInProcess', data);
        }
        else if (key == 'currentStarOnStarted') {
            const data = await StartStar(param[0], param[1])
            if (data) SetValue('currentStarOnStarted', data as IExpeditionDataResponse)
            else SetValue('currentStarOnStarted', null)
        }
        else if (key == 'stars') {
            const data = await GetStars();
            SetValue('stars', data);
        }
        return get()[key]
    }
}))

export default usePveStore