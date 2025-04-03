"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Building,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Clock,
  CheckCircle,
  MessageSquare,
  Building2,
  Users,
  AlertCircle,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

// Sample data for available co-broke listings
const availableListings = [
  {
    id: "1",
    title: "Luxury Penthouse in KLCC",
    price: "RM 3,500,000",
    location: "KLCC, Kuala Lumpur",
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    size: "3,200 sq ft",
    commission: "2%",
    agency: {
      name: "Premium Realty",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "PR",
    },
    agent: {
      name: "Ahmad Razif",
      contact: "+60 12-345-6789",
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
    commission: "1.5%",
    agency: {
      name: "Luxury Homes",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "LH",
    },
    agent: {
      name: "Sarah Tan",
      contact: "+60 13-456-7890",
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
    commission: "2%",
    agency: {
      name: "Elite Properties",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "EP",
    },
    agent: {
      name: "Raj Kumar",
      contact: "+60 14-567-8901",
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
    commission: "2.5%",
    agency: {
      name: "City Realtors",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "CR",
    },
    agent: {
      name: "Lily Wong",
      contact: "+60 15-678-9012",
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
    commission: "2%",
    agency: {
      name: "Park View Realty",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "PV",
    },
    agent: {
      name: "David Lim",
      contact: "+60 16-789-0123",
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
    commission: "1.8%",
    agency: {
      name: "Diplomat Homes",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "DH",
    },
    agent: {
      name: "Nurul Huda",
      contact: "+60 17-890-1234",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "NH",
    },
    views: 142,
    leads: 5,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Diplomatic Area", "Renovated", "Private Lift"],
  },
]

// Sample data for my co-broke requests
const myRequests = [
  {
    id: "1",
    title: "Luxury Penthouse in KLCC",
    price: "RM 3,500,000",
    location: "KLCC, Kuala Lumpur",
    type: "Penthouse",
    commission: "2%",
    agency: {
      name: "Premium Realty",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "PR",
    },
    agent: {
      name: "Ahmad Razif",
      contact: "+60 12-345-6789",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AR",
    },
    status: "approved",
    requestDate: "2023-06-10",
    responseDate: "2023-06-12",
  },
  {
    id: "2",
    title: "Semi-D House in Damansara Heights",
    price: "RM 4,800,000",
    location: "Damansara Heights, KL",
    type: "Semi-Detached",
    commission: "1.5%",
    agency: {
      name: "Luxury Homes",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "LH",
    },
    agent: {
      name: "Sarah Tan",
      contact: "+60 13-456-7890",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ST",
    },
    status: "pending",
    requestDate: "2023-06-15",
    responseDate: null,
  },
  {
    id: "3",
    title: "Bangsar Bungalow with Pool",
    price: "RM 6,500,000",
    location: "Bangsar, Kuala Lumpur",
    type: "Bungalow",
    commission: "2%",
    agency: {
      name: "Elite Properties",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "EP",
    },
    agent: {
      name: "Raj Kumar",
      contact: "+60 14-567-8901",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RK",
    },
    status: "rejected",
    requestDate: "2023-06-08",
    responseDate: "2023-06-09",
    rejectionReason: "Property already under negotiation with another buyer",
  },
]

// Sample data for my active co-broke listings
const myCobrokeListings = [
  {
    id: "1",
    title: "Luxury Penthouse in KLCC",
    price: "RM 3,500,000",
    location: "KLCC, Kuala Lumpur",
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    size: "3,200 sq ft",
    commission: "2%",
    agency: {
      name: "Premium Realty",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "PR",
    },
    agent: {
      name: "Ahmad Razif",
      contact: "+60 12-345-6789",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AR",
    },
    approvalDate: "2023-06-12",
    views: 45,
    leads: 3,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Premium", "Skyline View", "Private Pool"],
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
    commission: "2.5%",
    agency: {
      name: "City Realtors",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "CR",
    },
    agent: {
      name: "Lily Wong",
      contact: "+60 15-678-9012",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LW",
    },
    approvalDate: "2023-05-28",
    views: 62,
    leads: 5,
    image: "/placeholder.svg?height=100&width=200",
    tags: ["Fully Furnished", "High Floor", "Facilities"],
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

export default function CoBrokePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [activeTab, setActiveTab] = useState("available")
  const [selectedListing, setSelectedListing] = useState<any>(null)
  const [requestDialogOpen, setRequestDialogOpen] = useState(false)
  const [requestMessage, setRequestMessage] = useState("")

  const filteredListings = availableListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || listing.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesType
  })

  const handleRequestCoBroke = (listing: any) => {
    setSelectedListing(listing)
    setRequestDialogOpen(true)
    setRequestMessage(
      `Hello ${listing.agent.name}, I'm interested in co-broking your listing "${listing.title}" in ${listing.location}. I have potential buyers who might be interested in this property. Please let me know if this is possible.`,
    )
  }

  const submitCobrokeRequest = () => {
    toast({
      title: "Co-Broke Request Sent",
      description: `Your request for "${selectedListing.title}" has been sent to ${selectedListing.agent.name}.`,
    })
    setRequestDialogOpen(false)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">🤝 Co-Broke Listings</h2>
          <p className="text-muted-foreground">Collaborate with agents from other agencies to sell properties</p>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <Share2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-800">What is Co-Broking?</h3>
              <p className="text-sm text-blue-700 mt-1">
                Co-broking allows you to collaborate with agents from other agencies to sell their exclusive listings.
                When you successfully bring a buyer to a co-broke property, you'll earn the specified commission split.
                This expands your inventory without having to secure your own listings.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-200">
                  <div className="font-medium text-blue-800">Request Access</div>
                  <p className="text-xs text-blue-600">Send a request to the listing agent</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-200">
                  <div className="font-medium text-blue-800">Get Approval</div>
                  <p className="text-xs text-blue-600">Wait for the agent to approve your request</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-200">
                  <div className="font-medium text-blue-800">Market the Property</div>
                  <p className="text-xs text-blue-600">Promote to your clients and network</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-200">
                  <div className="font-medium text-blue-800">Earn Commission</div>
                  <p className="text-xs text-blue-600">Get paid when your buyer purchases</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Available Co-Broke Listings
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            My Co-Broke Requests
            <Badge className="ml-1 bg-primary">{myRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            My Active Co-Broke Listings
            <Badge className="ml-1 bg-green-500">{myCobrokeListings.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Available Co-Broke Listings Tab */}
        <TabsContent value="available">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Available Co-Broke Listings</CardTitle>
              <CardDescription>Browse properties from other agencies available for co-broking</CardDescription>
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
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[160px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Property Type</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="condominium">Condominium</SelectItem>
                      <SelectItem value="semi-detached">Semi-Detached</SelectItem>
                      <SelectItem value="bungalow">Bungalow</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={viewMode} onValueChange={setViewMode}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>View</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid View</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Grid View */}
              {viewMode === "grid" && (
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
                            <Badge className="bg-secondary">{listing.commission} Commission</Badge>
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
                                <AvatarImage src={listing.agency.logo} alt={listing.agency.name} />
                                <AvatarFallback>{listing.agency.initials}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{listing.agency.name}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t p-4">
                          <Button
                            onClick={() => handleRequestCoBroke(listing)}
                            className="w-full bg-primary hover:bg-primary/90"
                          >
                            <Share2 className="mr-2 h-4 w-4" />
                            Request Co-Broke
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* List View */}
              {viewMode === "list" && (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Agency</TableHead>
                        <TableHead>Commission</TableHead>
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
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={listing.agency.logo} alt={listing.agency.name} />
                                <AvatarFallback>{listing.agency.initials}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs">{listing.agency.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-secondary/10 text-secondary">{listing.commission}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() => handleRequestCoBroke(listing)}
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Share2 className="mr-2 h-4 w-4" />
                              Request Co-Broke
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Co-Broke Requests Tab */}
        <TabsContent value="requests">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>My Co-Broke Requests</CardTitle>
              <CardDescription>Track the status of your co-broke requests to other agencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Agency</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.title}</TableCell>
                        <TableCell>{request.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={request.agency.logo} alt={request.agency.name} />
                              <AvatarFallback>{request.agency.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{request.agency.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={request.agent.avatar} alt={request.agent.name} />
                              <AvatarFallback>{request.agent.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{request.agent.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              request.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {request.status === "approved"
                              ? "Approved"
                              : request.status === "pending"
                                ? "Pending"
                                : "Rejected"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {request.status === "approved" && (
                              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                <Plus className="mr-2 h-4 w-4" />
                                Add to My Listings
                              </Button>
                            )}
                            {request.status === "pending" && (
                              <Button size="sm" variant="outline">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Follow Up
                              </Button>
                            )}
                            {request.status === "rejected" && (
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
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    View Rejection Reason
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Contact Agent
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Active Co-Broke Listings Tab */}
        <TabsContent value="active">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>My Active Co-Broke Listings</CardTitle>
              <CardDescription>Manage properties you're co-broking from other agencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {myCobrokeListings.map((listing) => (
                  <motion.div key={listing.id} variants={item}>
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="relative">
                        <img
                          src={listing.image || "/placeholder.svg"}
                          alt={listing.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Badge className="bg-green-500">Active Co-Broke</Badge>
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
                              <AvatarImage src={listing.agency.logo} alt={listing.agency.name} />
                              <AvatarFallback>{listing.agency.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{listing.agency.name}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <Search className="h-3 w-3" />
                              <span>{listing.views} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{listing.leads} leads</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Share2 className="h-3 w-3" />
                              <span>{listing.commission} commission</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t p-4 flex justify-between">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contact Owner
                        </Button>
                        <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Listing
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Co-Broke Request Dialog */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Co-Broke Access</DialogTitle>
            <DialogDescription>Send a message to the listing agent to request co-broke permission.</DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="flex items-center gap-3 py-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedListing.agent.avatar} alt={selectedListing.agent.name} />
                <AvatarFallback>{selectedListing.agent.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{selectedListing.agent.name}</div>
                <div className="text-sm text-muted-foreground">{selectedListing.agency.name}</div>
              </div>
            </div>
          )}
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Introduce yourself and explain why you'd like to co-broke this listing.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitCobrokeRequest} className="bg-primary hover:bg-primary/90">
              <Share2 className="mr-2 h-4 w-4" />
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

