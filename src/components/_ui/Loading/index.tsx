import React, { FC } from "react";
import clsx from "clsx";
import LoadingOverlay from "./variants/LoadingOverlay";
import LoadingDots from "./variants/LoadingDots";
import LoadingBar from "./variants/LoadingBar";
import { LoadingProps } from "./types";
import { sizeMap } from "./constants";

/**
 * Generic Loading component that supports multiple variants.
 * @param {object} props - Component props
 * @param {LoadingVariant} [props.variant] - The loading variant to render
 * @param {LoadingSize} [props.size] - The size of the loading animation
 * @param {string} [props.className] - Additional class names
 * @param {string} [props.bgColor] - Background color (for overlay)
 * @param {string} [props.colorClass] - Color class (for dots/bar)
 */
const Loading: FC<LoadingProps> = ({
    variant = "spinner",
    size = "md",
    className,
    bgColor,
    colorClass,
    notAbsolute = false,
}) => {
    if (variant === "overlay") {
        return (
            <LoadingOverlay
                className={className}
                bgColor={bgColor}
                size={size}
            />
        );
    }
    if (variant === "dots") {
        return (
            <LoadingDots
                className={className}
                colorClass={colorClass}
                size={size}
            />
        );
    }
    if (variant === "bar") {
        return (
            <LoadingBar
                className={className}
                colorClass={colorClass}
                size={size}
            />
        );
    }
    // Default spinner
    return (
        <div
            className={clsx(
                `${(notAbsolute ? "" : "absolute")} top-0 bottom-0 left-0 right-0 flex items-center justify-center z-40`,
                className
            )}
            role="status"
            aria-label="Loading"
        >
            <svg
                className={clsx(`animate-spin ${(colorClass) ? colorClass : "text-blue-600"}`, sizeMap[size])}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export { LoadingOverlay, LoadingDots, LoadingBar };
export default Loading;
