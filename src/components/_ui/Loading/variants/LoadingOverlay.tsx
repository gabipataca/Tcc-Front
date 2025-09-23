import React from "react";
import clsx from "clsx";

/**
 * Loading overlay with a semi-transparent background.
 * Covers the entire parent container.
 */

type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const sizeMap: Record<LoadingSize, string> = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
};

/**
 * Loading overlay with a semi-transparent background and predefined sizes.
 * Covers the entire parent container.
 */
const LoadingOverlay: React.FC<{ className?: string; bgColor?: string; size?: LoadingSize }> = ({ className, bgColor, size = 'lg' }) => (
    <div
        className={clsx(
            "absolute inset-0 flex items-center justify-center z-50",
            bgColor || "bg-black bg-opacity-40 backdrop-blur-sm",
            className
        )}
        role="status"
        aria-label="Loading"
    >
        <svg
            className={clsx("animate-spin text-white", sizeMap[size])}
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

export default LoadingOverlay;
