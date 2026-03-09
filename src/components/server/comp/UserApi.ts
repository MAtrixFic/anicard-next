import FetchMG from "../fetches/config"
import { CookieGet } from "../CookieManager"
import { WithCookies } from "@/devs/decorators/serverDec";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { AxiosResponse } from "axios";


export interface IResponse {
    ok: boolean
}

export interface IUserResponse extends IResponse {
    user: TUserData,
    isAdmin: boolean
}

export type TUserData = {
    user_id: number,
    nickname: string,
    coin: number,
    battle_coin: number,
    rating: number,
    card_keys: { key: number }[]
}

export interface IRatingResponse extends IResponse {
    top_users: TUserData[]
}

export default class UserApi {
    static async AuthUser(initData: any): Promise<AxiosResponse | boolean> {
        try {
            const statusCode = await FetchMG.POST('user/auth', {
                init_data: initData
            })
            return statusCode
        }
        catch (error) {
            return false
        }
    }

    static async CreateUser(nickname: string) {
        try {
            const userId = (await CookieGet('userId')) as RequestCookie
            const statusCode = await FetchMG.POST('user', {
                user_id: Number(userId!.value),
                nickname: nickname
            })
            console.log("create user: " + statusCode)
            console.log(statusCode.data)
            return true
        }
        catch (error) {
            console.log("error create user: " + error)
            return false
        }
    }

    @WithCookies()
    static async GetUser(): Promise<IUserResponse | boolean> {
        try {

            const res = await FetchMG.GET(`user`)
            console.log(res.data)
            return res.data
        }
        catch (ex) {
            console.log(ex)
            return false
        }
    }

    static async GetTopUsers(): Promise<IRatingResponse | boolean> {
        try {
            const res = await FetchMG.GET(`rating/top`)
            console.log(res.data)
            return res.data
        }
        catch (ex) {
            console.log(ex)
            return false
        }
    }
}

