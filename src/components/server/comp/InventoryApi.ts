'use server'
import FetchMG from "../fetches/config"
import { IAdminCardsResponse } from "./AdminApi"

export type TCardType = 'favorite' | 'battle'
export async function GetInventoryCards(userId: string, cardType?: TCardType): Promise<IAdminCardsResponse> {
    try {
        const res = await FetchMG.GET(`inventory/${userId}${cardType ? `/${cardType}` : ''}`)
        console.log(res.data)
        return res.data
    }
    catch (error) {
        return { ok: false, cards: [] }
    }
}