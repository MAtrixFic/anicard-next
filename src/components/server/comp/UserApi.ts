import { GET, POST } from "../fetches/AuthFetch"
import { CookieGet } from "../CookieManager"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";


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
    total_cards: number,
    card_keys: { key: number }[]
}

export interface IRatingResponse extends IResponse {
    top_users: TUserData[]
}

export default class UserApi {
    static async AuthUser(initData: any): Promise<{ access_token: string, refresh_token: string } | false> {
        try {
            const userAuthData = await POST('user/auth', {
                init_data: initData
            })
            return userAuthData.data
        }
        catch (error) {
            return false
        }
    }


    static async CreateUser(nickname: string) {
        try {
            const userId = (await CookieGet('userId')) as RequestCookie
            const statusCode = await POST('user', {
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


    static async GetUser(): Promise<IUserResponse | boolean> {
        try {

            const res = await GET(`user`)
            console.log(res.data)
            return res.data
        }
        catch (ex) {
            console.log(ex)
            return false
        }
    }


    static async RefreshToken(): Promise<{ access_token: string, refresh_token: string } | false> {
        try {
            const res = await POST('user/refresh')
            console.log('refresh token', res.data)
            return res.data
        }
        catch (error) {
            return false
        }
    }



    static async GetUserKeys(): Promise<any | boolean> {
        try {

            const res = await GET(`user/keys`)
            console.log('keys:', res.data)
            return res.data
        }
        catch (ex) {
            console.log('keys error', ex)
            return false
        }
    }

    static async GetTopUsers(): Promise<IRatingResponse | boolean> {
        try {
            const res = await GET(`rating/top`)
            console.log(res.data)
            return res.data
        }
        catch (ex) {
            console.log(ex)
            return false
        }
    }
}

