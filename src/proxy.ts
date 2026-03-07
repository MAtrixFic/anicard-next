import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { GetUser, IUserResponse } from "./components/server/comp/UserApi";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const proxy = async (req: NextRequest) => {
    console.log('Enter to proxy')

    console.log(req.cookies.getAll())

    if (!req.url.includes('auth')) {
        const cookieStore = await cookies();
        if (cookieStore.has('isAuth')) {
            console.log('isAuth', cookieStore.get('isAuth')?.value == 'true')
            if (cookieStore.get('isAuth')?.value == 'true') {
                return NextResponse.next();
            }
            else {
                const isUser = await CheckUser(req, cookieStore)
                return isUser ? NextResponse.next() : NextResponse.redirect(new URL('auth', req.url))
            }
        }
        else {
            const isUser = await CheckUser(req, cookieStore)
            return isUser ? NextResponse.next() : NextResponse.redirect(new URL('auth', req.url))
        }
    }

}

async function CheckUser(req: NextRequest, cookieStore: ReadonlyRequestCookies) {
    console.log(req.nextUrl.search)
    if (req.nextUrl.search.length === 0) return true
    const userId = cookieStore.get('userId')
    if (userId && userId.value.length > 0) {
        const user = await GetUser(userId.value)
        if (user) {
            cookieStore.set('isAuth', JSON.stringify(true), { httpOnly: true })
            cookieStore.set('isAdmin', JSON.stringify((user as IUserResponse).isAdmin), { httpOnly: true })
            return true
        }
        else return false
    }
}
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|images|_next/data|favicon.ico|api|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|css|js|woff|woff2|ttf|eot)$).*)',
    ]
}