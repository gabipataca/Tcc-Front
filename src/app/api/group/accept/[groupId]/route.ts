import { NextRequest, NextResponse } from "next/server";
import { apiRequest } from "@/libs/apiClient";
import { ServerSideResponse } from "@/types/Global";
import { AcceptGroupInvitationResponse } from "@/types/Group/Responses";

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ groupId: string }> }
) {
    const { groupId } = await context.params;
    let res;
    try {
        res = await apiRequest<
            AcceptGroupInvitationResponse
        >(`/Group/Accept/${groupId}`, {
            method: "PUT",
            cookies: req.cookies.toString(),
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao aceitar convite do grupo.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json({
        data: res.data,
        status: res.status,
    } satisfies ServerSideResponse<AcceptGroupInvitationResponse>, { status: res.status });
}
