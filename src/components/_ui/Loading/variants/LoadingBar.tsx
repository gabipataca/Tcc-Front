import React from "react";
import clsx from "clsx";

/**
 * Linear loading bar for top or bottom of the screen.
 */

type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const barHeightMap: Record<LoadingSize, string> = {
    xs: 'h-0.5',
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
    xl: 'h-3',
};

/**
 * Linear loading bar for top or bottom of the screen, with predefined heights.
 */
const LoadingBar: React.FC<{ className?: string; colorClass?: string; size?: LoadingSize }> = ({ className, colorClass, size = 'sm' }) => (
    <div className={clsx("w-full overflow-hidden bg-gray-200 relative", barHeightMap[size], className)} aria-label="Loading">
        <div
            className={clsx(
                "absolute left-0 top-0 h-full animate-loading-bar",
                colorClass || "bg-blue-600"
            )}
            style={{ width: "40%" }}
        />
    </div>
);

export default LoadingBar;
