import { Competition } from ".";
import { CreateCompetitionRequest } from "./Requests";



export interface GetCompetitionsResponse {
    competitions: Competition[];
}


export interface CreateCompetitionResponse extends CreateCompetitionRequest {
    id: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateCompetitionResponse extends Omit<CreateCompetitionResponse, "exerciseIds"> {

}