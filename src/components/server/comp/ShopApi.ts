import { ICard } from "@/components/additionals/Windows/CardGlobalChoiseList"
import FetchMG from "../fetches/config"
import { WithCookies } from "@/devs/decorators/serverDec"
import { IPet } from "@/devs/store/PetsStore"

export default class ShopApi {
    static async GetShopPets(): Promise<{ ok: boolean, pets: IPet[] }> {
        try {
            const res = await FetchMG.GET('shop/pet/offers')
            console.log(res.data)
            return { ok: true, pets: res.data.pets }
        }
        catch (error) {
            console.log(error)
            return { ok: false, pets: [] }
        }
    }
    @WithCookies()
    static async BuyPet(id: number) {
        try {
            console.log(`shop/pet/${id}`)
            await FetchMG.POST(`shop/pet/${id}`, {
                payment_type: "real_money"
            })
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    }
    @WithCookies()
    static async BuyKeys(keysCount: number) {
        try {
            await FetchMG.POST(`shop/keys`, { keys: keysCount })
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    }

}

