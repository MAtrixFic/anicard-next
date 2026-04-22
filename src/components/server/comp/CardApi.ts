import { WithCookies } from "@/devs/decorators/serverDec"

import { TCardType } from "./InventoryApi"
import { IAdminCardsResponse } from "./AdminApi"
import FetchMG from "../fetches/config"

export class CardApi {
    @WithCookies()
    static async GetInventoryCards(cardType?: TCardType): Promise<IAdminCardsResponse> {
        try {
            const res = await FetchMG.GET(`inventory/cards${cardType ? `/${cardType}` : ''}`)
            console.log(res.data)
            return res.data
        }
        catch (error) {
            return { ok: false, cards: [] }
        }
    }
}