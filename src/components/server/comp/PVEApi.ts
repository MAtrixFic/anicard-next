import { WithCookies } from "@/devs/decorators/serverDec";
import FetchMG from "../fetches/config";
import { IPet } from "@/devs/store/PetsStore";

export type TPveStatus = "free" | "occupied"

export interface IPveStarResponse extends IFarmCell {
    rarity: string,
    element: string,
    reward: number,
    status: TPveStatus,
    hours: number,
    time_left_seconds: number,
}

export interface IFarmCell {
    star_id: number,
    end_time: string,
    expedition_id: number,
}

export interface IExpeditionDataResponse extends IFarmCell {
    reward_coins: number,
    start_time: string,
    reward_pet: IPet,
    pets: IPet[]
}

export interface IPveCurrentStarDataRepsonse {
    star: IPveStarResponse,
    expedition: IExpeditionDataResponse
}

export default class PVEApi {
    static async GetStars(): Promise<IPveStarResponse[]> {
        try {
            const res = await FetchMG.GET(`pve/stars`)
            console.log(res.data)
            return res.data
        }
        catch (error) {
            console.log(error)
            return []
        }
    }

    static async GetCurrentStar(starId: number): Promise<IPveStarResponse | null> {
        try {
            const res = await FetchMG.GET(`pve/star/${starId}`)
            console.log(res.data)
            return res.data.star
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    static async StartStar(id: number, petIds: number[]): Promise<IExpeditionDataResponse | boolean> {
        try {
            const res = await FetchMG.POST(`pve/start`, {
                star_id: id,
                pet_ids: petIds
            })
            console.log(res.data)
            return res.data
        }
        catch (error) {
            console.log(error.response.data)
            return false
        }
    }
}