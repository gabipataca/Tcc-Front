import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/libs/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#4F85A6] text-white hover:bg-[#3f3c40]",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-[#4F85A6] bg-transparent text-[#4F85A6] hover:bg-[#9abbd6] hover:text-white",
        secondary: "bg-[#e9edee] text-[#3f3c40] hover:bg-[#e9edee]/80",
        ghost: "hover:bg-[#e9edee] hover:text-[#3f3c40] text-[#4F85A6]",
        link: "text-[#4F85A6] underline-offset-4 hover:underline",
        
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const ButtonAdm = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
ButtonAdm.displayName = "Button"

export { ButtonAdm, buttonVariants }
