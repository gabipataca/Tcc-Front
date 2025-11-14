import React from "react";
import clsx from "clsx";

/**
 * Animated loading dots for inline or minimal loading indication.
 */

type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const dotSizeMap: Record<LoadingSize, string> = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
};

/**
 * Animated loading dots for inline or minimal loading indication, with predefined sizes.
 */
const LoadingDots: React.FC<{ className?: string; colorClass?: string; size?: LoadingSize }> = ({ className, colorClass, size = 'md' }) => (
    <span className={clsx("inline-flex gap-1", className)} aria-label="Loading">
        <span className={clsx("block rounded-full animate-bounce", dotSizeMap[size], colorClass || "bg-blue-600")}></span>
        <span className={clsx("block rounded-full animate-bounce delay-150", dotSizeMap[size], colorClass || "bg-blue-600")}></span>
        <span className={clsx("block rounded-full animate-bounce delay-300", dotSizeMap[size], colorClass || "bg-blue-600")}></span>
        <span className="sr-only">Loading...</span>
    </span>
);

export default LoadingDots;
