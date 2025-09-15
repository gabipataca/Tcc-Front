

export interface CreateCompetitionRequest {
    startTime: Date;
    endTime: Date;
    startInscriptions: Date;
    endInscriptions: Date;
    stopRanking: Date;
    blockSubmissions?: Date;
    submissionPenalty: string; // TimeSpan pode ser representado como string (ex: "00:30:00")
    maxExercises: number;
    maxSubmissionSize: number;
    exerciseIds: number[];
}


export interface UpdateCompetitionRequest extends Omit<CreateCompetitionRequest, 'exerciseIds'> {
    id: number;
}