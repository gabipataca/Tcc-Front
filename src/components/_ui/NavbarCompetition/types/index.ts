import { UserRole } from "@/types/User";
import { LucideIcon } from "lucide-react";

export interface NavbarLink {
    label: string;
    href: string;
    Icon?: LucideIcon;
    roles: UserRole[];
}
