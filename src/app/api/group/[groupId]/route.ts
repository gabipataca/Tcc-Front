import { apiRequest } from "@/libs/apiClient";
import { UpdateGroupRequest } from "@/types/Group/Requests";
import { GroupResponse, UpdateGroupResponse } from "@/types/Group/Responses";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: Promise<{ groupId: string }> }) {
    const { groupId } = await params;

    let res;

    try {
        res = await apiRequest<GroupResponse>(`/Group/${groupId}`, {
            method: "GET",
            cookies: req.cookies.toString()
        });
    } catch(exc) {
        return NextResponse.json(
            { message: "Erro ao obter grupo.", status: 500 },
            { status: 500 },
        );
    }

    return NextResponse.json({
        data: res.data,
        status: res.status,
    } satisfies ServerSideResponse<GroupResponse>, { status: res.status });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ groupId: string }> }) {
    const { groupId } = await params;
    const body = await req.json() as UpdateGroupRequest;
    let res;
    try {
        res = await apiRequest<UpdateGroupResponse>(`/Group/${groupId}`, {
            method: "PUT",
            data: body,
            cookies: req.cookies.toString()
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao atualizar grupo.", status: 500 },
            { status: 500 },
        );
    }

    return NextResponse.json({
        data: res.data,
        status: res.status,
    } satisfies ServerSideResponse<UpdateGroupResponse>, { status: res.status });
}
