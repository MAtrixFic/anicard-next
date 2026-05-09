import { GET, POST } from "../fetches/AuthFetch"
import { IError } from "./Apis"
import { IPet } from "@/devs/store/PetsStore"

export type TPayment = 'real_money' | 'keys' | 'battle_coins'

export default class ShopApi {
    static async GetShopPets(payment: TPayment): Promise<{ ok: boolean, pets: IPet[] }> {
        try {
            const res = await GET(`shop/pet/offers?payment_type=${payment}`)
            console.log(res.data)
            return { ok: true, pets: res.data.pets }
        }
        catch (error) {
            console.log(error)
            return { ok: false, pets: [] }
        }
    }

    static async BuyPet(id: number, payment: TPayment) {
        try {
            console.log(`shop/pet/${id}`)
            await POST(`shop/pet/${id}`, {
                payment_type: payment
            })
            return { ok: true }
        }
        catch (error) {
            console.log(error)
            return { ok: false, data: (error as IError).response.data.detail }
        }
    }

    static async BuyKeys(keysCount: number) {
        try {
            await POST(`shop/keys`, { keys: keysCount })
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    }

    static async BuyExpForPet(id: number, expId: number) {
        console.log('shop/pet/experience', {
            bottle_id: expId,
            pet_id: id
        })
        try {
            await POST(`shop/pet/experience`, {
                bottle_id: expId,
                pet_id: id
            })
            return { ok: true }
        }
        catch (error) {
            console.log((error as IError).response.data.detail)
            return { ok: false, data: (error as IError).response.data.detail }
        }
    }

}

