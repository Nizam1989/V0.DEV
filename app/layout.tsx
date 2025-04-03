import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "TokanProperty - Real Estate Agent Dashboard",
  description: "Empower your real estate business with TokanProperty's all-in-one agent dashboard",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`font-sans antialiased ${fontSans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <DashboardLayout>{children}</DashboardLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'