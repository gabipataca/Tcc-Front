import { FC } from "react";

interface SkeletonProps {
    className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({ className = "" }) => {
    return (
        <div
            className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-shimmer ${className}`}
        />
    );
};

export const StatsCardSkeleton: FC = () => {
    return (
        <div className="bg-white border border-[#e9edee] shadow-sm rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-5 w-5 rounded" />
            </div>
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-4 w-full" />
        </div>
    );
};

export default Skeleton;
