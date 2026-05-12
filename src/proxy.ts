import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { IUserResponse } from "./components/server/comp/UserApi";
import { GetUser } from "./components/server/comp/Apis";

export async function proxy(req: NextRequest) {
    // console.log('Enter to middleware');

    // const isAuthCookie = req.cookies.get('isAuth');
    // const isAuthRoute = req.nextUrl.pathname.startsWith('/auth');

    // if (!isAuthRoute) {
    //     if (isAuthCookie?.value === 'true') {
    //         return NextResponse.next();
    //     }

    //     const isValid = await CheckUser(req);

    //     if (isValid) {

    //         const response = NextResponse.next();
    //         response.cookies.set('isAuth', 'true', {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === 'production',
    //             sameSite: 'lax',
    //             path: '/'
    //         });

    //         if (req.cookies.get('isAdmin')?.value !== 'true') {
    //             const user = await GetUser() as IUserResponse;
    //             if (user?.isAdmin) {
    //                 response.cookies.set('isAdmin', 'true', {
    //                     httpOnly: true,
    //                     secure: process.env.NODE_ENV === 'production',
    //                     sameSite: 'lax',
    //                     path: '/'
    //                 });
    //             }
    //         }

    //         return response;
    //     }

    //     const loginUrl = new URL('/auth', req.url);
    //     loginUrl.searchParams.set('from', req.nextUrl.pathname);
    //     return NextResponse.redirect(loginUrl);
    // }

    // if (isAuthCookie?.value === 'true') {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }

    return NextResponse.next();
}

async function CheckUser(req: NextRequest): Promise<boolean> {
    const accessToken = req.cookies.get('access_token');
    if (!accessToken) {
        return false;
    }

    try {
        const user = await GetUser();

        if (user) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('CheckUser error:', error);
        return false;
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder (images, etc.)
         * - api routes
         * - static files with extensions
         */
        '/((?!_next/static|_next/image|favicon.ico|images|api|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|css|js|woff|woff2|ttf|eot)$).*)',
    ],
};