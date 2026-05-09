import { GET, POST, DELETE } from "../fetches/AuthFetch"
import { IAdminCardsResponse } from "./AdminApi"
import { IError } from "./Apis"
import { IPet } from "@/devs/store/PetsStore"
import { IResponse } from "./UserApi"

export type TCardType = 'favorite' | 'battle' | 'special'

interface IPetsResponse extends IResponse {
    pets: IPet[]
}

export class InventoryApi {
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

    static async GetAdminPets(): Promise<IPetsResponse> {
        try {
            const res = await GET('admin/pets')
            console.log(res.data)
            return res.data
        }
        catch (error) {
            return { ok: false, pets: [] }
        }
    }

    static async GetInventoryPets(cardType?: TCardType): Promise<IPetsResponse> {
        try {
            const res = await GET(`inventory/pets${cardType ? `/${cardType}` : ''}`)
            console.log(res.data)
            return res.data
        }
        catch (error) {
            return { ok: false, pets: [] }
        }
    }

    static async SetInventoryCards(cardType: TCardType, cardsId: number[]): Promise<boolean> {
        try {
            const res = await POST(`inventory/cards/${cardType}`, {
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

    static async SetInventoryPets(petsType: TCardType, petIds: number[]): Promise<boolean> {
        try {
            const res = await POST(`inventory/pets/${petsType}`, {
                pets_id: petIds
            })
            console.log(res.data)
            return true
        }
        catch (error) {
            console.log(`inventory/pets/${petsType}`, { pets_id: petIds })
            console.log(error)
            return false
        }
    }

    static async DeleteInventoryCards(cardType: TCardType): Promise<boolean> {
        try {
            await DELETE(`inventory/cards/${cardType}`)
            return true
        }
        catch (error) {
            return false
        }
    }

    static async DeleteInventoryPets(cardType: TCardType): Promise<boolean> {
        try {
            const deleteRes = await DELETE(`inventory/pets/${cardType}`)
            console.log(deleteRes.data)
            return true
        }
        catch (error) {
            return false
        }
    }

}

export class TwistApi {
    static async AddTwistCard(cardType: Omit<TCardType, 'favorite'>) {
        try {
            const res = await POST(`card`, { card_type: cardType })
            console.log(res.data)
            return { ok: true, data: res.data.card }
        }
        catch (error) {
            return { ok: false, data: (error as IError).response.data.detail }
        }
    }
}
