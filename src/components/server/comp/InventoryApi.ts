import { WithCookies } from "@/devs/decorators/serverDec"
import FetchMG from "../fetches/config"
import { IAdminCardsResponse, IError } from "./AdminApi"

export type TCardType = 'favorite' | 'battle' | 'special'

export class InventoryApi {
    @WithCookies()
    static async GetInventoryCards(cardType?: TCardType): Promise<IAdminCardsResponse> {
        try {
            const res = await FetchMG.GET(`inventory${cardType ? `/${cardType}` : ''}`)
            console.log(res.data)
            return res.data
        }
        catch (error) {
            return { ok: false, cards: [] }
        }
    }

    @WithCookies()
    static async SetInventoryCards(cardType: TCardType, cardsId: number[]): Promise<boolean> {
        try {
            const res = await FetchMG.POST(`inventory/${cardType}`, {
                cards_id: cardsId
            })
            console.log(res.data)
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    }

    @WithCookies()
    static async DeleteInventoryCards(cardType: TCardType): Promise<boolean> {
        try {
            const res = await FetchMG.DELETE(`inventory/${cardType}`)
            return true
        }
        catch (error) {
            return false
        }
    }

}

export class TwistApi {
    @WithCookies()
    static async AddTwistCard(cardType: Omit<TCardType, 'favorite'>) {
        try {
            const res = await FetchMG.POST(`card`, { card_type: cardType })
            console.log(res.data)
            return { ok: true, data: res.data.card }
        }
        catch (error) {
            return { ok: false, data: (error as IError).response.data.detail }
        }
    }
}
