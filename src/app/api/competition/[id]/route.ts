import { apiRequest } from "@/libs/apiClient";
import { UpdateCompetitionRequest } from "@/types/Competition/Requests";
import { UpdateCompetitionResponse } from "@/types/Competition/Responses";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const id = parseInt((await context.params).id);

    const body = (await req.json()) as UpdateCompetitionRequest;
    let res;
    try {
        res = await apiRequest<UpdateCompetitionResponse>(
            `/Competition/${id}`,
            {
                method: "PUT",
                data: body,
                cookies: req.cookies.toString(),
            }
        );
    } catch {
        return NextResponse.json(
            { message: "Erro ao atualizar competição.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json(
        {
            data: res.data,
            status: res.status,
        } satisfies ServerSideResponse<UpdateCompetitionResponse>,
        { status: res.status }
    );
}
