"use client";

import { useUser } from "@/contexts/UserContext";
import { useMemo } from "react";
import AdminDashboard from "../_modules/AdminDashboard";
import TeacherDashboard from "../_modules/TeacherDashboard";
import StudentDashboard from "../_modules/StudentDashboard";

/**
 * Custom hook that selects the appropriate dashboard component based on the current user's role.
 *
 * @returns An object containing the dashboard component to render for the current user.
 */
const useProfile = () => {
    const { user } = useUser();

    /**
     * Memoized value that determines which dashboard component to render
     * according to the user's role (Admin, Teacher, Student).
     */
    const ProfileToRender = useMemo(() => {
        switch (user?.role) {
            case "Admin":
                return AdminDashboard;
            case "Teacher":
                return TeacherDashboard;
            case "Student":
                return StudentDashboard;
            default:
                return null;
        }
    }, [user]);

    return {
        ProfileToRender,
    };
};

export default useProfile;
