"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Calendar,
  Download,
  Filter,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Search,
  Users,
  Home,
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowDownUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for funnel stages
const funnelStages = [
  {
    id: "lead",
    name: "New Leads",
    count: 120,
    percentage: 100,
    color: "bg-blue-500",
    icon: Users,
  },
  {
    id: "contacted",
    name: "Contacted",
    count: 85,
    percentage: 71,
    color: "bg-indigo-500",
    icon: MessageSquare,
  },
  {
    id: "meeting",
    name: "Meeting Scheduled",
    count: 52,
    percentage: 43,
    color: "bg-violet-500",
    icon: Calendar,
  },
  {
    id: "viewing",
    name: "Property Viewing",
    count: 38,
    percentage: 32,
    color: "bg-purple-500",
    icon: Home,
  },
  {
    id: "negotiation",
    name: "Negotiation",
    count: 24,
    percentage: 20,
    color: "bg-pink-500",
    icon: DollarSign,
  },
  {
    id: "closed",
    name: "Closed Deals",
    count: 15,
    percentage: 12.5,
    color: "bg-green-500",
    icon: CheckCircle2,
  },
]

// Sample data for leads
const leads = [
  {
    id: "1",
    name: "Ahmad Ismail",
    contact: "+60 12-345-6789",
    email: "ahmad.ismail@example.com",
    stage: "negotiation",
    property: "Damansara Heights Condo",
    value: "RM 1,250,000",
    lastActivity: "2 hours ago",
    nextAction: "Follow up on offer",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AI",
  },
  {
    id: "2",
    name: "Siti Aminah",
    contact: "+60 13-456-7890",
    email: "siti.aminah@example.com",
    stage: "viewing",
    property: "Mont Kiara Residence",
    value: "RM 980,000",
    lastActivity: "1 day ago",
    nextAction: "Schedule second viewing",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SA",
  },
  {
    id: "3",
    name: "Raj Kumar",
    contact: "+60 14-567-8901",
    email: "raj.kumar@example.com",
    stage: "closed",
    property: "KLCC Luxury Apartment",
    value: "RM 2,100,000",
    lastActivity: "3 days ago",
    nextAction: "Send thank you gift",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RK",
  },
  {
    id: "4",
    name: "Mei Ling",
    contact: "+60 15-678-9012",
    email: "mei.ling@example.com",
    stage: "contacted",
    property: "Bangsar South Apartment",
    value: "RM 750,000",
    lastActivity: "5 hours ago",
    nextAction: "Call to discuss requirements",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ML",
  },
  {
    id: "5",
    name: "David Wong",
    contact: "+60 16-789-0123",
    email: "david.wong@example.com",
    stage: "meeting",
    property: "Petaling Jaya Condo",
    value: "RM 680,000",
    lastActivity: "12 hours ago",
    nextAction: "Prepare property options",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DW",
  },
  {
    id: "6",
    name: "Nurul Huda",
    contact: "+60 17-890-1234",
    email: "nurul.h@example.com",
    stage: "lead",
    property: "Interested in Subang area",
    value: "RM 500,000 - 700,000",
    lastActivity: "1 day ago",
    nextAction: "Initial contact",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "NH",
  },
  {
    id: "7",
    name: "Tan Wei Ming",
    contact: "+60 18-901-2345",
    email: "tan.wm@example.com",
    stage: "meeting",
    property: "Desa ParkCity Townhouse",
    value: "RM 2,200,000",
    lastActivity: "2 days ago",
    nextAction: "Confirm meeting time",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "TW",
  },
]

// Sample data for monthly performance
const monthlyData = [
  { month: "Jan", leads: 45, meetings: 22, closings: 5 },
  { month: "Feb", leads: 52, meetings: 28, closings: 7 },
  { month: "Mar", leads: 58, meetings: 30, closings: 8 },
  { month: "Apr", leads: 75, meetings: 42, closings: 12 },
  { month: "May", leads: 80, meetings: 48, closings: 14 },
  { month: "Jun", leads: 120, meetings: 52, closings: 15 },
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

export default function FunnelTrackerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("month")

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = stageFilter === "all" || lead.stage === stageFilter

    return matchesSearch && matchesStage
  })

  // Calculate conversion rates
  const leadToMeeting = Math.round((funnelStages[2].count / funnelStages[0].count) * 100)
  const meetingToViewing = Math.round((funnelStages[3].count / funnelStages[2].count) * 100)
  const viewingToClosing = Math.round((funnelStages[5].count / funnelStages[3].count) * 100)
  const leadToClosing = Math.round((funnelStages[5].count / funnelStages[0].count) * 100)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">📊 Sales Funnel Tracker</h2>
          <p className="text-muted-foreground">Monitor your sales pipeline and conversion rates</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[130px]">
              <Clock className="mr-2 h-4 w-4" />
              <span>Period</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="text-secondary hover:text-secondary/90 hover:bg-secondary/10">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Funnel Visualization */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Sales Funnel</CardTitle>
          <CardDescription>Visualize your sales pipeline from leads to closed deals</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            {funnelStages.map((stage, index) => (
              <motion.div key={stage.id} variants={item}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${stage.color} flex items-center justify-center mr-3`}>
                      <stage.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{stage.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {stage.count} leads ({stage.percentage}%)
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ArrowRight className="h-3 w-3" />
                    <span className="text-xs">View</span>
                  </Button>
                </div>
                <Progress value={stage.percentage} className={`h-3 ${stage.color}`} />
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">Lead → Meeting</div>
                <div className="text-2xl font-bold">{leadToMeeting}%</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowDownUp className="h-3 w-3 mr-1" />
                  +5% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">Meeting → Viewing</div>
                <div className="text-2xl font-bold">{meetingToViewing}%</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowDownUp className="h-3 w-3 mr-1" />
                  +3% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">Viewing → Closing</div>
                <div className="text-2xl font-bold">{viewingToClosing}%</div>
                <div className="text-xs text-red-600 flex items-center mt-1">
                  <ArrowDownUp className="h-3 w-3 mr-1" />
                  -2% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">Overall Conversion</div>
                <div className="text-2xl font-bold">{leadToClosing}%</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowDownUp className="h-3 w-3 mr-1" />
                  +1% from last month
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Performance */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>Track your lead generation and conversion over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <div className="flex h-full">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col justify-end items-center gap-1 px-2">
                  <div className="w-full flex flex-col items-center gap-1">
                    <div className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${data.leads * 1.2}px` }}></div>
                    <div
                      className="w-full bg-violet-500 rounded-t-sm"
                      style={{ height: `${data.meetings * 1.5}px` }}
                    ></div>
                    <div
                      className="w-full bg-green-500 rounded-t-sm"
                      style={{ height: `${data.closings * 5}px` }}
                    ></div>
                  </div>
                  <div className="text-xs font-medium mt-2">{data.month}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-xs">New Leads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-violet-500 rounded-sm"></div>
              <span className="text-xs">Meetings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-xs">Closings</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads by Stage */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>Leads by Stage</CardTitle>
              <CardDescription>Manage and track leads at each stage of your sales funnel</CardDescription>
            </div>
            <Tabs defaultValue="all" value={stageFilter} onValueChange={setStageFilter} className="w-[400px]">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="lead">New</TabsTrigger>
                <TabsTrigger value="negotiation">Hot</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start mb-6">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Stage</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="lead">New Leads</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="meeting">Meeting Scheduled</SelectItem>
                  <SelectItem value="viewing">Property Viewing</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed">Closed Deals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Next Action</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={lead.avatar} alt={lead.name} />
                          <AvatarFallback>{lead.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-xs text-muted-foreground">{lead.contact}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          lead.stage === "lead"
                            ? "bg-blue-100 text-blue-800"
                            : lead.stage === "contacted"
                              ? "bg-indigo-100 text-indigo-800"
                              : lead.stage === "meeting"
                                ? "bg-violet-100 text-violet-800"
                                : lead.stage === "viewing"
                                  ? "bg-purple-100 text-purple-800"
                                  : lead.stage === "negotiation"
                                    ? "bg-pink-100 text-pink-800"
                                    : "bg-green-100 text-green-800"
                        }
                      >
                        {lead.stage === "lead"
                          ? "New Lead"
                          : lead.stage === "contacted"
                            ? "Contacted"
                            : lead.stage === "meeting"
                              ? "Meeting"
                              : lead.stage === "viewing"
                                ? "Viewing"
                                : lead.stage === "negotiation"
                                  ? "Negotiation"
                                  : "Closed"}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.property}</TableCell>
                    <TableCell>{lead.value}</TableCell>
                    <TableCell>{lead.lastActivity}</TableCell>
                    <TableCell>{lead.nextAction}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="h-4 w-4 text-primary" />
                          <span className="sr-only">Call</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4 text-secondary" />
                          <span className="sr-only">Message</span>
                        </Button>
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Update Stage</DropdownMenuItem>
                            <DropdownMenuItem>Add Note</DropdownMenuItem>
                            <DropdownMenuItem>Schedule Follow-up</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="mr-2 h-4 w-4" />
                              Mark as Lost
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Funnel Insights</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Bottleneck Detected</h3>
            <p className="text-sm text-muted-foreground">
              Your conversion from Viewing to Negotiation dropped by 8% this month. Consider improving your property
              presentation or negotiation skills.
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              View Recommendations
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Top Performing Property Type</h3>
            <p className="text-sm text-muted-foreground">
              Condominiums in KLCC and Mont Kiara have the highest conversion rate at 18%. Focus on these areas for
              quicker closings.
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              View Properties
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Lead Response Time</h3>
            <p className="text-sm text-muted-foreground">
              Your average response time to new leads is 3.5 hours. Leads contacted within 1 hour have 2x higher
              conversion rate.
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Improve Response Time
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

