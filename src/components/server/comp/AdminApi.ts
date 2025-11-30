'use server'
import type { IResponse } from "./UserApi"
import FetchMG from "../fetches/config"
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"

export interface IAdminCardsResponse extends IResponse {
    cards: ICard[]
}

export async function GetCards(userId: string): Promise<IAdminCardsResponse> {
    try {
        const res = await FetchMG.GET(`admin/cards/?user_id=${userId}`)
        console.log(res)
        return res.data
    }
    catch (error) {
        console.log(error)
        return { 'ok': false, cards: [] }
    }
}


export async function AddCard(userId: string, card: Omit<ICard, 'id'> & { price: number }) {
    try {
        await FetchMG.POST(`admin/cards?user_id=${userId}`, card)
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}


export async function DeleteCard() {

}