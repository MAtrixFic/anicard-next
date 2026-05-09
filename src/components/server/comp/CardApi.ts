import { TCardType } from "./InventoryApi"
import { IAdminCardsResponse } from "./AdminApi"
import { GET } from "../fetches/AuthFetch"

export class CardApi {
    static async GetInventoryCards(cardType?: TCardType): Promise<IAdminCardsResponse> {
        try {
            const res = await GET(`inventory/cards${cardType ? `/${cardType}` : ''}`)
            console.log(res.data)
            return res.data
        }
        catch (error) {
            return { ok: false, cards: [] }
        }
    }
}