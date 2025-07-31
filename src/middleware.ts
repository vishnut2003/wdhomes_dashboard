// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { verifyPermission } from "./permissions"

export default withAuth(
    async function middleware(req: NextRequest) {
        const pathname = req.nextUrl.pathname;
        const userSession = await getToken({ req });

        if (userSession?.role) {
            const isAllowed = verifyPermission({
                role: userSession.role,
                endpoint: pathname,
            })

            if (!isAllowed) {
                const url = req.nextUrl.clone();
                url['pathname'] = "/app"
                return NextResponse.redirect(url);
            }
        }

        // Allow everything else
        return NextResponse.next()
    },
    {
        callbacks: {
            // Require authentication on all matched routes
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: [
        "/app/:path*",
    ],
}