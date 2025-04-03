import * as React from "react"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}
export const Progress = ({ value = 0, className, ...props }: ProgressProps) => (
  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted" {...props}>
    <div className="h-full bg-primary transition-all" style={{ width: `${value}%` }} />
  </div>
)
