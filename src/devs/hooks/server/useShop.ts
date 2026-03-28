import { useQuery } from "@tanstack/react-query"
import { GetShopPets, BuyKeys, BuyPet } from "@/components/server/comp/Apis"
import useMessageStore from "@/devs/store/MessageStore"

export const useShop = () => {
    const addMessage = useMessageStore(state => state.addMessage)
    const { data, isLoading, isError } = useQuery({
        queryFn: GetShopPets,
        queryKey: ['shop-pets']
    })

    async function TryBuyPet(id: number) {

        const res = await BuyPet(id);
        if (res)
            addMessage({ text: 'Оплатите пета в боте', type: 'message' })
        else
            addMessage({ text: 'Ошибка запроса', type: 'error' })

    }


    async function TryBuyKeys(keysCount: number) {

        const res = await BuyKeys(keysCount);
        if (res)
            addMessage({ text: 'Оплатите ключи в боте', type: 'message' })
        else
            addMessage({ text: 'Ошибка запроса', type: 'error' })

    }

    return {
        offer: { data, isLoading, isError },
        TryBuyPet,
        TryBuyKeys
    }
}
