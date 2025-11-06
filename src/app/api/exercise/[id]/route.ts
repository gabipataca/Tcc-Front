import { apiRequest } from "@/libs/apiClient";
import { EditExerciseRequest } from "@/types/Exercise/Requests";
import { Exercise, ExerciseType } from "@/types/Exercise";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    let res;
    const exerciseId = (await params).id;
    try {
        res = await apiRequest<ServerSideResponse<void>>(
            `/Exercise/${exerciseId}`,
            {
                method: "DELETE",
                cookies: req.cookies.toString(),
            }
        );
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao deletar exercício.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(res.data, { status: res.status });
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const exerciseId = (await params).id;
    const formData = await req.formData();

    const metadataPayload: Omit<EditExerciseRequest, "pdfFile"> = {
        title: formData.get("title") as string,
        // @ts-expect-error - Number conversion to ExerciseType
        exerciseTypeId: Number(formData.get("exerciseTypeId") as ExerciseType),
        description: formData.get("description") as string,
        estimatedTime: Number(formData.get("estimatedTime")),
        judgeUuid: formData.get("judgeUuid") as string,
        inputs: JSON.parse(formData.get("inputs") as string),
        outputs: JSON.parse(formData.get("outputs") as string),
    };

    const backendPayload = new FormData();

    if (formData.has("pdfFile") && formData.get("pdfFile") instanceof File) {
        backendPayload.append("file", formData.get("pdfFile") as File);
    }

    backendPayload.append("metadata", JSON.stringify(metadataPayload));

    let res;
    try {
        res = await apiRequest<Exercise>(`/Exercise/${exerciseId}`, {
            method: "PUT",
            data: backendPayload,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            cookies: req.cookies.toString(),
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao atualizar exercício.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            data: res.data,
            status: res.status,
        } satisfies ServerSideResponse<Exercise>,
        { status: res.status }
    );
}
