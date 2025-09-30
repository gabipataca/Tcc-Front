import { User } from ".";


/**
 * Represents the request to edit a user.
 */
export interface UserEditRequest extends Omit<User, "ra" | "joinYear" | "role" | "token"> {
    /** The status of the user (0 for inactive, 1 for active). */
    status: 0 | 1;
}
