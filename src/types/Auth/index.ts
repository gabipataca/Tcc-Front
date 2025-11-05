import { RoleClaimKey } from "@/constants/Auth";
import { User, UserRole } from "../User";

/**
 * Represents the claims extracted from a user's authentication token.
 */
export interface UserTokenPropertiesClaims {
    /**
     * The unique name of the user.
     * @remarks This corresponds to the user's email.
     */
    unique_name: string;
    /**
     * The primary security identifier (SID) of the user.
     */
    id: string;
    /**
     * The user's role, represented by a specific claim key.
     */
    [RoleClaimKey]: UserRole;
    /**
     * The unique identifier (JWT ID) for the token.
     */
    jti: string;
    /**
     * The expiration time of the token (Unix timestamp).
     */
    exp: number;
    /**
     * The issuer of the token.
     */
    iss: string;
    /**
     * The audience for the token.
     */
    aud: string;
}

/**
 * Represents the properties extracted from a user's authentication token.
 */
export interface UserTokenProperties {
    /**
     * The unique name of the user.
     */
    unique_name: string;

    /**
     * The primary security identifier (SID) of the user.
     */
    id: string;

    /**
     * The unique identifier (JWT ID) for the token.
     */
    jti: string;

    /**
     * The expiration time of the token (Unix timestamp).
     */
    exp: number;

    /**
     * The issuer of the token.
     */
    iss: string;

    /**
     * The audience for the token.
     */
    aud: string;

    /**
     * The user's role as defined in the User type.
     */
    role: User["role"];
}
