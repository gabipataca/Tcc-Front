import { apiRequest } from "@/libs/apiClient";
import { UpdateGroupRequest } from "@/types/Group/Requests";
import { UpdateGroupResponse } from "@/types/Group/Responses";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { groupId: string } }) {
    const body = await req.json() as UpdateGroupRequest;
    let res;
    try {
        res = await apiRequest<ServerSideResponse<UpdateGroupResponse>>(`/Group/${params.groupId}`, {
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

    return NextResponse.json(res.data, { status: res.status });
}
