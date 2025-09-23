import { apiRequest } from "@/libs/apiClient";
import { ServerSideResponse } from "@/types/Global";
import { GetUsersResponse } from "@/types/User/Responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search") || "";

    let res;
    try {
        res = await apiRequest<ServerSideResponse<GetUsersResponse>>("/User", {
            method: "GET",
            params: { page, pageSize, search },
            cookies: req.cookies.toString()
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao buscar usuários.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(res.data, { status: res.status });
}
