"use client"

import type * as React from "react"
import { Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, ComposedChart } from "recharts"

interface ChartContainerProps {
  children: React.ReactNode
  data: any[]
  xAxisKey: string
  yAxisWidth?: number
  showAnimation?: boolean
}

export function ChartContainer({
  children,
  data,
  xAxisKey,
  yAxisWidth = 0,
  showAnimation = false,
}: ChartContainerProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey={xAxisKey} />
        <YAxis width={yAxisWidth} />
        {children}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

interface BarChartProps {
  dataKey: string
  fill: string
  opacity?: number
  className?: string
}

export function BarChart({ dataKey, fill, opacity = 1, className }: BarChartProps) {
  return <Bar dataKey={dataKey} fill={fill} opacity={opacity} className={className} />
}

export function ChartTooltip({ children }: { children?: React.ReactNode }) {
  return <Tooltip contentStyle={{ background: "white", border: "1px solid #ddd" }} />
}

export function ChartTooltipContent({ payload, label }: any) {
  if (!payload || payload.length === 0) {
    return null
  }

  return (
    <div className="p-2">
      <p className="font-bold">{label}</p>
      {payload.map((item: any) => (
        <p key={item.dataKey} className="text-sm">
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  )
}

