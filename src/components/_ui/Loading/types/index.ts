export type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type LoadingVariant = 'spinner' | 'overlay' | 'dots' | 'bar';


export interface LoadingProps {
    variant?: LoadingVariant;
    size?: LoadingSize;
    className?: string;
    bgColor?: string;
    colorClass?: string;
    notAbsolute?: boolean;
};