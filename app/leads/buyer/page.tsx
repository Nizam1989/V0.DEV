import { ArrowUpDown, MoreHorizontal, Download } from "lucide-react"
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

// Sample data for buyer requests
const requests = [
  {
    id: "1",
    name: "Ahmad Ismail",
    whatsapp: "+60 12-345-6789",
    propertyType: "Apartment",
    budget: "RM 400,000 - RM 500,000",
    location: "Damansara, Kuala Lumpur",
    date: "2023-06-15",
    status: "New",
  },
  {
    id: "2",
    name: "Siti Aminah",
    whatsapp: "+60 13-456-7890",
    propertyType: "House",
    budget: "RM 600,000 - RM 750,000",
    location: "Subang Jaya, Selangor",
    date: "2023-06-12",
    status: "Contacted",
  },
  {
    id: "3",
    name: "Raj Kumar",
    whatsapp: "+60 14-567-8901",
    propertyType: "Penthouse",
    budget: "RM 800,000 - RM 1,000,000",
    location: "KLCC, Kuala Lumpur",
    date: "2023-06-10",
    status: "Viewing Scheduled",
  },
  {
    id: "4",
    name: "Mei Ling",
    whatsapp: "+60 15-678-9012",
    propertyType: "Villa",
    budget: "RM 1,000,000 - RM 1,500,000",
    location: "Bangsar, Kuala Lumpur",
    date: "2023-06-08",
    status: "Contacted",
  },
  {
    id: "5",
    name: "Kamal Hassan",
    whatsapp: "+60 16-789-0123",
    propertyType: "Studio",
    budget: "RM 200,000 - RM 300,000",
    location: "Sunway, Selangor",
    date: "2023-06-05",
    status: "New",
  },
]

export default function BuyerRequestsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Buyer Requests</h2>
        <Button variant="outline" className="text-secondary hover:text-secondary/90 hover:bg-secondary/10">
          <Download className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Potential Buyers</CardTitle>
          <CardDescription>Manage requests from potential buyers looking for properties.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" className="p-0 hover:bg-transparent">
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>WhatsApp Number</TableHead>
                <TableHead>Property Type</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Location</TableHead>
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
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.name}</TableCell>
                  <TableCell>{request.whatsapp}</TableCell>
                  <TableCell>{request.propertyType}</TableCell>
                  <TableCell>{request.budget}</TableCell>
                  <TableCell>{request.location}</TableCell>
                  <TableCell>{request.date}</TableCell>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="text-secondary">WhatsApp Contact</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Add to CRM</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-primary">Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

