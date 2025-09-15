import React from "react";
import clsx from "clsx";

/**
 * Generic Loading spinner component.
 * Uses only project dependencies. Accessible and customizable via props.
 * @param {object} props - Component props
 * @param {string} [props.className] - Optional additional class names
 */
const Loading: React.FC<{ className?: string }> = ({ className }) => (
    <div
        className={clsx(
            "absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center",
            className
        )}
        role="status"
        aria-label="Loading"
    >
        <svg
            className="animate-spin h-8 w-8 text-blue-600"
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

export default Loading;
