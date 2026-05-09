import { useCardsStore } from "@/devs/store/CardsStore"
import { type ICardStore } from "@/devs/store/CardsStore"
import { IAllCardData } from "@/components/server/comp/AdminApi"
import { TCardType } from "@/components/server/comp/InventoryApi"
import { DeleteInventoryCards, SetInventoryCards } from "@/components/server/comp/Apis"
import { useQueryClient } from "@tanstack/react-query"
import useMessageStore from "@/devs/store/MessageStore"

export const useCards = () => {
    const SetCards = useCardsStore(state => state.SetCards)
    const queryClient = useQueryClient()
    const { addMessage } = useMessageStore()
    const GetCards = useCardsStore(state => state.GetCards)

    async function SetInvCards(cardsType: TCardType, cardsId: number[]) {
        const deleteRes = await DeleteInventoryCards(cardsType)
        if (deleteRes) {
            const setRes = await SetInventoryCards(cardsType, cardsId)
            if (setRes) addMessage({ text: 'Карты обновлены', type: 'message' })
            else addMessage({ text: 'Ошибка обновления', type: 'error' })
        }

        else addMessage({ text: 'Ошибка удаления', type: 'error' })
        queryClient.invalidateQueries({ queryKey: [cardsType] })

    }


    return {
        setCards: async (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>, cards: IAllCardData[]) => await SetCards(key, cards),
        getCards: async (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>) => await GetCards(key),
        SetInvCards
    }
}