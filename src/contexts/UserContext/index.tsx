"use client"

import { User } from "@/types/User";
import React, { createContext, useContext, useState } from "react";
import { UserContextProviderProps, UserContextType } from "./types";

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);



    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}


export const useUser = () => {
    const context = useContext(UserContext);

    if(context == null) {
        throw new Error("You are not inside the context scope");
    }

    return context;
}