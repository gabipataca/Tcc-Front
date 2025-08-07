import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { ProtectedRouteProps } from "./types";

const ProtectedRoute: FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if(!user || !allowedRoles.includes(user.role)) {
            router.replace("/login");
        }
    }, [user, allowedRoles, router]);

    if(!user || !allowedRoles.includes(user.role)) {
        return null;
    }

    return children;
}


export default ProtectedRoute;