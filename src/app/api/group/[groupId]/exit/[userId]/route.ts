import { apiRequest } from "@/libs/apiClient";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ groupId: string, userId: string }> }) {
    const { groupId, userId } = await params;

    let res;

    try {
        res = await apiRequest<unknown>(`/Group/${groupId}/exit/${userId}`, {
            method: "DELETE",
            cookies: req.cookies.toString()
        });
    } catch(exc) {
        return NextResponse.json(
            { message: "Erro ao tentar deletar usuário do grupo.", status: 500 },
            { status: 500 },
        );
    }

    return NextResponse.json({
        data: res.data,
        status: res.status,
    } satisfies ServerSideResponse<unknown>, { status: res.status });
}