import { useCardsStore } from "@/devs/store/CardsStore"
import { useUserStore } from "@/devs/store/UserStore"
import { type ICardStore } from "@/devs/store/CardsStore"
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import { SetInventoryCards, TCardType, DeleteInventoryCards } from "@/components/server/comp/InventoryApi"
import { useQueryClient } from "@tanstack/react-query"
import useMessageStore from "@/devs/store/MessageStore"

export const useCards = () => {
    const getValue = useUserStore(state => state.getUserValues)
    const SetCards = useCardsStore(state => state.SetCards)
    const queryClient = useQueryClient()
    const { addMessage } = useMessageStore()
    const GetCards = useCardsStore(state => state.GetCards)

    async function SetInvCards(cardsType: TCardType, cardsId: number[]) {
        const id = await getValue('id')
        const deleteRes = await DeleteInventoryCards(id, cardsType)
        if (deleteRes) {
            const setRes = await SetInventoryCards(id, cardsType, cardsId)
            if (setRes) addMessage({ text: 'Карты обновлены', type: 'message' })
            else addMessage({ text: 'Ошибка обновления', type: 'error' })
        }

        else addMessage({ text: 'Ошибка удаления', type: 'error' })
        queryClient.invalidateQueries({ queryKey: [cardsType] })

    }


    return {
        setCards: async (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>, cards: ICard[]) => await SetCards(key, cards),
        getCards: async (key: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>) => await GetCards(key, await getValue('id')),
        SetInvCards
    }
}