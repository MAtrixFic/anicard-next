import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import FetchMG from "../fetches/config"
import { WithCookies } from "@/devs/decorators/serverDec"
import { IError } from "./Apis"
import { IPet } from "@/devs/store/PetsStore"

export type TPayment = 'real_money' | 'keys' | 'battle_coins'

export default class ShopApi {
    @WithCookies()
    static async GetShopPets(payment: TPayment): Promise<{ ok: boolean, pets: IPet[] }> {
        try {
            const res = await FetchMG.GET(`shop/pet/offers?payment_type=${payment}`)
            console.log(res.data)
            return { ok: true, pets: res.data.pets }
        }
        catch (error) {
            console.log(error)
            return { ok: false, pets: [] }
        }
    }
    @WithCookies()
    static async BuyPet(id: number, payment: TPayment) {
        try {
            console.log(`shop/pet/${id}`)
            await FetchMG.POST(`shop/pet/${id}`, {
                payment_type: payment
            })
            return { ok: true }
        }
        catch (error) {
            console.log(error)
            return { ok: false, data: (error as IError).response.data.detail }
        }
    }
    @WithCookies()
    static async BuyKeys(keysCount: number) {
        try {
            // console.log(`shop/keys`, { keys: keysCount })
            await FetchMG.POST(`shop/keys`, { keys: keysCount })
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    }

    @WithCookies()
    static async BuyExpForPet(id: number, expId: number) {
        console.log('shop/pet/experience', {
            bottle_id: expId,
            pet_id: id
        })
        try {
            await FetchMG.POST(`shop/pet/experience`, {
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

