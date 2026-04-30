import type { IResponse } from "./UserApi"
import FetchMG from "../fetches/config"
import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import { WithCookies } from "@/devs/decorators/serverDec"

export interface IAdminCardsResponse extends IResponse {
    cards: ICard[]
}

export interface IRespone<T> {
    ok: boolean,
    data: T
}

export type TCardAdd = Omit<ICard, 'photo' | 'id'>
export type TCardWithPhoto = TCardAdd & { photo: File }

export default class AdminApi {
    @WithCookies()
    static async GetCards(): Promise<IAdminCardsResponse> {
        try {
            const res = await FetchMG.GET(`admin/cards`)
            console.log(res.data)
            return res.data
        }
        catch (error) {
            console.log(error)
            return { 'ok': false, cards: [] }
        }
    }
    @WithCookies()
    static async AddCard(card: TCardWithPhoto): Promise<ICard | boolean> {
        try {
            const res = await FetchMG.POST(`admin/cards`, card)
            return res.data.card
        }
        catch (error) {
            // console.log(error.toJSON())
            return false
        }
    }


    // @WithCookies()
    // static async SetAvatarForCard(photoData: FormData) {
    //     try {
    //         const data = new FormData()
    //         data.append('photo', photoData.get('photo') as File)
    //         console.log(photoData)
    //         const res = await FetchMG.POST(`admin/cards/${photoData.get('id')?.toString()}/upload-photo`, data)
    //         console.log(res.data)
    //         return true
    //     }
    //     catch (error) {
    //         console.log(error.toJSON())
    //         return false
    //     }
    // }


    @WithCookies()
    static async DeletePet(petId: string) {
        try {
            await FetchMG.DELETE(`admin/pets/${petId}`,)
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