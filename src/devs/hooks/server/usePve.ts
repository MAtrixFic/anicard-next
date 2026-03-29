import { StartStar, GetCurrentStar } from "@/components/server/comp/Apis"
import usePveStore from "@/devs/store/PveStore"
import useMessageStore from "@/devs/store/MessageStore"

export const usePVE = () => {
    const getValue = usePveStore(state => state.getValue)
    const setValue = usePveStore(state => state.setValue)
    const { addMessage } = useMessageStore()

    async function StartFarmTheStar(starId: number, petsIds: number[]) {
        const startFarmRes = await StartStar(starId, petsIds)
        if (startFarmRes) addMessage({ text: 'Начало фарма', type: 'message' })
        else addMessage({ text: 'Ошибка фарма', type: 'error' })
        return startFarmRes
    }

    return {
        getValue,
        setValue,
        StartFarmTheStar,
        GetCurrentStar
    }
}
