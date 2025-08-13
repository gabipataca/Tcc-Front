import { apiRequest } from "@/libs/apiClient";
import { RegisterUserRequest } from "@/types/Auth/Requests";
import { RegisterUserResponse } from "@/types/Auth/Responses";
import { ServerSideResponse } from "@/types/Global";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    const cookie = await cookies();
    const token = cookie.get("token")?.value || null;

    if(token != null) {
        return NextResponse.json(
            {
                message: "Você já está autenticado.",
                status: 403,
            } satisfies ServerSideResponse<RegisterUserResponse>,
            {
                status: 403,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    const body = await req.json() as RegisterUserRequest;

    let res: AxiosResponse<RegisterUserResponse> | null = null;

    try {
        res = await apiRequest<RegisterUserResponse, RegisterUserRequest>("/Auth/Register", {
            method: "POST",
            data: body,
        })
    }
    catch(exc) {
        console.error(exc);
        console.error(res?.data);
        return NextResponse.json(
            {
                data: res?.data,
                message: "Erro ao registrar usuário.",
                error: "Erro desconhecido.",
                status: 500,
            } satisfies ServerSideResponse<RegisterUserResponse>,
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    const data = res.data;

    cookie.set("token", data.token);

    return NextResponse.json(
        {
            message: "Usuário registrado com sucesso.",
            data,
            status: res.status,
        } satisfies ServerSideResponse<RegisterUserResponse>,
        {
            headers: {
                "Content-Type": "application/json"
            },
            status: res.status
        },
    );

}