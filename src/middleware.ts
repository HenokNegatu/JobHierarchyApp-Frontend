import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './app/lib/session';


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the route is /sign-in
    if (pathname === '/auth/signin') {
        const session = await getSession();

        if (session) {
            const { user, exp } = session;
            const currentTime = Math.floor(Date.now() / 1000);

            if (exp > currentTime) {
                if (user.role === 'admin') {
                    return NextResponse.redirect(new URL('/', request.url));
                }
                if (user.role === 'non-admin') {
                    return NextResponse.redirect(new URL(`/employee/employee-dashboard/${user.id}`, request.url));
                }
            }
        }
        return NextResponse.next();
    }

    // Protect /admin and /employee routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/employee')) {
        const session = await getSession();

        if (!session) {
            // No session, redirect to sign-in
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }

        const { user, exp } = session;
        const currentTime = Math.floor(Date.now() / 1000);

        // Check if the token is expired
        if (exp <= currentTime) {
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }

        // Check if the user has the correct role for the route
        if (pathname.startsWith('/admin') && user.role !== 'admin') {
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }

        if (pathname.startsWith('/employee') && user.role !== 'non-admin') {
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }
    }

    return NextResponse.next();
}
