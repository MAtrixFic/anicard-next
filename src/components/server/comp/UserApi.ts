'use server'
import FetchMG from "../fetches/config"
import { CookieGet } from "../CookieManager"
import { cookies, headers } from "next/headers"
import setCookieParser from 'set-cookie-parser';


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

export async function AuthUser(initData: any): Promise<IUserResponse | boolean> {
    try {
        console.log(initData)
        const statusCode = await FetchMG.POST('user/auth', {
            init_data: initData
        })
        const setCookieHeader = statusCode.headers['set-cookie'];

        if (setCookieHeader) {
            const parsedCookies = setCookieParser.parse(setCookieHeader);
            const cookieStore = await cookies();

            parsedCookies.forEach((c) => {
                cookieStore.set(c.name, c.value, {
                    httpOnly: true,
                    secure: c.secure,
                    path: c.path,
                    expires: c.expires,
                });
            });
        }
        return statusCode.data
    }
    catch (error) {
        console.log("error auth user: " + error)
        return false
    }
}

export async function CreateUser(nickname: string) {
    try {
        const userId = await CookieGet('userId')
        console.log(nickname, userId?.value)
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

export async function GetUser(userId: string): Promise<IUserResponse | boolean> {
    try {
        const cookieStore = await cookies();
        const res = await FetchMG.GET(`user`, undefined, {
            'Cookie': cookieStore.toString()
        }
        )
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