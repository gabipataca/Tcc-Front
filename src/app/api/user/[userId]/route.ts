import { NextRequest, NextResponse } from "next/server";
import { apiRequest } from "@/libs/apiClient";
import { UserEditRequest } from "@/types/User/Requests";
import { User } from "@/types/User";
import { ServerSideResponse } from "@/types/Global";

export async function PUT(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
    const { userId } = await context.params;
    const body = await req.json() as UserEditRequest;
    let res;
    try {
        res = await apiRequest<User>(`/User/${userId}`, {
            method: "PUT",
            data: body,
            cookies: req.cookies.toString()
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao atualizar usuário.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json({
        data: res.data,
        status: res.status,
    } satisfies ServerSideResponse<User>, { status: res.status });
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
    const { userId } = await context.params;
    let res;

    try {
        res = await apiRequest<void>(`/User/${userId}`, {
            method: "DELETE",
            cookies: req.cookies.toString()
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao deletar usuário.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json(res.data, { status: res.status });
}
