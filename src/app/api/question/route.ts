import { apiRequest } from "@/libs/apiClient";
import { GetQuestionsResponse } from "@/types/Question/Responses";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    
    let res;
    try {
        res = await apiRequest<GetQuestionsResponse>("/Question", {
            method: "GET",
            params: { page, pageSize },
            cookies: req.cookies.toString(),
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao buscar questões.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            data: res.data,
            status: res.status,
        } satisfies ServerSideResponse<GetQuestionsResponse>,
        { status: res.status }
    );
}
