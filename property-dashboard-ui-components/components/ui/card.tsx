import { cn } from "@/lib/utils"
import * as React from "react"

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
)
export const CardHeader = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />
export const CardContent = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />
export const CardTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} />
export const CardDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />
export const CardFooter = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />
