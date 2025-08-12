import { createContext, useContext } from "react";
import { ProfileMenuContextType } from "./types";


export const ProfileMenuContext = createContext<ProfileMenuContextType | null>(null);


export const useProfileMenuContext = () => {
    const context = useContext(ProfileMenuContext);
    if (context == null) {
        throw new Error("useProfileMenuContext must be used within a ProfileMenuProvider");
    }

    return context!;
}