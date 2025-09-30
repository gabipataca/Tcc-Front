import { NextRequest, NextResponse } from "next/server";
import { apiRequest } from "@/libs/apiClient";
import { InviteUserToGroupRequest } from "@/types/Group/Requests";
import { ServerSideResponse } from "@/types/Global";
import { InviteUserToGroupResponse } from "@/types/Group/Responses";

export async function POST(req: NextRequest) {
    const body = (await req.json()) as InviteUserToGroupRequest;
    let res;
    try {
        res = await apiRequest<
            ServerSideResponse<InviteUserToGroupResponse>,
            InviteUserToGroupRequest
        >("/Group/Invite", {
            method: "POST",
            data: body,
            cookies: req.cookies.toString(),
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao enviar convite para o usuário.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json(res.data, { status: res.status });
}
