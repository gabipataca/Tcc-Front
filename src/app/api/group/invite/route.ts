import { NextRequest, NextResponse } from "next/server";
import { apiRequest } from "@/libs/apiClient";
import { InviteUserToGroupRequest } from "@/types/Group/Requests";
import { ServerSideResponse } from "@/types/Global";
import { InviteUserToGroupResponse } from "@/types/Group/Responses";
import { GroupInvitation } from "@/types/Group";

export async function POST(req: NextRequest) {
    const body = (await req.json()) as InviteUserToGroupRequest;
    let res;
    try {
        res = await apiRequest<
            InviteUserToGroupResponse,
            InviteUserToGroupRequest
        >("/Group/invite", {
            method: "POST",
            data: body,
            cookies: req.cookies.toString(),
        });
    } catch {
        return NextResponse.json(
            { message: "Erro ao enviar convite para o usuário.", status: 500 },
            { status: 500 }
        );
    }
    
    return NextResponse.json(
        {
            data: res.data,
            status: res.status,
        } satisfies ServerSideResponse<InviteUserToGroupResponse>,
        { status: res.status }
    );
}

export const GET = async (req: NextRequest) => {
    let res;
    try {
        res = await apiRequest<GroupInvitation[]>("/Group/invite", {
            method: "GET",
            cookies: req.cookies.toString(),
        });
    } catch {
        return NextResponse.json(
            { message: "Erro ao buscar convites para o grupo.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json(
        {
            data: res.data,
            status: res.status,
        } satisfies ServerSideResponse<GroupInvitation[]>,
        { status: res.status }
    );
};
