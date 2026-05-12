'use server'

import { cookies } from 'next/headers'
import FetchMG from './config'

async function getAccessHeaders(headers?: any) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value
    const refreshToken = cookieStore.get('refresh_token')?.value

    return {
        ...headers,
        ...(accessToken
            ? {
                access_token: accessToken,
                refresh_token: refreshToken,
            }
            : {}),
    }
}

export async function GET(
    endpoint: string,
    params?: any,
    headers?: any
) {
    return FetchMG.GET(endpoint, params, await getAccessHeaders(headers))
}

export async function POST(
    endpoint: string,
    params?: any,
    headers?: any
) {
    return FetchMG.POST(endpoint, params, await getAccessHeaders(headers))
}

export async function DELETE(
    endpoint: string,
    params?: any,
    headers?: any
) {
    return FetchMG.DELETE(endpoint, params, await getAccessHeaders(headers))
}