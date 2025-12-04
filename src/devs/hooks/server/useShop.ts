import { useQuery } from "@tanstack/react-query"
import { GetShopCards, BuyKeys, BuySpecialCards } from "@/components/server/comp/ShopApi"
import { useUser } from "./useUser"
import useMessageStore from "@/devs/store/MessageStore"

export const useShop = () => {
    const { user } = useUser()
    const addMessage = useMessageStore(state => state.addMessage)
    const { data, isLoading, isError } = useQuery({
        queryFn: GetShopCards,
        queryKey: ['shop-cards']
    })

    async function TryBuyCards(cardId: number) {

        const res = await BuySpecialCards(user!.id, cardId);
        if (res)
            addMessage({ text: 'Оплатите карту в боте', type: 'message' })
        else
            addMessage({ text: 'Ошибка запроса', type: 'error' })

    }


    async function TryBuyKeys(keysCount: number) {

        const res = await BuyKeys(user!.id, keysCount);
        if (res)
            addMessage({ text: 'Оплатите ключи в боте', type: 'message' })
        else
            addMessage({ text: 'Ошибка запроса', type: 'error' })

    }

    return {
        offer: { data, isLoading, isError },
        TryBuyCards,
        TryBuyKeys
    }
}
