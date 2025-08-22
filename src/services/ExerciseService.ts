import { apiRequest } from "@/libs/apiClient";
import { Exercise } from "@/types/Exercise";
import { CreateExerciseRequest } from "@/types/Exercise/Requests";
import { GetExercisesResponse } from "@/types/Exercise/Responses";
import { ServerSideResponse } from "@/types/Global";

class ExerciseService {
    static async getExercises(
        page: number,
        pageSize: number,
        search: string,
        abortSignal: AbortSignal,
    ): Promise<ServerSideResponse<GetExercisesResponse>> {
        const response = await apiRequest<
            ServerSideResponse<GetExercisesResponse>
        >(`/api/exercises`, {
            method: "GET",
            params: {
                page,
                pageSize,
                search,
            },
            signal: abortSignal,
        });

        return response.data;
    }


    static async createExercise(
        exercise: CreateExerciseRequest
    ): Promise<ServerSideResponse<Exercise>> {
        const response = await apiRequest<
            ServerSideResponse<Exercise>
        >(`/api/exercises`, {
            method: "POST",
            data: exercise,
        });

        return response.data;
    }


    static async deleteExercise(id: number): Promise<ServerSideResponse<void>> {
        const response = await apiRequest<
            ServerSideResponse<void>
        >(`/api/exercises/${id}`, {
            method: "DELETE",
        });

        return response.data;
    }

}

export default ExerciseService;
