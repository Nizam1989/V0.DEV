"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowUpDown,
  Building,
  ChevronDown,
  Copy,
  Edit,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Trash2,
  Zap,
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

// Sample data for listings
const listings = [
  {
    id: "1",
    title: "Damansara Heights Luxury Condo",
    price: "RM 1,250,000",
    location: "Damansara Heights, KL",
    type: "Condominium",
    bedrooms: 3,
    bathrooms: 2,
    size: "1,500 sq ft",
    status: "Active",
    source: "My Listing",
    views: 245,
    leads: 12,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Premium", "High Floor", "Pool View"],
  },
  {
    id: "2",
    title: "Mont Kiara Residence",
    price: "RM 980,000",
    location: "Mont Kiara, KL",
    type: "Condominium",
    bedrooms: 2,
    bathrooms: 2,
    size: "1,200 sq ft",
    status: "Active",
    source: "Co-Broke Listing",
    views: 187,
    leads: 8,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Furnished", "Low Density"],
  },
  {
    id: "3",
    title: "Bangsar South Apartment",
    price: "RM 750,000",
    location: "Bangsar South, KL",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    size: "950 sq ft",
    status: "Pending",
    source: "Agency Masterlist",
    views: 120,
    leads: 5,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Near LRT", "Renovated"],
  },
  {
    id: "4",
    title: "Subang Jaya Terrace House",
    price: "RM 1,500,000",
    location: "Subang Jaya, Selangor",
    type: "Terrace House",
    bedrooms: 4,
    bathrooms: 3,
    size: "2,200 sq ft",
    status: "Active",
    source: "My Listing",
    views: 98,
    leads: 3,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Corner Lot", "Renovated"],
  },
  {
    id: "5",
    title: "KLCC Luxury Serviced Apartment",
    price: "RM 2,100,000",
    location: "KLCC, KL",
    type: "Serviced Apartment",
    bedrooms: 3,
    bathrooms: 3,
    size: "1,800 sq ft",
    status: "Sold",
    source: "My Listing",
    views: 320,
    leads: 15,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["City View", "Fully Furnished", "Premium"],
  },
  {
    id: "6",
    title: "Petaling Jaya Condominium",
    price: "RM 680,000",
    location: "Petaling Jaya, Selangor",
    type: "Condominium",
    bedrooms: 2,
    bathrooms: 2,
    size: "1,000 sq ft",
    status: "Active",
    source: "Agency Masterlist",
    views: 145,
    leads: 6,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Near Mall", "Low Density"],
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

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || listing.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesSource = sourceFilter === "all" || listing.source.toLowerCase().includes(sourceFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesSource
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">🏘️ Listings Manager</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New Listing
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Property Listings</CardTitle>
          <CardDescription>Manage all your property listings in one place</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search listings..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Source</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="my listing">My Listings</SelectItem>
                  <SelectItem value="co-broke">Co-Broke Listings</SelectItem>
                  <SelectItem value="agency">Agency Masterlist</SelectItem>
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
                          <Badge
                            className={
                              listing.status === "Active"
                                ? "bg-success"
                                : listing.status === "Pending"
                                  ? "bg-warning"
                                  : "bg-secondary"
                            }
                          >
                            {listing.status}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <Badge
                            variant="outline"
                            className={
                              listing.source === "My Listing"
                                ? "bg-primary/10 text-primary"
                                : listing.source === "Co-Broke Listing"
                                  ? "bg-secondary/10 text-secondary"
                                  : "bg-warning/10 text-warning"
                            }
                          >
                            {listing.source}
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Listing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              Generate WhatsApp Link
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Zap className="mr-2 h-4 w-4" />
                              Boost Listing
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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
                      <TableHead>Status</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                          Views
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                          Leads
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
                        <TableCell>
                          <Badge
                            className={
                              listing.status === "Active"
                                ? "bg-success"
                                : listing.status === "Pending"
                                  ? "bg-warning"
                                  : "bg-secondary"
                            }
                          >
                            {listing.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              listing.source === "My Listing"
                                ? "bg-primary/10 text-primary"
                                : listing.source === "Co-Broke Listing"
                                  ? "bg-secondary/10 text-secondary"
                                  : "bg-warning/10 text-warning"
                            }
                          >
                            {listing.source}
                          </Badge>
                        </TableCell>
                        <TableCell>{listing.views}</TableCell>
                        <TableCell>{listing.leads}</TableCell>
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
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Listing
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Generate WhatsApp Link
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Zap className="mr-2 h-4 w-4" />
                                Boost Listing
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
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

