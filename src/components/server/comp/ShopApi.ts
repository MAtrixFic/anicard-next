'use server'

import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import FetchMG from "../fetches/config"

export async function GetShopCards(): Promise<{ ok: boolean, cards: ICard[] }> {
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

export async function BuySpecialCards(userId: number, cardId: number) {
    try {
        await FetchMG.POST(`shop/card/${userId}/${cardId}`)
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}

export async function BuyKeys(userId: number, keysCount: number) {
    try {
        await FetchMG.POST(`shop/keys/${userId}/${keysCount}`)
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}
