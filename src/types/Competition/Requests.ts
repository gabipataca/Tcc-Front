

export interface CreateCompetitionRequest {
    startTime: Date;
    endTime: Date;
    startInscriptions: Date;
    endInscriptions: Date;
    stopRanking: Date;
    blockSubmissions?: Date;
    submissionPenalty: string; // TimeSpan can be represented as string (e.g., "00:30:00")
    maxExercises: number;
    maxSubmissionSize: number;
    exerciseIds: number[];
}


export interface UpdateCompetitionRequest extends Omit<CreateCompetitionRequest, 'exerciseIds'> {
    id: number;
}