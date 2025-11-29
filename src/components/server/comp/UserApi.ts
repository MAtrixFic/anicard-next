'use server'
import FetchMG from "../fetches/config"
import { CookieGet } from "../CookieManager"

export type TUser = {
    ok: boolean,
    user: TUserData,
    isAdmin: boolean
}

export type TUserData = {
    user_id: number,
    nickname: string,
    coin: number,
    battle_coin: number,
    rating: number
}

export type TRating = {
    ok: boolean,
    top_users: TUserData[]
}

export async function CreateUser(nickname: string) {
    try {
        const userId = await CookieGet('userId')
        const statusCode = await FetchMG.POST('auth', {
            user_id: (Number)(userId!.value),
            nickname: nickname
        })
        console.log(statusCode.data)
        return (statusCode.data)
    }
    catch (error) {
        const errorData = (error as { respose: { data: any } }).respose.data
        console.log(errorData)
        return (errorData)
    }
}

export async function GetUser(userId: string): Promise<TUser | boolean> {
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

export async function GetTopUsers(): Promise<TRating | boolean> {
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