import { LucideIcon } from "lucide-react";

export interface NavbarLink {
    label: string;
    href: string;
    Icon?: LucideIcon;
}

export type UserRole = "admin" | "professor" | "aluno";
