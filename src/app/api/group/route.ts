import { apiRequest } from "@/libs/apiClient";
import { ServerSideResponse } from "@/types/Global";
import { CreateGroupRequest } from "@/types/Group/Requests";
import { CreateGroupResponse, GetGroupsResponse } from "@/types/Group/Responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search") || "";

    let res;
    try {
        res = await apiRequest<ServerSideResponse<GetGroupsResponse>>("/Group", {
            method: "GET",
            params: { page, pageSize, search }
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao buscar grupos.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(res.data, { status: res.status });
}

export async function POST(req: NextRequest) {
    const body = await req.json() as CreateGroupRequest;
    let res;
    try {
        res = await apiRequest<ServerSideResponse<CreateGroupResponse>>("/Group", {
            method: "POST",
            data: body
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao criar grupo.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(res.data, { status: res.status });
}
