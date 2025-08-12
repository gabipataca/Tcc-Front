import { Dispatch, SetStateAction } from "react";

export type ProfileMenuType = "Main" | "Exercise" | "Competition";

export interface ProfileMenuContextType {
    activeMenu: ProfileMenuType;
    toggleMenu: (menu: ProfileMenuType) => void;
}