import { apiRequest } from "@/libs/apiClient";
import { CreateExerciseRequest } from "@/types/Exercise/Requests";
import { GetExercisesResponse } from "@/types/Exercise/Responses";
import { Exercise } from "@/types/Exercise";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search") || "";

    let res;
    try {
        res = await apiRequest<ServerSideResponse<GetExercisesResponse>>("/Exercise", {
            method: "GET",
            params: { page, pageSize, search },
            cookies: req.cookies.toString()
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao buscar exercícios.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(res.data, { status: res.status });
}

export async function POST(req: NextRequest) {
    const body = await req.json() as CreateExerciseRequest;
    let res;
    try {
        res = await apiRequest<ServerSideResponse<Exercise>>("/Exercise", {
            method: "POST",
            data: body,
            cookies: req.cookies.toString()
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao criar exercício.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(res.data, { status: res.status });
}
