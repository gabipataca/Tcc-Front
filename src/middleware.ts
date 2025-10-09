import { NextResponse, NextRequest } from "next/server";
import AuthService from "./services/AuthService";
import { UserTokenProperties, UserTokenPropertiesClaims } from "./types/Auth";
import { RoleClaimKey } from "./constants/Auth";

const protectedRoutes = [
    { path: "/admin", roles: ["Admin"] },
    { path: "/Competition", roles: ["Admin", "Teacher", "Student"] },
    { path: "/profile", roles: ["Admin", "Teacher", "Student"] },
];

const parseJwt = (token: string): UserTokenProperties => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const str = Buffer.from(base64, "base64").toString("utf-8");
    const parsedToken = JSON.parse(str) as UserTokenPropertiesClaims;

    return {
        unique_name: parsedToken.unique_name,
        id: parsedToken.id,
        role: parsedToken[RoleClaimKey],
        jti: parsedToken.jti,
        exp: parsedToken.exp,
        iss: parsedToken.iss,
        aud: parsedToken.aud,
    };
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

        if (!route?.roles?.includes(jwtPayload.role) || !isTokenValid) {
            return NextResponse.redirect(new URL("/logout", request.url));
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
