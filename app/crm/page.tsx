"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Download, Filter, MessageSquare, Mail, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

// Sample data for CRM leads
const leads = [
  {
    id: "1",
    name: "Ahmad Ismail",
    type: "Buyer",
    contact: "+60 12-345-6789",
    notes: "Looking for 3-bedroom apartment in Damansara",
    status: "New",
    date: "2023-06-15",
  },
  {
    id: "2",
    name: "Tan Wei Ming",
    type: "Seller",
    contact: "+60 13-456-7890",
    notes: "Selling property in Subang Jaya, motivated seller",
    status: "Contacted",
    date: "2023-06-12",
  },
  {
    id: "3",
    name: "Siti Aminah",
    type: "Buyer",
    contact: "+60 14-567-8901",
    notes: "Looking for luxury properties in KLCC area",
    status: "Viewing",
    date: "2023-06-10",
  },
  {
    id: "4",
    name: "Lee Mei Hua",
    type: "Seller",
    contact: "+60 15-678-9012",
    notes: "Inherited property in Bangsar, never lived in",
    status: "Closed",
    date: "2023-06-08",
  },
  {
    id: "5",
    name: "Raj Kumar",
    type: "Buyer",
    contact: "+60 16-789-0123",
    notes: "Looking for commercial property in KL",
    status: "Lost",
    date: "2023-06-05",
  },
]

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.notes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || lead.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">CRM (Leads Management)</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="text-secondary hover:text-secondary/90 hover:bg-secondary/10">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>Manage all your buyer and seller leads in one place.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Status</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="viewing">Viewing</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Type</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" className="p-0 hover:bg-transparent">
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Lead Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 hover:bg-transparent">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        lead.type === "Buyer" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                      }
                    >
                      {lead.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.contact}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={lead.notes}>
                    {lead.notes}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        lead.status === "New"
                          ? "bg-blue-100 text-blue-800"
                          : lead.status === "Contacted"
                            ? "bg-amber-100 text-amber-800"
                            : lead.status === "Viewing"
                              ? "bg-purple-100 text-purple-800"
                              : lead.status === "Closed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-secondary">
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">WhatsApp</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
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
                          <DropdownMenuItem>Add Note</DropdownMenuItem>
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-primary">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

