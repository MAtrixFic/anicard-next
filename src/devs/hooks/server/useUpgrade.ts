import { GetCardUpgradeInfo, GetPetUpgradeInfo, UpgradeCard, UpgradePet } from "@/components/server/comp/Apis"
import { ICardUpgrade, ICardUpgradeInfo, IElementUpgradeInfo, IPetUpgrade, IPetUpgradeInfo } from "@/components/server/comp/UpgradeApi"
import useMessageStore from "@/devs/store/MessageStore"
import { useQuery } from "@tanstack/react-query"

const useUpgrade = (type: 'card' | 'pet', index: number) => {
    const addMessage = useMessageStore(state => state.addMessage)

    const { data } = useQuery({
        queryKey: [type, index],
        queryFn: async () => {
            const resInfo = type === 'card' ? getCardUpgradeInfo(index) : getPetUpgradeInfo(index)
            return resInfo
        }
    })

    async function upgradeCard(id: number) {
        const upgradedData = await UpgradeCard(id)
        if (upgradedData) addMessage({ text: (upgradedData as ICardUpgrade).status, type: 'message' })
        else addMessage({ text: "Ошибка прокачки", type: 'error' })
    }

    async function upgradePet(id: number) {
        const upgradedData = await UpgradePet(id)
        if (upgradedData) addMessage({ text: (upgradedData as IPetUpgrade).status, type: 'message' })
        else addMessage({ text: "Ошибка прокачки", type: 'error' })
    }

    async function getCardUpgradeInfo(id: number) {
        const upgradeInfo = await GetCardUpgradeInfo(id)
        if (upgradeInfo) return upgradeInfo
    }

    async function getPetUpgradeInfo(id: number) {
        const upgradeInfo = await GetPetUpgradeInfo(id)
        if (upgradeInfo) return upgradeInfo
    }

    return { upgradeCard, upgradePet, upgradedInfo: data, getCardUpgradeInfo, getPetUpgradeInfo }
}

export default useUpgrade