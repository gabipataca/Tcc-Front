import { NextRequest, NextResponse } from "next/server";
import { apiRequest } from "@/libs/apiClient";
import { UserEditRequest } from "@/types/User/Requests";
import { User } from "@/types/User";

export async function PUT(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
    const { userId } = await context.params;
    const body = await req.json() as UserEditRequest;
    let res;
    try {
        res = await apiRequest<User>(`/User/${userId}`, {
            method: "PUT",
            data: body,
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao atualizar usuário.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json(res.data, { status: res.status });
}
