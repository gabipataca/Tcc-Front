"use client"

import { User } from "@/types/User";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContextProviderProps, UserContextType } from "./types";

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [initialized, setInitialized] = useState(false);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        if(typeof document !== "undefined" && localStorage) {
            let storedUser = localStorage.getItem("user");

            if(!initialized) {
                storedUser = storedUser ?? null;
                if(storedUser == null) {
                    setUser(null);
                } else {
                    setUser(JSON.parse(storedUser));
                }
                setInitialized(true);
                return;
            }

            if(initialized && user != null) {
                localStorage.setItem("user", JSON.stringify(user));
                return;
            }

            

            if(initialized && storedUser && user == null) {
                localStorage.removeItem("user");
                return;
            }
        }
    }, [initialized, user]);



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