/**
 * Props for the ProtectedRoute component, which restricts access based on user roles.
 */
export interface ProtectedRouteProps {
    /**
     * Array of roles allowed to access the protected route.
     */
    allowedRoles: string[];

    /**
     * The React node(s) to render if access is permitted.
     */
    children: React.ReactNode;
}