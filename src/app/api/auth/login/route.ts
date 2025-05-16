import { LoginUserRequest, LoginUserResponse } from "@/types/Auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    const cookie = await cookies();
    const token = cookie.get("token")?.value || null;

    if(token != null) {
        return NextResponse.json(
            {
                message: "You are already logged in",
            },
            {
                status: 403,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    const apiUrl = process.env.API_URL as string;
    const body = await req.json() as LoginUserRequest;

    let res: Response | null = null;

    try {
        res = await fetch(`${apiUrl}/auth/register`, {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            next: { revalidate: false },
            referrerPolicy: "origin-when-cross-origin"
        });
    }
    catch(exc) {
        console.error(exc);
        console.error(await res!.json());
    }

    const data = await res!.json() as LoginUserResponse;

    return NextResponse.json(data, {
        headers: {
            "Content-Type": "application/json"
        },
        status: res!.status
    });
    
}