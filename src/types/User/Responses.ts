import { GenericUserInfo } from ".";
import { PagedResult } from "../Global";

/**
 * Represents the response for getting users.
 */
export type GetUsersResponse = PagedResult<GenericUserInfo>;
