import React, { ReactNode } from "react";

/**
 * Represents a navigation link in the Navbar component.
 */
export interface NavbarLink {
    /**
     * The display text for the navigation link.
     */
    label: string;

    /**
     * The URL or path the navigation link points to.
     */
    href: string;

    /**
     * (Optional) A ReactNode representing the icon to display alongside the label.
     */
    Icon: React.ComponentType;
}