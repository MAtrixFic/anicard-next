'use server'
import FetchMG from "../fetches/config"
import { IAdminCardsResponse, IError } from "./AdminApi"

export type TCardType = 'favorite' | 'battle' | 'special'
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

export async function SetInventoryCards(userId: string, cardType: TCardType, cardsId: number[]): Promise<boolean> {
    try {
        console.log(`inventory/${userId}/${cardType}`, cardsId)
        const res = await FetchMG.POST(`inventory/${userId}/${cardType}`, {
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

export async function DeleteInventoryCards(userId: string, cardType: TCardType): Promise<boolean> {
    try {
        const res = await FetchMG.DELETE(`inventory/${userId}/${cardType}`)
        return true
    }
    catch (error) {
        return false
    }
}

export async function AddTwistCard(userId: string, cardType: Omit<TCardType, 'favorite'>) {
    try {
        const res = await FetchMG.POST(`card/${userId}/${cardType}`)
        console.log(res.data)
        return { ok: true, data: res.data.card }
    }
    catch (error) {
        return { ok: false, data: (error as IError).response.data.detail }
    }
}