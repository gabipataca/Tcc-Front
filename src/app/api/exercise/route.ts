import { apiRequest } from "@/libs/apiClient";
import { CreateExerciseRequest } from "@/types/Exercise/Requests";
import { GetExercisesResponse } from "@/types/Exercise/Responses";
import { Exercise, ExerciseType } from "@/types/Exercise";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search") || "";
    const exerciseType = searchParams.get("exerciseType") || null;

    let res;
    try {
        res = await apiRequest<GetExercisesResponse>("/Exercise", {
            method: "GET",
            params: { page, pageSize, search, exerciseType },
            cookies: req.cookies.toString(),
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao buscar exercícios.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            data: res.data,
            status: res.status,
        } satisfies ServerSideResponse<GetExercisesResponse>,
        { status: res.status }
    );
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    console.log("typeId: ", formData.get("exerciseTypeId"));

    const metadataPayload: Omit<CreateExerciseRequest, "pdfFile"> = {
        title: formData.get("title") as string,
        exerciseTypeId: Number(formData.get("exerciseTypeId") as ExerciseType),
        description: formData.get("description") as string,
        estimatedTime: Number(formData.get("estimatedTime")),
        judgeUuid: formData.get("judgeUuid") as string,
        inputs: JSON.parse(formData.get("inputs") as string),
        outputs: JSON.parse(formData.get("outputs") as string),
    }

    const backendPayload = new FormData();
    backendPayload.append("file", formData.get("pdfFile") as File);
    console.log(JSON.stringify(metadataPayload));
    backendPayload.append("metadata", JSON.stringify(metadataPayload));

    let res;
    try {
        res = await apiRequest<Exercise>("/Exercise", {
            method: "POST",
            data: backendPayload,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            cookies: req.cookies.toString(),
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao criar exercício.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            data: res.data,
            status: 201,
        } satisfies ServerSideResponse<Exercise>,
        { status: 201 }
    );
}
