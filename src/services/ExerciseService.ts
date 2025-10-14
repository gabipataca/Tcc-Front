import { apiRequest } from "@/libs/apiClient";
import { Exercise, ExerciseType } from "@/types/Exercise";
import {
    CreateExerciseRequest,
    EditExerciseRequest,
} from "@/types/Exercise/Requests";
import { GetExercisesResponse } from "@/types/Exercise/Responses";
import { ServerSideResponse } from "@/types/Global";

class ExerciseService {
    static async getExercises(
        page: number,
        pageSize: number,
        search: string,
        exerciseType: ExerciseType | null,
        abortSignal: AbortSignal
    ): Promise<ServerSideResponse<GetExercisesResponse>> {
        const response = await apiRequest<
            ServerSideResponse<GetExercisesResponse>
        >(`/api/exercise`, {
            method: "GET",
            params: {
                page,
                pageSize,
                search,
                exerciseType,
            },
            signal: abortSignal,
        });

        return response.data;
    }

    static async createExercise(
        exercise: FormData
    ): Promise<ServerSideResponse<Exercise>> {
        const response = await apiRequest<ServerSideResponse<Exercise>>(
            `/api/exercise`,
            {
                method: "POST",
                data: exercise,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    }

    static async deleteExercise(id: number): Promise<ServerSideResponse<void>> {
        const response = await apiRequest<ServerSideResponse<void>>(
            `/api/exercise/${id}`,
            {
                method: "DELETE",
            }
        );

        return response.data;
    }

    static async updateExercise(exercise: FormData): Promise<Exercise> {
        const exerciseId = exercise.get("id");

        const response = await apiRequest<Exercise>(
            `/api/exercise/${exerciseId}`,
            {
                method: "PUT",
                data: exercise,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    }
}

export default ExerciseService;
