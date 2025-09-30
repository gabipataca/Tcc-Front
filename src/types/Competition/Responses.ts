import { Competition } from ".";
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
export interface CreateCompetitionResponse extends CreateCompetitionRequest {
    /** The unique identifier of the competition. */
    id: number;
}


/**
 * Represents the response for updating a competition.
 */
export interface UpdateCompetitionResponse extends Omit<CreateCompetitionResponse, "exerciseIds"> {}