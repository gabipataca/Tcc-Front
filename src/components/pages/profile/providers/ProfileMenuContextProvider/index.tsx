"use client";

import { FC, useState } from "react";
import { ProfileMenuContext } from "../../contexts/ProfileMenuContext";
import { ProfileMenuContextProviderProps } from "./types";
import { ProfileMenuType } from "../../contexts/ProfileMenuContext/types";




const ProfileMenuContextProvider: FC<ProfileMenuContextProviderProps> = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState<ProfileMenuType>("Exercise");


    const toggleMenu = (menu: ProfileMenuType) => {
        setActiveMenu(menu);
    }

    return (
        <ProfileMenuContext.Provider value={{ activeMenu, toggleMenu }}>
            {children}
        </ProfileMenuContext.Provider>
    );
}


export default ProfileMenuContextProvider;