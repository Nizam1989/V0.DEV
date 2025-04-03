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

// Sample data for owner leads
const leads = [
  {
    id: "1",
    name: "Tan Wei Ming",
    contact: "+60 12-345-6789",
    address: "123 Jalan Bukit Bintang, Kuala Lumpur",
    expectedPrice: "RM 450,000",
    notes: "Looking to sell quickly due to relocation",
    date: "2023-06-15",
    status: "New",
  },
  {
    id: "2",
    name: "Nurul Huda",
    contact: "+60 13-456-7890",
    address: "45 Jalan SS15/4, Subang Jaya, Selangor",
    expectedPrice: "RM 650,000",
    notes: "Property needs minor renovation",
    date: "2023-06-12",
    status: "Contacted",
  },
  {
    id: "3",
    name: "Ganesh Murthy",
    contact: "+60 14-567-8901",
    address: "78 Persiaran KLCC, Kuala Lumpur",
    expectedPrice: "RM 1,200,000",
    notes: "Luxury penthouse with city view",
    date: "2023-06-10",
    status: "Meeting Scheduled",
  },
  {
    id: "4",
    name: "Lee Mei Hua",
    contact: "+60 15-678-9012",
    address: "22 Jalan Telawi, Bangsar, Kuala Lumpur",
    expectedPrice: "RM 850,000",
    notes: "Inherited property, never lived in",
    date: "2023-06-08",
    status: "Contacted",
  },
  {
    id: "5",
    name: "Amir Abdullah",
    contact: "+60 16-789-0123",
    address: "15 Jalan PJU 5/1, Kota Damansara, Selangor",
    expectedPrice: "RM 550,000",
    notes: "Motivated seller, willing to negotiate",
    date: "2023-06-05",
    status: "New",
  },
]

export default function OwnerLeadsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Owner Leads</h2>
        <Button variant="outline" className="text-secondary hover:text-secondary/90 hover:bg-secondary/10">
          <Download className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Owners</CardTitle>
          <CardDescription>Manage leads from property owners looking to sell or rent their properties.</CardDescription>
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
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Expected Price</TableHead>
                <TableHead>Notes</TableHead>
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
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.contact}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={lead.address}>
                    {lead.address}
                  </TableCell>
                  <TableCell>{lead.expectedPrice}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={lead.notes}>
                    {lead.notes}
                  </TableCell>
                  <TableCell>{lead.date}</TableCell>
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

