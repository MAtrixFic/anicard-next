import { GetAuthCookie } from "@/components/server/comp/Apis";
import { BACK_ORIGIN } from "@/components/server/fetches/env.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { access } = await GetAuthCookie()
        let res = await fetch(`${BACK_ORIGIN}/admin/pets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'access_token': access ? access.value : '',
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