import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import FetchMG from "../fetches/config"
import { WithCookies } from "@/devs/decorators/serverDec"

export default class ShopApi {
    static async GetShopCards(): Promise<{ ok: boolean, cards: ICard[] }> {
        try {
            const res = await FetchMG.GET('shop/offers')
            console.log(res.data)
            return { ok: true, cards: res.data.cards }
        }
        catch (error) {
            console.log(error)
            return { ok: false, cards: [] }
        }
    }
    @WithCookies()
    static async BuySpecialCards(cardId: number) {
        try {
            await FetchMG.POST(`shop/card/${cardId}`)
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    }
    @WithCookies()
    static async BuyKeys(keysCount: number) {
        try {
            await FetchMG.POST(`shop/keys`, { keys: keysCount })
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    }

}

