import { apiRequest } from "@/libs/apiClient";
import { UpdateCompetitionRequest } from "@/types/Competition/Requests";
import { UpdateCompetitionResponse } from "@/types/Competition/Responses";
import { ServerSideResponse } from "@/types/Global";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles PUT requests to update an existing competition by its ID.
 *
 * @param req - The incoming Next.js request object containing the updated competition data.
 * @param context - Route context containing the competition ID parameter.
 * @returns A JSON response containing the updated competition data.
 *
 * @remarks
 * **URL Parameter:**
 * - `id`: The unique identifier of the competition to update
 *
 * **Request Body (UpdateCompetitionRequest):**
 * ```json
 * {
 *   "id": number,                        // Competition ID (must match URL param)
 *   "name": "string",                    // Competition name
 *   "description": "string",             // Competition description
 *   "startTime": "ISO date string",      // When competition starts
 *   "duration": "HH:mm:ss" | null,       // Competition duration
 *   "startInscriptions": "ISO date string" | null,
 *   "endInscriptions": "ISO date string" | null,
 *   "stopRanking": "ISO date string" | null,
 *   "blockSubmissions": "ISO date string" | null,
 *   "submissionPenalty": "HH:mm:ss" | null,
 *   "maxExercises": number | null,
 *   "maxMembers": number,
 *   "maxSubmissionSize": number,
 *   "exerciseIds": [number]
 * }
 * ```
 *
 * **Success Response (200):**
 * ```json
 * {
 *   "status": 200,
 *   "data": { ...updated competition details... }
 * }
 * ```
 *
 * **Error Response (500):**
 * - Server error when updating competition
 */
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const id = parseInt((await context.params).id);

    const body = (await req.json()) as UpdateCompetitionRequest;
    let res;
    try {
        res = await apiRequest<UpdateCompetitionResponse>(
            `/Competition/${id}`,
            {
                method: "PUT",
                data: body,
                cookies: req.cookies.toString(),
            }
        );
    } catch {
        return NextResponse.json(
            { message: "Erro ao atualizar competição.", status: 500 },
            { status: 500 }
        );
    }
    return NextResponse.json(
        {
            data: res.data,
            status: res.status,
        } satisfies ServerSideResponse<UpdateCompetitionResponse>,
        { status: res.status }
    );
}
