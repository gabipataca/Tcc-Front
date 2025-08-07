export interface StatsCardProps {
  title: string
  value: number
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  trend?: number
}