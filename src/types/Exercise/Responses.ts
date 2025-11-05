import { Exercise, JudgeResponseEnum } from ".";
import { PagedResult } from "../Global";



export interface ExerciseSubmissionResponse {
    id: number;
    exerciseId: number;
    groupId: number;
    accepted: boolean;
    judgeResponse: JudgeResponseEnum;
}


export type GetExercisesResponse = PagedResult<Exercise>;