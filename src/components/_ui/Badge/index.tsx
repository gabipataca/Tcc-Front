import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/libs/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#4F85A6] text-white hover:bg-[#3f3c40]",
        secondary: "border-transparent bg-[#e9edee] text-[#3f3c40] hover:bg-[#e9edee]/80",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        outline: "border-[#9abbd6] text-[#4F85A6] bg-[#9abbd6]/10 hover:bg-[#9abbd6]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
