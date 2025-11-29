'use server'
import { cookies } from "next/headers"

export const CookieSet = async (key: string, value: any) => {
    const cookieStore = await cookies()
    cookieStore.set(key, value, { httpOnly: true });
}

export const CookieGet = async (key: string) => {
    const cookieStore = await cookies()
    return cookieStore.get(key);
}