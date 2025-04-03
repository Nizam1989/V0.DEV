"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  BarChart3,
  Building2,
  ChevronDown,
  Cpu,
  FileText,
  FolderKanban,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Settings,
  Share2,
  Sun,
  Users,
  Bell,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "AI Assistant",
    href: "/ai-assistant",
    icon: Cpu,
    badge: "New",
  },
  {
    name: "Listings",
    href: "/listings",
    icon: Building2,
    badge: null,
  },
  {
    name: "Co-Broke",
    href: "/co-broke",
    icon: Share2,
    badge: "3",
  },
  {
    name: "Agency Listings",
    href: "/agency-listings",
    icon: FileText,
    badge: "5",
  },
  {
    name: "CRM",
    href: "/crm",
    icon: Users,
    badge: null,
  },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: MessageSquare,
    badge: null,
  },
  {
    name: "Funnel Tracker",
    href: "/funnel-tracker",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "Task Board",
    href: "/tasks",
    icon: FolderKanban,
    badge: "2",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: Settings,
    badge: null,
  },
]

type Notification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "inquiry" | "co-broke" | "agency" | "system"
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "New Inquiry",
    description: "John Doe is interested in your Damansara Heights listing",
    time: "5 min ago",
    read: false,
    type: "inquiry",
  },
  {
    id: "2",
    title: "Co-Broke Approved",
    description: "Your co-broke request for Mont Kiara condo was approved",
    time: "1 hour ago",
    read: false,
    type: "co-broke",
  },
  {
    id: "3",
    title: "New Agency Listing",
    description: "Tokan Agency added 5 new listings to the masterlist",
    time: "3 hours ago",
    read: false,
    type: "agency",
  },
  {
    id: "4",
    title: "System Update",
    description: "New AI features have been added to your dashboard",
    time: "1 day ago",
    read: true,
    type: "system",
  },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Count unread notifications
    const count = notifications.filter((n) => !n.read).length
    setUnreadCount(count)
  }, [])

  const markAllAsRead = () => {
    setUnreadCount(0)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile navigation */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:hidden">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Home className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              TokanProperty
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-white">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="Agent" />
            <AvatarFallback>TP</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between border-b px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Home className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  TokanProperty
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href ? "bg-primary text-white" : "hover:bg-primary/10 hover:text-primary",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          pathname === item.href ? "text-white" : "text-muted-foreground group-hover:text-primary",
                        )}
                      />
                      {item.name}
                    </div>
                    {item.badge && (
                      <Badge
                        variant={pathname === item.href ? "outline" : "default"}
                        className={pathname === item.href ? "bg-white text-primary" : ""}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Theme</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Link
                href="/logout"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Notifications panel (mobile) */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setNotificationsOpen(false)}>
          <motion.div
            className="absolute right-0 top-0 h-full w-80 bg-background p-4 shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </div>
            <div className="space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-3 rounded-lg border",
                    notification.read ? "bg-background" : "bg-primary/5 border-primary/20",
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Desktop navigation */}
      <div className="hidden md:flex">
        <div className="fixed inset-y-0 z-10 flex w-64 flex-col border-r bg-background">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Home className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                TokanProperty
              </span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <nav className="grid gap-1 px-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href ? "bg-primary text-white" : "hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={cn(
                        "h-5 w-5",
                        pathname === item.href ? "text-white" : "text-muted-foreground group-hover:text-primary",
                      )}
                    />
                    {item.name}
                  </div>
                  {item.badge && (
                    <Badge
                      variant={pathname === item.href ? "outline" : "default"}
                      className={pathname === item.href ? "bg-white text-primary" : ""}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Theme</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link
              href="/logout"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </div>
        </div>
        <div className="flex-1 pl-64">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-6">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">
                {navigationItems.find((item) => item.href === pathname)?.name || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="relative"
                      onClick={() => setNotificationsOpen(!notificationsOpen)}
                    >
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-white">
                          {unreadCount}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Agent" />
                  <AvatarFallback>TP</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-sm font-medium">Ejen Anda</div>
                  <div className="text-xs text-muted-foreground">Premium Agent</div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </header>
          <div className="flex min-h-[calc(100vh-4rem)] flex-col">{children}</div>
        </div>
      </div>

      {/* Mobile content */}
      <div className="flex-1 md:hidden">{children}</div>

      {/* Notifications panel (desktop) */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 hidden md:block" onClick={() => setNotificationsOpen(false)}>
          <motion.div
            className="absolute right-6 top-16 w-80 bg-background rounded-2xl p-4 shadow-smooth-lg border"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </div>
            <div className="space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-3 rounded-lg border",
                    notification.read ? "bg-background" : "bg-primary/5 border-primary/20",
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

