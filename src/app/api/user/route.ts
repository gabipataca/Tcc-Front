import { apiRequest } from "@/libs/apiClient";
import { ServerSideResponse } from "@/types/Global";
import { GetUsersResponse } from "@/types/User/Responses";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || null;

    let res: AxiosResponse<GetUsersResponse>;
    try {
        res = await apiRequest<GetUsersResponse>("/User", {
            method: "GET",
            params: { page, pageSize, search, role },
            cookies: req.cookies.toString()
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao buscar usuários.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json({
        data: res.data,
        status: res.status,
    } satisfies ServerSideResponse<GetUsersResponse>, { status: res.status });
}
