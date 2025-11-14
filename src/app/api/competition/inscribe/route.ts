import { apiRequest } from "@/libs/apiClient";
import { InscribeGroupInCompetitionRequest } from "@/types/Competition/Requests";
import { InscribeGroupInCompetitionResponse } from "@/types/Competition/Responses";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = (await request.json()) as InscribeGroupInCompetitionRequest;

    let res;

    try {
        res = await apiRequest<InscribeGroupInCompetitionResponse>(
            "/Competition/inscribe",
            {
                method: "POST",
                data: body,
                cookies: request.cookies.toString(),
            }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({
                message: "Erro ao inscrever grupo na competição.",
                status: 500,
            }),
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            data: res.data,
            status: res.status,
        } satisfies ServerSideResponse<InscribeGroupInCompetitionResponse>,
        { status: res.status }
    );
}
