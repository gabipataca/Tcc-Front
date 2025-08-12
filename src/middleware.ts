import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import AuthService from "./services/AuthService";
import { UserTokenProperties } from "./types/Auth";

const protectedRoutes = [
    { path: "/admin", roles: ["Admin"] },
    { path: "/Competition", roles: ["Admin", "Teacher", "Student"] },
];

const SECRET_KEY = process.env.JWT_SECRET!;


export const middleware = async (request: NextRequest) => {
    const { basePath } = request.nextUrl;
    const route = protectedRoutes.find(r => basePath.startsWith(r.path));

    const token = request.cookies.get("CompetitionAuthToken")?.value;

    if(!token) {
        //return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const jwtPayload = jwt.verify(token, SECRET_KEY) as UserTokenProperties;

        const isTokenValid = await AuthService.validateTokenSSR(token);

        if(!route?.roles?.includes(jwtPayload.role) || !isTokenValid) {
            //return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        //return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        //"/admin/:path*",
        //"/Competition/:path*",
    ]
};