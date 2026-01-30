'use server'
import FetchMG from "../fetches/config"
import { CookieGet } from "../CookieManager"

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

export async function CreateUser(nickname: string) {
    try {
        const userId = await CookieGet('userId')
        console.log(nickname, userId?.value)
        const statusCode = await FetchMG.POST('user', {
            user_id: Number(userId!.value),
            nickname: nickname
        })
        console.log(statusCode.data)
        return true
    }
    catch (error) {
        console.log(error.response)
        return false
    }
}

export async function GetUser(userId: string): Promise<IUserResponse | boolean> {
    try {
        const res = await FetchMG.GET(`user/${userId}`)
        console.log(res.data)
        return res.data
    }
    catch (ex) {
        console.log(ex)
        return false
    }
}

export async function GetTopUsers(): Promise<IRatingResponse | boolean> {
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