import { NextResponse, NextRequest } from "next/server";
import AuthService from "./services/AuthService";
import { UserTokenProperties } from "./types/Auth";

const protectedRoutes = [
    { path: "/admin", roles: ["Admin"] },
    { path: "/Competition", roles: ["Admin", "Teacher", "Student"] },
];

const parseJwt = (token: string): UserTokenProperties => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
    );
    return JSON.parse(jsonPayload);
};

export const middleware = async (request: NextRequest) => {
    const { basePath, pathname } = request.nextUrl;
    const isAuthRoute = ["register", "login"].some((path) =>
        basePath.includes(path)
    );

    const route = protectedRoutes.find((r) => pathname.startsWith(r.path));

    const token = request.cookies.get("CompetitionAuthToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const jwtPayload = parseJwt(token);

        const isTokenValid = await AuthService.validateTokenSSR(token);

        console.log("Role: ", jwtPayload.role);
        console.log("Route: ", route);

        if (!route?.roles?.includes(jwtPayload.role) && !isTokenValid) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/profile", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
};

export const config = {
    matcher: ["/admin/:path*", "/Competition/:path*", "/profile/:path*"],
};
