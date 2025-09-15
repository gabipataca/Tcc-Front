import { apiRequest } from "@/libs/apiClient";
import { EditExerciseRequest } from "@/types/Exercise/Requests";
import { Exercise } from "@/types/Exercise";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    let res;
    try {
        res = await apiRequest<ServerSideResponse<void>>(`/Exercise/${params.id}`, {
            method: "DELETE"
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao deletar exercício.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(res.data, { status: res.status });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json() as EditExerciseRequest;
    let res;
    try {
        res = await apiRequest<ServerSideResponse<Exercise>>(`/Exercise/${params.id}`, {
            method: "PUT",
            data: body
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao atualizar exercício.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(res.data, { status: res.status });
}
