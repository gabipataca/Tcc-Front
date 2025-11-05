import { apiRequest } from "@/libs/apiClient";
import { ServerSideResponse } from "@/types/Global";
import { CreateGroupRequest } from "@/types/Group/Requests";
import {
    CreateGroupResponse,
    GetGroupsResponse,
    GroupResponse,
} from "@/types/Group/Responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search") || "";

    let res;
    try {
        res = await apiRequest<GetGroupsResponse>("/Group", {
            method: "GET",
            params: { page, pageSize, search },
            cookies: req.cookies.toString(),
        });
    } catch (exc) {
        return NextResponse.json(
            { message: "Erro ao buscar grupos.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            data: res.data,
            status: res.status,
        } satisfies ServerSideResponse<GetGroupsResponse>,
        { status: res.status }
    );
}

export async function POST(req: NextRequest) {
    const body = (await req.json()) as CreateGroupRequest;
    let res;
    console.log(body);
    try {
        res = await apiRequest<GroupResponse>(
            "/Group",
            {
                method: "POST",
                data: body,
                cookies: req.cookies.toString(),
            }
        );
    } catch (exc) {
        console.error(exc);
        return NextResponse.json(
            { message: "Erro ao criar grupo.", status: 500 },
            { status: 500 }
        );
    }

    return NextResponse.json({
        data: res.data,
        status: res.status,
    } satisfies ServerSideResponse<GroupResponse>, { status: res.status });
}
