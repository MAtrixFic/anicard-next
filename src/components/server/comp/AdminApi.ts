import type { IResponse } from "./UserApi"
import FetchMG from "../fetches/config"
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import { WithCookies } from "@/devs/decorators/serverDec"

export interface IAdminCardsResponse extends IResponse {
    cards: ICard[]
}

export interface IError {
    response: {
        data: {
            detail: string
        }
    }
}

export interface IRespone<T> {
    ok: boolean,
    data: T
}


export default class AdminApi {
    @WithCookies()
    static async GetCards(): Promise<IAdminCardsResponse> {
        try {
            const res = await FetchMG.GET(`admin/cards`)
            return res.data
        }
        catch (error) {
            console.log(error)
            return { 'ok': false, cards: [] }
        }
    }

    @WithCookies()
    static async AddCard(card: Partial<Omit<ICard, 'id'>>) {
        try {
            await FetchMG.POST(`admin/cards`, card)
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    }

    @WithCookies()
    static async DeleteCard(cardId: string) {
        try {
            await FetchMG.DELETE(`admin/cards/${cardId}`,)
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    }

}