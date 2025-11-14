"use client";

import { useUser } from "@/contexts/UserContext";
import AuthService from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";



const Logout = () => {
    const { setUser } = useUser();
    const router = useRouter();

    const handleLogout = useCallback(async () => {
        await AuthService.logoutUser();
        setUser(null);

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 750);
        });
    }, [setUser]);

    useEffect(() => {
        handleLogout().then(() => {
            router.push("/login");
        });
    }, [handleLogout, router]);

    return null;
}

export default Logout;