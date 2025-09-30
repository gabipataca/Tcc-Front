import { apiRequest } from "@/libs/apiClient";
import { EditExerciseRequest } from "@/types/Exercise/Requests";
import { Exercise } from "@/types/Exercise";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    let res;
    const exerciseId = (await params).id;
    try {
        res = await apiRequest<ServerSideResponse<void>>(`/Exercise/${exerciseId}`, {
            method: "DELETE",
            cookies: req.cookies.toString()
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao deletar exercício.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(res.data, { status: res.status });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    const body = await req.json() as EditExerciseRequest;
    let res;
    const exerciseId = (await params).id;
    try {
        res = await apiRequest<ServerSideResponse<Exercise>>(`/Exercise/${exerciseId}`, {
            method: "PUT",
            data: body,
            cookies: req.cookies.toString()
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao atualizar exercício.", status: 500 },
            { status: 500 }
        );
    }

    console.log(res.data);

    return NextResponse.json(res.data, { status: res.status });
}
