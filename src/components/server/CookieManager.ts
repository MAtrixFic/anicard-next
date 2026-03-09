'use server'
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

export const CookieSet = async (key: string, value: any, options?: Partial<ResponseCookie>) => {
    const cookieStore = await cookies()
    cookieStore.set(key, value, options);
}

export const CookieGet = async (key?: string) => {
    const cookieStore = await cookies()
    return key ? cookieStore.get(key) : cookieStore;
}