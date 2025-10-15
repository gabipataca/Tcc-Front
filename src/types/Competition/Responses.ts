import { Competition, CompetitionStatus } from ".";
import { CreateCompetitionRequest } from "./Requests";

/**
 * Represents the response for getting competitions.
 */
export interface GetCompetitionsResponse {
    /** List of competitions. */
    competitions: Competition[];
}

/**
 * Represents the response for creating a competition.
 */
export interface CompetitionResponse extends CreateCompetitionRequest {
    /** The unique identifier of the competition. */
    id: number;

    /**
     * Current status of the competition.
     */
    status: CompetitionStatus;

    /**
     * The end time of the competition (ISO string).
     */
    endTime: string;
}

/**
 * Represents the response for updating a competition.
 */
export interface UpdateCompetitionResponse
    extends Omit<CompetitionResponse, "exerciseIds"> {}
