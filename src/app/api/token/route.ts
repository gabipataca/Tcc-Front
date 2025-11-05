import { apiRequest } from "@/libs/apiClient";
import { ServerSideResponse } from "@/types/Global";
import { GetCurrentTokenResponse, UpdateCurrentTokenResponse } from "@/types/Token/Responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    let res;
    try {
        res = await apiRequest<GetCurrentTokenResponse>("/Token", {
            method: "GET",
            cookies: req.cookies.toString()
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao buscar grupos.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json({
        data: res.data,
        status: res.status,
    } satisfies ServerSideResponse<GetCurrentTokenResponse>, { status: res.status });
}

export async function PUT(req: NextRequest) {
    let res;
    try {
        res = await apiRequest<UpdateCurrentTokenResponse>("/Token", {
            method: "PUT",
            cookies: req.cookies.toString()
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao criar grupo.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json({
        data: res.data,
        status: res.status,
    } satisfies ServerSideResponse<UpdateCurrentTokenResponse>, { status: res.status });
}
