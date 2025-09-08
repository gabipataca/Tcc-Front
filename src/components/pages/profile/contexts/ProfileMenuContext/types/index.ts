export type ProfileMenuType =
    | "Main"
    | "Exercise"
    | "Competition"
    | "CreateSubscription"
    | "CreateCompetition";

export interface ProfileMenuContextType {
    activeMenu: ProfileMenuType;
    toggleMenu: (menu: ProfileMenuType) => void;
}
