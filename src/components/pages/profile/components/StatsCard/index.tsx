import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/_ui/Card";
import { FC } from "react";
import { StatsCardProps } from "./types";

const StatsCard: FC<StatsCardProps> = ({
    title,
    value,
    description,
    icon: Icon,
    trend,
}: StatsCardProps) => (
    <Card className="bg-white border-[#e9edee] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle className="text-xl font-medium text-[#3f3c40]">
                {title}
            </CardTitle>
            <Icon className="h-5 w-5 text-[#4F85A6]" />
        </CardHeader>
        <CardContent className="px-4 pb-4">
            <div className="text-3xl font-bold text-[#3f3c40]">{value}</div>
            <p className="text-sm text-[#4F85A6]">
                {trend && (
                    <span className="text-[#4F85A6] font-semibold">
                        +{trend}%
                    </span>
                )}{" "}
                {description}
            </p>
        </CardContent>
    </Card>
);

export default StatsCard;
