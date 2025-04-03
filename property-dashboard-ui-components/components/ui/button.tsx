import { cn } from "@/lib/utils"
import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors", className)}
      ref={ref}
      {...props}
    />
  )
)
Button.displayName = "Button"
