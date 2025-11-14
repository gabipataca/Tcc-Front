/**
 * Interface representing the properties for the StatsCard component.
 */
export interface StatsCardProps {
    /**
     * The title displayed on the stats card.
     */
    title: string;
    /**
     * The main value shown on the card. Can be a number or a string.
     */
    value?: number | string;
    /**
     * A brief description or subtitle for the card.
     */
    description: string;
    /**
     * The icon component to be rendered on the card. Should be a React component accepting SVG props.
     */
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    /**
     * Optional trend value, such as percentage or difference, to indicate change.
     */
    trend?: number;
    /**
     * Optional click handler for the card.
     */
    onClick?: () => void;
    /**
     * Optional custom class name for styling the card.
     */
    className?: string;
}
