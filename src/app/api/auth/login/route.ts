import { apiRequest } from "@/libs/apiClient";
import { LoginUserRequest } from "@/types/Auth/Requests";
import { LoginUserResponse } from "@/types/Auth/Responses";
import { ServerSideResponse } from "@/types/Global";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    const cookie = await cookies();
    const token = cookie.get("CompetitionAuthToken")?.value || null;

    if(token != null) {
        return NextResponse.json(
            {
                status: 403,
                message: "Você já está autenticado.",
            } satisfies ServerSideResponse<LoginUserResponse>,
            {
                status: 403,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    const body = await req.json() as LoginUserRequest;

    let res: AxiosResponse<LoginUserResponse> | null = null;

    try {
        res = await apiRequest<LoginUserResponse, LoginUserRequest>("/Auth/Login", {
            method: "POST",
            data: body,
        });
    }
    catch(exc) {
        console.error(exc);
        console.error(res?.data);

        return NextResponse.json(
            {
                ...res?.data,
                message: "Erro ao autenticar usuário.",
                error: "Erro desconhecido.",
                status: 500
            } satisfies ServerSideResponse<LoginUserResponse>,
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    const data = res.data;

    cookie.set({
        name: "CompetitionAuthToken",
        value: data.token,
        httpOnly: true,
        expires: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
        secure: true,
        sameSite: "lax",
    });

    return NextResponse.json(
        {
            message: "Usuário autenticado com sucesso.",
            data,
            status: res.status
        } satisfies ServerSideResponse<LoginUserResponse>,
        {
            headers: {
                "Content-Type": "application/json"
            },
            status: res.status
        }
    );
    
}