import { WithCookies } from "@/devs/decorators/serverDec";
import { IShortCardInfo } from "@/components/additionals/Windows/CardGlobalChoiseList";
import { IPetWithId } from "@/components/routes/shop/Bunner";
import { IError } from "./Apis";
import FetchMG from "../fetches/config";

export interface IElementUpgradeInfo {
    current_level: number,
    coin_cost: number,
    has_enough_coins: boolean,
    max_level: number
}

export interface IElementUpgrade {
    ok: boolean,
    new_level: number,
    remaining_copies: number,
    coin_spent: number,
    remaining_coins: number,
    status: string
}

export interface ICardUpgradeInfo extends IElementUpgradeInfo {
    current_copies: number,
    copies_needed: number,
    has_enough_copies: boolean,
    card: IShortCardInfo
}

export interface IPetUpgradeInfo extends IElementUpgradeInfo {
    current_exp: number
    required_exp: number,
    has_enough_exp: boolean,
    pet: IPetWithId
}

export interface ICardUpgrade extends IElementUpgrade {
    card: IShortCardInfo
}

export interface IPetUpgrade extends IElementUpgrade {
    pet: IPetWithId
}


export default class UpgradeApi {
    @WithCookies()
    static async GetCardUpgradeInfo(id: number): Promise<ICardUpgradeInfo | boolean> {
        try {
            const res = await FetchMG.GET(`card/upgrade-info/${id}`)
            console.log(res.data)
            return res.data
        }
        catch (error) {
            console.log((error as IError).response.data.detail)
            return false
        }
    }
    @WithCookies()
    static async UpgradeCard(id: number): Promise<ICardUpgrade | boolean> {
        try {
            const res = await FetchMG.POST(`card/upgrade`, {
                card_id: id
            })
            console.log(res.data)
            return res.data
        }
        catch (error) {
            console.log((error as IError).response.data.detail)
            return false
        }
    }
    @WithCookies()
    static async GetPetUpgradeInfo(id: number): Promise<IPetUpgradeInfo | boolean> {
        try {
            const res = await FetchMG.GET(`pet/upgrade-info/${id}`)
            console.log(res.data)
            return res.data
        }
        catch (error) {
            console.log((error as IError).response.data.detail)
            return false
        }
    }
    @WithCookies()
    static async UpgradePet(id: number): Promise<IPetUpgrade | boolean> {
        try {
            const res = await FetchMG.POST(`pet/upgrade`, {
                pet_id: id
            })
            console.log(res.data)
            return res.data
        }
        catch (error) {
            console.log((error as IError).response.data.detail)
            return false
        }
    }
}