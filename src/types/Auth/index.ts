import { User } from "../User";



/**
 * Represents the properties extracted from a user's authentication token.
 */
export interface UserTokenProperties {
    /**
     * The primary security identifier (SID) of the user.
     */
    primarysid: string;

    /**
     * The unique identifier (JWT ID) for the token.
     */
    jti: string;

    /**
     * The user's role as defined in the User type.
     */
    role: User["role"];
}