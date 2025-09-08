export interface StatsCardProps {
    title: string;
    value: number | string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    trend?: number;
    onClick?: () => void;
    className?: string;
}
