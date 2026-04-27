import { useQuery } from "@tanstack/react-query"
import { GetShopPets, BuyKeys, BuyPet, BuyExpForPet } from "@/components/server/comp/Apis"
import { useQueryClient } from "@tanstack/react-query"
import useMessageStore from "@/devs/store/MessageStore"
import { TPayment } from "@/components/server/comp/ShopApi"

export const useShop = () => {
    const addMessage = useMessageStore(state => state.addMessage)
    const client = useQueryClient()
    const { data, isLoading, isError } = useQuery({
        queryFn: async () => {
            return {
                real_money: await GetShopPets('real_money'),
                battle_coins: await GetShopPets('battle_coins')
            }
        },
        queryKey: ['shop-pets']
    })

    async function TryBuyPet(id: number, payment: TPayment) {

        const res = await BuyPet(id, payment);
        if (res.ok) {
            addMessage({ text: 'Оплатите пета в боте', type: 'message' })
            if (payment === 'battle_coins') client.invalidateQueries({ queryKey: ['user'] })
        }
        else addMessage({ text: res.data!, type: 'error' })

    }

    async function TryBuyExp(id: number, expId: number) {

        const res = await BuyExpForPet(id, expId);
        if (res.ok) {
            addMessage({ text: 'Успешная покупка опыта', type: 'message' })
        }
        else addMessage({ text: res.data!, type: 'error' })
    }


    async function TryBuyKeys(keysCount: number) {
        console.log(keysCount)
        const res = await BuyKeys(keysCount);
        if (res)
            addMessage({ text: 'Оплатите ключи в боте', type: 'message' })
        else
            addMessage({ text: 'Ошибка запроса', type: 'error' })

    }

    return {
        offer: { data, isLoading, isError },
        TryBuyPet,
        TryBuyKeys,
        TryBuyExp
    }
}
