import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { GetUser, IUserResponse } from "./components/server/comp/UserApi";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const proxy = async (req: NextRequest) => {
    console.log('Enter to proxy')
    // await CookieSet('isAdmin', true)
    // await CookieSet('isAuth', true)
    // await CookieSet('userId', '1853332193')
    // return NextResponse.next()

    if (!req.url.includes('auth')) {
        const cookieStore = await cookies();
        if (cookieStore.has('isAuth')) {
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

    async function CheckUser(req: NextRequest, cookieStore: ReadonlyRequestCookies) {
        if (req.nextUrl.pathname === '/') {
            if (req.nextUrl.search.length > 0) {
                const queries = req.nextUrl.search.replace('?', '').replace('=', ':').split('&')
                const userIdQuery = queries.filter(v => v.includes('user_id'))
                if (userIdQuery.length > 0) {
                    const neededUserIdQuery = userIdQuery[0].split(':')[1]
                    cookieStore.set('userId', neededUserIdQuery, { httpOnly: true })
                    const user = await GetUser(neededUserIdQuery)
                    if (user) {
                        cookieStore.set('isAuth', JSON.stringify(true), { httpOnly: true })
                        cookieStore.set('isAdmin', JSON.stringify((user as IUserResponse).isAdmin), { httpOnly: true })
                        return true
                    }
                    else return false
                }
            }
        }
        else
            return false
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api).*)',
    ]
}