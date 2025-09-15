import { apiRequest } from "@/libs/apiClient";
import { NextRequest, NextResponse } from "next/server";
import { ServerSideResponse } from "@/types/Global";
import { CreateCompetitionRequest, UpdateCompetitionRequest } from "@/types/Competition/Requests";
import { CreateCompetitionResponse, UpdateCompetitionResponse } from "@/types/Competition/Responses";
import { Competition } from "@/types/Competition";

export async function GET() {
    let res;
    try {
        res = await apiRequest<ServerSideResponse<Competition>>("/Competition", {
            method: "GET"
        });
    } catch {
        return NextResponse.json(
            { message: "Erro ao buscar competição.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json(res.data, { status: res.status });
}

export async function POST(req: NextRequest) {
    const body = await req.json() as CreateCompetitionRequest;
    let res;
    try {
        res = await apiRequest<ServerSideResponse<CreateCompetitionResponse>>("/Competition", {
            method: "POST",
            data: body
        });
    } catch {
        return NextResponse.json(
            { message: "Erro ao criar competição.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json(res.data, { status: res.status });
}

export async function PUT(req: NextRequest) {
    const body = await req.json() as UpdateCompetitionRequest;
    let res;
    try {
        res = await apiRequest<ServerSideResponse<UpdateCompetitionResponse>>("/Competition", {
            method: "PUT",
            data: body
        });
    } catch {
        return NextResponse.json(
            { message: "Erro ao atualizar competição.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json(res.data, { status: res.status });
}
