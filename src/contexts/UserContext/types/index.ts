import { User } from "@/types/User";

/**
 * Represents the context type for user-related state management.
 */
export interface UserContextType {
    /**
     * The current user object or null if not authenticated.
     */
    user: User | null;

    /**
     * Function to update the user state.
     */
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


/**
 * Props for the UserContext provider component.
 */
export interface UserContextProviderProps {
    /**
     * The React node(s) that will be wrapped by the provider.
     */
    children: React.ReactNode;
}