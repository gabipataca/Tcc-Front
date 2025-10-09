import React from "react";

/**
 * Props for the Button component.
 */
export interface ButtonProps {
    
    className?: string;

    /**
     * The content to be displayed inside the button.
     */
    children: React.ReactNode;

    /**
     * Function to handle click events on the button.
     * @param e - The mouse event.
     */
    onClick?: (e?: React.MouseEvent) => void;

    /**
     * ARIA role attribute for the button.
     */
    role?: React.AriaRole;

    /**
     * The type of the button, either "button" or "link".
     */
    type?: "button" | "link";

    /**
     * The href attribute for the link, if the button type is "link".
     */
    linkHref?: string;

    /**
     * The variant of the button, either "primary" or "secondary".
     */
    variant?: "primary" | "secondary" | "success" | "light-success" | "success-outline" | "destructive" | "outline" | "ghost";

    /**
     * Whether the button should have rounded corners.
     */
    rounded?: boolean;

    /**
     * The size of the button.
     */
    size?: "default" | "sm" | "lg" | "icon";

    /**
     * Whether the button should take up the full width of its container.
     */
    fullWidth?: boolean;

    /**
     * Whether the button is disabled.
     */
    disabled?: boolean;

    /**
     * Whether to show a loading indicator inside the button.
     */
    loading?: boolean;
    
}
