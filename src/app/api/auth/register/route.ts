import { apiRequest } from "@/libs/apiClient";
import { RegisterUserRequest } from "@/types/Auth/Requests";
import { RegisterUserResponse } from "@/types/Auth/Responses";
import { ServerSideResponse } from "@/types/Global";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    const cookie = await cookies();
    cookie.delete("CompetitionAuthToken");
    const token = cookie.get("CompetitionAuthToken")?.value || null;

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
        });

        const data = res.data;

        cookie.set("CompetitionAuthToken", data.token);

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
                status: res.status,
            },
        );
    }
    catch(exc) {
        console.error("Registration error:", exc);
        
        const statusCode = res?.status || 500;
        
        return NextResponse.json(
            {
                data: res?.data,
                message: res?.data ? "Erro de validação" : "Erro ao registrar usuário.",
                error: "Erro no registro.",
                status: statusCode,
            } satisfies ServerSideResponse<RegisterUserResponse>,
            {
                status: statusCode,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

}