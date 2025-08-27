import { User } from ".";

export interface UserEditRequest
    extends Omit<User, "ra" | "joinYear" | "role" | "token"> {
    status: 0 | 1;
}
