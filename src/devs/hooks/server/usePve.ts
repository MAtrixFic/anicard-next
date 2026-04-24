import usePveStore from "@/devs/store/PveStore"
import useMessageStore from "@/devs/store/MessageStore"
import { ClaimStar } from "@/components/server/comp/Apis"

export const usePVE = () => {
    const getValue = usePveStore(state => state.getValue)
    const setValue = usePveStore(state => state.setValue)
    const starOnStart = usePveStore(state => state.currentStarOnStarted)
    const inProcessStar = usePveStore(state => state.currentStarInProcess)

    const { addMessage } = useMessageStore()

    async function StartFarmTheStar(starId: number, petsIds: number[]) {
        const startFarmRes = await getValue('currentStarOnStarted', [starId, petsIds])
        if (startFarmRes) addMessage({ text: 'Начало фарма', type: 'message' })
        else addMessage({ text: 'Ошибка фарма', type: 'error' })
        return startFarmRes
    }

    async function GetCurrentStar(starId: number) {
        const currentStar = (await getValue('currentStarInProcess', starId))
        if (!currentStar) addMessage({ text: 'Ошибка получения звезды', type: 'error' })
        return currentStar
    }

    async function ClaimStarRewards(expId: number) {
        const claimedData = await ClaimStar(expId)
        if (claimedData) addMessage({ text: claimedData.toString(), type: 'message' })
        else addMessage({ text: 'Ошибка получения награды', type: 'error' })
    }

    return {
        starOnStart,
        inProcessStar,
        getValue,
        setValue,
        StartFarmTheStar,
        GetCurrentStar,
        ClaimStarRewards
    }
}
