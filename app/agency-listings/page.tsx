"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowUpDown,
  Building,
  ChevronDown,
  Copy,
  Filter,
  MoreHorizontal,
  Search,
  Building2,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for agency listings
const agencyListings = [
  {
    id: "1",
    title: "Luxury Penthouse in KLCC",
    price: "RM 3,500,000",
    location: "KLCC, Kuala Lumpur",
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    size: "3,200 sq ft",
    status: "Agency",
    agent: {
      name: "Ahmad Razif",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AR",
    },
    views: 320,
    leads: 18,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Premium", "Skyline View", "Private Pool"],
  },
  {
    id: "2",
    title: "Semi-D House in Damansara Heights",
    price: "RM 4,800,000",
    location: "Damansara Heights, KL",
    type: "Semi-Detached",
    bedrooms: 5,
    bathrooms: 6,
    size: "4,500 sq ft",
    status: "Agency",
    agent: {
      name: "Sarah Tan",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ST",
    },
    views: 245,
    leads: 12,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Garden", "Private Pool", "Smart Home"],
  },
  {
    id: "3",
    title: "Bangsar Bungalow with Pool",
    price: "RM 6,500,000",
    location: "Bangsar, Kuala Lumpur",
    type: "Bungalow",
    bedrooms: 6,
    bathrooms: 7,
    size: "6,000 sq ft",
    status: "Co-Broke",
    agent: {
      name: "Raj Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RK",
    },
    views: 198,
    leads: 9,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Luxury", "Private Garden", "Security"],
  },
  {
    id: "4",
    title: "Mont Kiara Condominium",
    price: "RM 1,800,000",
    location: "Mont Kiara, KL",
    type: "Condominium",
    bedrooms: 3,
    bathrooms: 3,
    size: "1,800 sq ft",
    status: "Co-Broke",
    agent: {
      name: "Lily Wong",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LW",
    },
    views: 175,
    leads: 7,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Fully Furnished", "High Floor", "Facilities"],
  },
  {
    id: "5",
    title: "Desa ParkCity Townhouse",
    price: "RM 2,200,000",
    location: "Desa ParkCity, KL",
    type: "Townhouse",
    bedrooms: 4,
    bathrooms: 4,
    size: "2,400 sq ft",
    status: "Agency",
    agent: {
      name: "David Lim",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DL",
    },
    views: 156,
    leads: 6,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Corner Lot", "Renovated", "Near Park"],
  },
  {
    id: "6",
    title: "Ampang Hilir Luxury Condo",
    price: "RM 2,500,000",
    location: "Ampang Hilir, KL",
    type: "Condominium",
    bedrooms: 3,
    bathrooms: 4,
    size: "2,100 sq ft",
    status: "Co-Broke",
    agent: {
      name: "Nurul Huda",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "NH",
    },
    views: 142,
    leads: 5,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Diplomatic Area", "Renovated", "Private Lift"],
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

export default function AgencyListingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  const filteredListings = agencyListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || listing.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">🏢 Agency Listings</h2>
          <p className="text-muted-foreground">Browse and co-broke listings from your agency's masterlist</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Copy className="mr-2 h-4 w-4" />
          Copy to My Listings
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>Tokan Property Agency Masterlist</CardTitle>
              <CardDescription className="mt-2">
                Exclusive and co-broke listings from all agents in your agency
              </CardDescription>
            </div>
            <Badge className="bg-primary text-white self-start sm:self-center">
              <Users className="mr-1 h-3 w-3" />
              32 Agents
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agency listings..."
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
                  <SelectItem value="all">All Listings</SelectItem>
                  <SelectItem value="agency">Agency</SelectItem>
                  <SelectItem value="co-broke">Co-Broke</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* View Mode Tabs */}
          <Tabs defaultValue="grid" value={viewMode} onValueChange={setViewMode}>
            <TabsList className="w-[200px]">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            {/* Grid View */}
            <TabsContent value="grid">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredListings.map((listing) => (
                  <motion.div key={listing.id} variants={item}>
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="relative">
                        <img
                          src={listing.image || "/placeholder.svg"}
                          alt={listing.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Badge className={listing.status === "Agency" ? "bg-primary" : "bg-secondary"}>
                            {listing.status}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold truncate">{listing.title}</h3>
                          <div className="text-lg font-bold text-primary">{listing.price}</div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Building className="mr-1 h-4 w-4" />
                            {listing.location}
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>{listing.bedrooms} bed</span>
                            <span>{listing.bathrooms} bath</span>
                            <span>{listing.size}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {listing.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={listing.agent.avatar} alt={listing.agent.name} />
                              <AvatarFallback>{listing.agent.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{listing.agent.name}</span>
                          </div>
                        </div>
                      </CardContent>
                      <div className="border-t p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Search className="mr-1 h-3 w-3" />
                            {listing.views}
                          </div>
                          <div className="flex items-center">
                            <ChevronDown className="mr-1 h-3 w-3" />
                            {listing.leads}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy to My Listings
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Building2 className="mr-2 h-4 w-4" />
                              View Property
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* List View */}
            <TabsContent value="list">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                          Views
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredListings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="font-medium">{listing.title}</TableCell>
                        <TableCell>{listing.price}</TableCell>
                        <TableCell>{listing.location}</TableCell>
                        <TableCell>{listing.type}</TableCell>
                        <TableCell>
                          <Badge className={listing.status === "Agency" ? "bg-primary" : "bg-secondary"}>
                            {listing.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={listing.agent.avatar} alt={listing.agent.name} />
                              <AvatarFallback>{listing.agent.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{listing.agent.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{listing.views}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy to My Listings
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Building2 className="mr-2 h-4 w-4" />
                                View Property
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

