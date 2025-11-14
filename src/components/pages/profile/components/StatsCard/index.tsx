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
    className,
}: StatsCardProps) => (
    <Card className={`bg-white border-[#e9edee] shadow-sm flex flex-col ${className}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle className="text-xl font-medium text-[#3f3c40]">
                {title}
            </CardTitle>
            <Icon className="h-5 w-5 text-[#4F85A6]" />
        </CardHeader>
        
        <CardContent className="px-4 pb-4 flex flex-col flex-grow">
           
            {value ? (

                <div className="text-3xl font-bold text-gray-800 min-h-[36px]">
                    {value}
                </div>
            ) : (
                <div className="min-h-[36px]"></div>
            )}
            
            <p className="text-sm text-[#4F85A6] mt-auto pt-2"> 
                {trend && (
                    <span className="text-[#4F85A6] font-semibold">
                        +{trend}%
                    </span>
                )}
                {description}
            </p>
        </CardContent>
    </Card>
);

export default StatsCard;