"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  AlertCircle,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Edit,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
  Building,
  FileText,
  MessageSquare,
  Phone,
  CalendarClock,
  ArrowRight,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Sample task data
const initialTasks = [
  {
    id: "1",
    title: "Call Ahmad Ismail about KLCC property",
    description: "Follow up on his interest in the KLCC penthouse listing",
    status: "todo",
    priority: "high",
    dueDate: "2023-06-20",
    category: "client",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    client: {
      name: "Ahmad Ismail",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AI",
      contact: "+60 12-345-6789",
    },
    property: "Luxury Penthouse in KLCC",
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    title: "Prepare listing presentation for Bangsar property",
    description: "Create slides and market analysis for the new Bangsar South listing",
    status: "in-progress",
    priority: "medium",
    dueDate: "2023-06-22",
    category: "listing",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    property: "Bangsar South Apartment",
    createdAt: "2023-06-16",
  },
  {
    id: "3",
    title: "Schedule property photoshoot",
    description: "Arrange professional photography for the Mont Kiara condo",
    status: "todo",
    priority: "medium",
    dueDate: "2023-06-25",
    category: "listing",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    property: "Mont Kiara Residence",
    createdAt: "2023-06-17",
  },
  {
    id: "4",
    title: "Submit co-broke request for Damansara Heights property",
    description: "Send co-broke request to Luxury Homes agency for the Semi-D listing",
    status: "todo",
    priority: "low",
    dueDate: "2023-06-28",
    category: "co-broke",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    property: "Semi-D House in Damansara Heights",
    createdAt: "2023-06-17",
  },
  {
    id: "5",
    title: "Prepare monthly sales report",
    description: "Compile sales data and create report for agency management",
    status: "in-progress",
    priority: "high",
    dueDate: "2023-06-30",
    category: "admin",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    createdAt: "2023-06-18",
  },
  {
    id: "6",
    title: "Organize open house for Subang Jaya property",
    description: "Plan and schedule open house event for the Subang Jaya terrace house",
    status: "todo",
    priority: "medium",
    dueDate: "2023-07-02",
    category: "event",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    property: "Subang Jaya Terrace House",
    createdAt: "2023-06-18",
  },
  {
    id: "7",
    title: "Follow up with Tan Wei Ming on offer",
    description: "Call to discuss the counteroffer for the Petaling Jaya condo",
    status: "in-progress",
    priority: "high",
    dueDate: "2023-06-19",
    category: "client",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    client: {
      name: "Tan Wei Ming",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TW",
      contact: "+60 13-456-7890",
    },
    property: "Petaling Jaya Condominium",
    createdAt: "2023-06-19",
  },
  {
    id: "8",
    title: "Update website listings",
    description: "Add new properties and remove sold listings from the website",
    status: "completed",
    priority: "medium",
    dueDate: "2023-06-15",
    category: "admin",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    completedAt: "2023-06-15",
    createdAt: "2023-06-14",
  },
  {
    id: "9",
    title: "Create social media posts for new listings",
    description: "Design and schedule Instagram and Facebook posts for the new properties",
    status: "completed",
    priority: "low",
    dueDate: "2023-06-16",
    category: "marketing",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    completedAt: "2023-06-16",
    createdAt: "2023-06-13",
  },
  {
    id: "10",
    title: "Attend property viewing with Siti Aminah",
    description: "Meet client at Mont Kiara Residence for scheduled viewing",
    status: "completed",
    priority: "high",
    dueDate: "2023-06-17",
    category: "client",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    client: {
      name: "Siti Aminah",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SA",
      contact: "+60 14-567-8901",
    },
    property: "Mont Kiara Residence",
    completedAt: "2023-06-17",
    createdAt: "2023-06-15",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function TaskBoardPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("board")
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
  const [isTaskDetailDialogOpen, setIsTaskDetailDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())

  // New task form state
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    category: "client",
    property: "",
  })

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.property && task.property.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const todoTasks = filteredTasks.filter((task) => task.status === "todo")
  const inProgressTasks = filteredTasks.filter((task) => task.status === "in-progress")
  const completedTasks = filteredTasks.filter((task) => task.status === "completed")

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Task title required",
        description: "Please enter a title for your task.",
        variant: "destructive",
      })
      return
    }

    const task = {
      id: (tasks.length + 1).toString(),
      ...newTask,
      assignee: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      createdAt: format(new Date(), "yyyy-MM-dd"),
    }

    setTasks([task, ...tasks])
    setIsAddTaskDialogOpen(false)
    setNewTask({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: format(new Date(), "yyyy-MM-dd"),
      category: "client",
      property: "",
    })

    toast({
      title: "Task added",
      description: "Your task has been added successfully.",
    })
  }

  const handleTaskStatusChange = (taskId: string, newStatus: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = {
            ...task,
            status: newStatus,
            completedAt: newStatus === "completed" ? format(new Date(), "yyyy-MM-dd") : undefined,
          }
          return updatedTask
        }
        return task
      }),
    )

    toast({
      title: "Task updated",
      description: `Task moved to ${newStatus === "in-progress" ? "In Progress" : newStatus === "completed" ? "Completed" : "To Do"}.`,
    })
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    setIsTaskDetailDialogOpen(false)

    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully.",
    })
  }

  const handleTaskClick = (task: any) => {
    setSelectedTask(task)
    setIsTaskDetailDialogOpen(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "client":
        return <Users className="h-4 w-4" />
      case "listing":
        return <Building className="h-4 w-4" />
      case "co-broke":
        return <FileText className="h-4 w-4" />
      case "admin":
        return <FileText className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "marketing":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "client":
        return "bg-blue-100 text-blue-800"
      case "listing":
        return "bg-purple-100 text-purple-800"
      case "co-broke":
        return "bg-indigo-100 text-indigo-800"
      case "admin":
        return "bg-gray-100 text-gray-800"
      case "event":
        return "bg-pink-100 text-pink-800"
      case "marketing":
        return "bg-cyan-100 text-cyan-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isTaskOverdue = (task: any) => {
    if (task.status === "completed" || !task.dueDate) return false

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dueDate = new Date(task.dueDate)
    dueDate.setHours(0, 0, 0, 0)

    return dueDate < today
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">📋 Task Board</h2>
          <p className="text-muted-foreground">Manage and track your daily tasks and activities</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sarah Johnson" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">Property Agent</p>
            </div>
          </div>
          <Button onClick={() => setIsAddTaskDialogOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add New Task
          </Button>
        </div>
      </div>

      {/* User Profile Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-20 w-20 border-2 border-primary">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Sarah Johnson" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Sarah Johnson</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  <Building className="mr-1 h-3 w-3" />
                  Property Agent
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />5 Years Experience
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-800">
                  <Users className="mr-1 h-3 w-3" />
                  25 Active Clients
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Specializing in luxury properties in Kuala Lumpur and Selangor areas.
              </p>
            </div>
            <div className="ml-auto flex flex-col gap-2 text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm font-medium">Task Completion Rate</span>
                <Badge className="bg-green-100 text-green-800">85%</Badge>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm font-medium">Active Tasks</span>
                <Badge className="bg-blue-100 text-blue-800">{todoTasks.length + inProgressTasks.length}</Badge>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm font-medium">Completed Tasks</span>
                <Badge className="bg-gray-100 text-gray-800">{completedTasks.length}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Status</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Priority</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Category</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="listing">Listing</SelectItem>
                  <SelectItem value="co-broke">Co-Broke</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="board" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="board" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Board View
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                List View
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Calendar
              </TabsTrigger>
            </TabsList>

            {/* Board View */}
            <TabsContent value="board" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* To Do Column */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">To Do</Badge>
                      <span className="text-sm text-muted-foreground">{todoTasks.length} tasks</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                    {todoTasks.map((task) => (
                      <motion.div key={task.id} variants={item}>
                        <Card
                          className={`cursor-pointer hover:shadow-md transition-shadow ${isTaskOverdue(task) ? "border-red-300" : ""}`}
                          onClick={() => handleTaskClick(task)}
                        >
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <h3 className="font-medium">{task.title}</h3>
                                {task.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                                )}
                              </div>
                              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </Badge>
                            </div>

                            {task.property && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Building className="h-3 w-3" />
                                <span className="truncate">{task.property}</span>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={getCategoryColor(task.category)}>
                                  <span className="flex items-center gap-1">
                                    {getCategoryIcon(task.category)}
                                    <span className="capitalize">{task.category}</span>
                                  </span>
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                {isTaskOverdue(task) ? (
                                  <Badge variant="outline" className="bg-red-100 text-red-800 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    <span>Overdue</span>
                                  </Badge>
                                ) : (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{task.dueDate}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                    {todoTasks.length === 0 && (
                      <div className="flex flex-col items-center justify-center p-4 border border-dashed rounded-lg">
                        <p className="text-sm text-muted-foreground">No tasks to do</p>
                        <Button variant="ghost" size="sm" className="mt-2" onClick={() => setIsAddTaskDialogOpen(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Task
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* In Progress Column */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                      <span className="text-sm text-muted-foreground">{inProgressTasks.length} tasks</span>
                    </div>
                  </div>
                  <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                    {inProgressTasks.map((task) => (
                      <motion.div key={task.id} variants={item}>
                        <Card
                          className={`cursor-pointer hover:shadow-md transition-shadow ${isTaskOverdue(task) ? "border-red-300" : ""}`}
                          onClick={() => handleTaskClick(task)}
                        >
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <h3 className="font-medium">{task.title}</h3>
                                {task.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                                )}
                              </div>
                              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </Badge>
                            </div>

                            {task.property && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Building className="h-3 w-3" />
                                <span className="truncate">{task.property}</span>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={getCategoryColor(task.category)}>
                                  <span className="flex items-center gap-1">
                                    {getCategoryIcon(task.category)}
                                    <span className="capitalize">{task.category}</span>
                                  </span>
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                {isTaskOverdue(task) ? (
                                  <Badge variant="outline" className="bg-red-100 text-red-800 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    <span>Overdue</span>
                                  </Badge>
                                ) : (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{task.dueDate}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                    {inProgressTasks.length === 0 && (
                      <div className="flex flex-col items-center justify-center p-4 border border-dashed rounded-lg">
                        <p className="text-sm text-muted-foreground">No tasks in progress</p>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Completed Column */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      <span className="text-sm text-muted-foreground">{completedTasks.length} tasks</span>
                    </div>
                  </div>
                  <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                    {completedTasks.map((task) => (
                      <motion.div key={task.id} variants={item}>
                        <Card
                          className="cursor-pointer hover:shadow-md transition-shadow opacity-80"
                          onClick={() => handleTaskClick(task)}
                        >
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <h3 className="font-medium line-through">{task.title}</h3>
                                {task.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                                )}
                              </div>
                              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </Badge>
                            </div>

                            {task.property && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Building className="h-3 w-3" />
                                <span className="truncate">{task.property}</span>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={getCategoryColor(task.category)}>
                                  <span className="flex items-center gap-1">
                                    {getCategoryIcon(task.category)}
                                    <span className="capitalize">{task.category}</span>
                                  </span>
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                <span>{task.completedAt}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                    {completedTasks.length === 0 && (
                      <div className="flex flex-col items-center justify-center p-4 border border-dashed rounded-lg">
                        <p className="text-sm text-muted-foreground">No completed tasks</p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            {/* List View */}
            <TabsContent value="list" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">Task</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Priority</th>
                      <th className="p-3 text-left font-medium">Category</th>
                      <th className="p-3 text-left font-medium">Due Date</th>
                      <th className="p-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="border-b hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                      >
                        <td className="p-3">
                          <div className="flex flex-col">
                            <span className={task.status === "completed" ? "line-through" : "font-medium"}>
                              {task.title}
                            </span>
                            {task.property && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <Building className="h-3 w-3" />
                                {task.property}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge
                            className={
                              task.status === "todo"
                                ? "bg-blue-100 text-blue-800"
                                : task.status === "in-progress"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {task.status === "todo"
                              ? "To Do"
                              : task.status === "in-progress"
                                ? "In Progress"
                                : "Completed"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className={getCategoryColor(task.category)}>
                            <span className="flex items-center gap-1">
                              {getCategoryIcon(task.category)}
                              <span className="capitalize">{task.category}</span>
                            </span>
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {isTaskOverdue(task) ? (
                              <Badge variant="outline" className="bg-red-100 text-red-800 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                <span>Overdue</span>
                              </Badge>
                            ) : (
                              <span className="text-sm">{task.dueDate}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleTaskClick(task)
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                {task.status !== "completed" && (
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleTaskStatusChange(task.id, "completed")
                                    }}
                                  >
                                    <Check className="mr-2 h-4 w-4" />
                                    Mark as Completed
                                  </DropdownMenuItem>
                                )}
                                {task.status === "todo" && (
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleTaskStatusChange(task.id, "in-progress")
                                    }}
                                  >
                                    <Clock className="mr-2 h-4 w-4" />
                                    Start Working
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteTask(task.id)
                                  }}
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Calendar View */}
            <TabsContent value="calendar" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-[300px]">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                      <div className="mt-4 space-y-2">
                        <h3 className="text-sm font-medium">Task Legend</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">To Do</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <span className="text-sm">In Progress</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Completed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-sm">Overdue</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-4">
                        Tasks for {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
                      </h3>
                      <div className="space-y-4">
                        {date &&
                        filteredTasks.filter((task) => task.dueDate === format(date, "yyyy-MM-dd")).length > 0 ? (
                          filteredTasks
                            .filter((task) => task.dueDate === format(date, "yyyy-MM-dd"))
                            .map((task) => (
                              <Card
                                key={task.id}
                                className="cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => handleTaskClick(task)}
                              >
                                <CardContent className="p-4 space-y-3">
                                  <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                      <h3
                                        className={
                                          task.status === "completed" ? "font-medium line-through" : "font-medium"
                                        }
                                      >
                                        {task.title}
                                      </h3>
                                      {task.description && (
                                        <p className="text-sm text-muted-foreground">{task.description}</p>
                                      )}
                                    </div>
                                    <Badge
                                      className={
                                        task.status === "todo"
                                          ? "bg-blue-100 text-blue-800"
                                          : task.status === "in-progress"
                                            ? "bg-amber-100 text-amber-800"
                                            : "bg-green-100 text-green-800"
                                      }
                                    >
                                      {task.status === "todo"
                                        ? "To Do"
                                        : task.status === "in-progress"
                                          ? "In Progress"
                                          : "Completed"}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <Badge variant="outline" className={getCategoryColor(task.category)}>
                                      <span className="flex items-center gap-1">
                                        {getCategoryIcon(task.category)}
                                        <span className="capitalize">{task.category}</span>
                                      </span>
                                    </Badge>
                                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                    </Badge>
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                        ) : (
                          <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
                            <p className="text-sm text-muted-foreground">No tasks scheduled for this date</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => {
                                setNewTask({
                                  ...newTask,
                                  dueDate: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
                                })
                                setIsAddTaskDialogOpen(true)
                              }}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Task for This Date
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Create a new task to track your work.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Task Title
              </label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Enter task title"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Enter task description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select value={newTask.category} onValueChange={(value) => setNewTask({ ...newTask, category: value })}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="listing">Listing</SelectItem>
                    <SelectItem value="co-broke">Co-Broke</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="dueDate" className="text-sm font-medium">
                Due Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarClock className="mr-2 h-4 w-4" />
                    {newTask.dueDate ? newTask.dueDate : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={new Date(newTask.dueDate)}
                    onSelect={(date) => setNewTask({ ...newTask, dueDate: date ? format(date, "yyyy-MM-dd") : "" })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <label htmlFor="property" className="text-sm font-medium">
                Related Property (Optional)
              </label>
              <Input
                id="property"
                value={newTask.property}
                onChange={(e) => setNewTask({ ...newTask, property: e.target.value })}
                placeholder="Enter property name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask} className="bg-primary hover:bg-primary/90">
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task Detail Dialog */}
      <Dialog open={isTaskDetailDialogOpen} onOpenChange={setIsTaskDetailDialogOpen}>
        {selectedTask && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Task Details</span>
                <Badge
                  className={
                    selectedTask.status === "todo"
                      ? "bg-blue-100 text-blue-800"
                      : selectedTask.status === "in-progress"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                  }
                >
                  {selectedTask.status === "todo"
                    ? "To Do"
                    : selectedTask.status === "in-progress"
                      ? "In Progress"
                      : "Completed"}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <h3 className="text-lg font-medium">{selectedTask.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{selectedTask.description}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Priority</h4>
                  <Badge variant="outline" className={getPriorityColor(selectedTask.priority)}>
                    {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                  <Badge variant="outline" className={getCategoryColor(selectedTask.category)}>
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(selectedTask.category)}
                      <span className="capitalize">{selectedTask.category}</span>
                    </span>
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
                  <p className="text-sm">{selectedTask.dueDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
                  <p className="text-sm">{selectedTask.createdAt}</p>
                </div>
              </div>

              {selectedTask.property && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-muted-foreground">Related Property</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedTask.property}</span>
                  </div>
                </div>
              )}

              {selectedTask.client && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedTask.client.avatar} alt={selectedTask.client.name} />
                      <AvatarFallback>{selectedTask.client.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{selectedTask.client.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{selectedTask.client.contact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="flex justify-between">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  handleDeleteTask(selectedTask.id)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <div className="flex gap-2">
                {selectedTask.status !== "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleTaskStatusChange(selectedTask.id, "completed")
                      setIsTaskDetailDialogOpen(false)
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </Button>
                )}
                {selectedTask.status === "todo" && (
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => {
                      handleTaskStatusChange(selectedTask.id, "in-progress")
                      setIsTaskDetailDialogOpen(false)
                    }}
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Start Working
                  </Button>
                )}
                {selectedTask.status === "in-progress" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleTaskStatusChange(selectedTask.id, "todo")
                      setIsTaskDetailDialogOpen(false)
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Move to To Do
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

