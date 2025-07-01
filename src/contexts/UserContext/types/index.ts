import { User } from "@/types/User";

export interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


export interface UserContextProviderProps {
    children: React.ReactNode;
}