import { JudgeResponseEnum } from ".";



export interface ExerciseSubmissionResponse {
    id: number;
    exerciseId: number;
    groupId: number;
    accepted: boolean;
    judgeResponse: JudgeResponseEnum;
}