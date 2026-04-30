import { GetAuthCookie } from "@/components/server/comp/Apis";
import { BACK_ORIGIN } from "@/components/server/fetches/env.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        let res = await fetch(`${BACK_ORIGIN}/admin/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Cookie': await GetAuthCookie()
            },
            body: JSON.stringify(body)
        });

        const data = await res.json()
        console.log('Server route', data)

        return NextResponse.json(data, { status: res.status })

    } catch (ex) {
        console.log('Server route', ex)
        return NextResponse.json({ error: 'failed' }, { status: 500 })
    }
}