import { apiRequest } from "@/libs/apiClient";
import { LogoutUserResponse } from "@/types/Auth/Responses";
import { ServerSideResponse } from "@/types/Global";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
    const cookie = await cookies();
    const token = cookie.get("CompetitionAuthToken")?.value || null;

    if(token == null) {
        return NextResponse.json(
            {
                status: 403,
                message: "Você não está autenticado.",
            } satisfies ServerSideResponse<LogoutUserResponse>,
            {
                status: 403,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    let res: AxiosResponse<LogoutUserResponse> | null = null;

    try {
        res = await apiRequest<LogoutUserResponse>("/Auth/logout", {
            method: "GET",
            cookies: {
                CompetitionAuthToken: token,
            },
        });
    }
    catch(exc) {
        console.error(exc);
        console.error(res!.data);

        return NextResponse.json(
            {
                ...res?.data,
                message: "Erro ao deslogar usuário.",
                error: "Erro desconhecido.",
                status: 500
            } satisfies ServerSideResponse<LogoutUserResponse>,
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    cookie.delete("CompetitionAuthToken");

    return NextResponse.json(
        {
            message: "Usuário deslogado com sucesso.",
            data: undefined,
            status: 200,
        } satisfies ServerSideResponse<LogoutUserResponse>,
        {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        }
    );
    
}