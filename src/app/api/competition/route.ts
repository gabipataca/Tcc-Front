import { apiRequest } from "@/libs/apiClient";
import { NextRequest, NextResponse } from "next/server";
import { ServerSideResponse } from "@/types/Global";
import { CreateCompetitionRequest, UpdateCompetitionRequest } from "@/types/Competition/Requests";
import { UpdateCompetitionResponse } from "@/types/Competition/Responses";
import { Competition } from "@/types/Competition";

export async function GET(req: NextRequest) {
    let res;
    try {
        res = await apiRequest<Competition>("/Competition", {
            method: "GET",
            cookies: req.cookies.toString()
        });
    } catch {
        return NextResponse.json(
            { message: "Erro ao buscar competição.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json({
        data: res.data,
        status: res.status,
    } satisfies ServerSideResponse<Competition>, { status: res.status });
}

export async function POST(req: NextRequest) {
    const body = await req.json() as CreateCompetitionRequest;
    let res;
    try {
        res = await apiRequest<Competition>("/Competition", {
            method: "POST",
            data: body,
            cookies: req.cookies.toString()
        });
    } catch {
        return NextResponse.json(
            { message: "Erro ao criar competição.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json({
        data: res.data,
        status: res.status,
    } satisfies ServerSideResponse<Competition>, { status: res.status });
}

