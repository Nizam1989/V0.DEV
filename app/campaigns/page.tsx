"use client"

import { useState } from "react"
import { Check, Download, Filter, Mail, MoreHorizontal, Search, Send, PhoneIcon as WhatsApp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for leads
const leads = [
  {
    id: "1",
    name: "Ahmad Ismail",
    phone: "+60 12-345-6789",
    email: "ahmad.ismail@example.com",
    type: "Buyer",
    status: "New",
    location: "Damansara",
    date: "2023-06-15",
  },
  {
    id: "2",
    name: "Tan Wei Ming",
    phone: "+60 13-456-7890",
    email: "tan.wm@example.com",
    type: "Seller",
    status: "Contacted",
    location: "Subang Jaya",
    date: "2023-06-12",
  },
  {
    id: "3",
    name: "Siti Aminah",
    phone: "+60 14-567-8901",
    email: "siti.aminah@example.com",
    type: "Buyer",
    status: "Viewing",
    location: "KLCC",
    date: "2023-06-10",
  },
  {
    id: "4",
    name: "Lee Mei Hua",
    phone: "+60 15-678-9012",
    email: "lee.mh@example.com",
    type: "Seller",
    status: "Contacted",
    location: "Bangsar",
    date: "2023-06-08",
  },
  {
    id: "5",
    name: "Raj Kumar",
    phone: "+60 16-789-0123",
    email: "raj.kumar@example.com",
    type: "Buyer",
    status: "New",
    location: "Sunway",
    date: "2023-06-05",
  },
  {
    id: "6",
    name: "Nurul Huda",
    phone: "+60 17-890-1234",
    email: "nurul.h@example.com",
    type: "Buyer",
    status: "New",
    location: "Shah Alam",
    date: "2023-06-03",
  },
  {
    id: "7",
    name: "David Wong",
    phone: "+60 18-901-2345",
    email: "david.wong@example.com",
    type: "Seller",
    status: "Closed",
    location: "Petaling Jaya",
    date: "2023-06-01",
  },
]

export default function CampaignsPage() {
  const [selectedTab, setSelectedTab] = useState("whatsapp")
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [whatsappMessage, setWhatsappMessage] = useState(
    "Hi {name}, this is Sarah from PropertyHub. We have property options in {location} you might like! Would you be interested in viewing some properties this week?",
  )
  const [emailSubject, setEmailSubject] = useState("Exclusive Property Listings Just For You")
  const [emailBody, setEmailBody] = useState(
    "Dear {name},\n\nI hope this email finds you well. I'm Sarah from PropertyHub, and I wanted to share some exclusive property listings in {location} that match your preferences.\n\nWould you be available for a viewing this week? I'd be happy to arrange it at your convenience.\n\nBest regards,\nSarah Johnson\nPropertyHub Agent\n+60 12-345-6789",
  )
  const [sendingWhatsapp, setSendingWhatsapp] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [whatsappResults, setWhatsappResults] = useState<
    { id: string; name: string; status: "success" | "failed"; message?: string }[]
  >([])
  const [emailResults, setEmailResults] = useState<
    { id: string; name: string; status: "success" | "failed"; message?: string }[]
  >([])

  // Filter leads based on search term, type, and status
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || lead.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || lead.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(filteredLeads.map((lead) => lead.id))
    }
    setSelectAll(!selectAll)
  }

  // Handle individual lead selection
  const handleSelectLead = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter((leadId) => leadId !== id))
      setSelectAll(false)
    } else {
      setSelectedLeads([...selectedLeads, id])
      if (selectedLeads.length + 1 === filteredLeads.length) {
        setSelectAll(true)
      }
    }
  }

  // Send WhatsApp campaign
  const sendWhatsappCampaign = () => {
    if (selectedLeads.length === 0) {
      toast({
        title: "No leads selected",
        description: "Please select at least one lead to send the campaign.",
        variant: "destructive",
      })
      return
    }

    setSendingWhatsapp(true)

    // Simulate API call
    setTimeout(() => {
      const results = selectedLeads.map((id) => {
        const lead = leads.find((l) => l.id === id)!
        // Randomly succeed or fail for demo purposes
        const success = Math.random() > 0.2
        return {
          id,
          name: lead.name,
          status: success ? ("success" as const) : ("failed" as const),
          message: success ? undefined : "Failed to send: Invalid phone number format",
        }
      })

      setWhatsappResults(results)
      setSendingWhatsapp(false)

      const successCount = results.filter((r) => r.status === "success").length
      toast({
        title: `WhatsApp Campaign Sent`,
        description: `Successfully sent to ${successCount} out of ${results.length} leads.`,
        variant: successCount === results.length ? "default" : "destructive",
      })
    }, 2000)
  }

  // Send Email campaign
  const sendEmailCampaign = () => {
    if (selectedLeads.length === 0) {
      toast({
        title: "No leads selected",
        description: "Please select at least one lead to send the campaign.",
        variant: "destructive",
      })
      return
    }

    if (!emailSubject.trim()) {
      toast({
        title: "Subject required",
        description: "Please enter an email subject.",
        variant: "destructive",
      })
      return
    }

    setSendingEmail(true)

    // Simulate API call
    setTimeout(() => {
      const results = selectedLeads.map((id) => {
        const lead = leads.find((l) => l.id === id)!
        // Randomly succeed or fail for demo purposes
        const success = Math.random() > 0.2
        return {
          id,
          name: lead.name,
          status: success ? ("success" as const) : ("failed" as const),
          message: success ? undefined : "Failed to send: Invalid email address",
        }
      })

      setEmailResults(results)
      setSendingEmail(false)

      const successCount = results.filter((r) => r.status === "success").length
      toast({
        title: `Email Campaign Sent`,
        description: `Successfully sent to ${successCount} out of ${results.length} leads.`,
        variant: successCount === results.length ? "default" : "destructive",
      })
    }, 2000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="text-secondary hover:text-secondary/90 hover:bg-secondary/10">
            <Download className="mr-2 h-4 w-4" />
            Export Leads
          </Button>
        </div>
      </div>

      <Tabs defaultValue="whatsapp" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <WhatsApp className="h-4 w-4" />
            WhatsApp Campaigns
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Campaigns
          </TabsTrigger>
        </TabsList>

        {/* WhatsApp Campaign Tab */}
        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WhatsApp className="h-5 w-5 text-green-600" />
                WhatsApp Campaign Blast
              </CardTitle>
              <CardDescription>
                Select leads and send custom WhatsApp messages using your API integration (e.g., UltraMsg or 360Dialog)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
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
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Leads Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} aria-label="Select all" />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Lead Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedLeads.includes(lead.id)}
                            onCheckedChange={() => handleSelectLead(lead.id)}
                            aria-label={`Select ${lead.name}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
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
                                <WhatsApp className="mr-2 h-4 w-4 text-green-600" />
                                Send Individual Message
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-primary">Remove from Campaign</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Message Template */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Message Template</h3>
                  <Badge variant="outline" className="text-xs">
                    {selectedLeads.length} leads selected
                  </Badge>
                </div>
                <Textarea
                  placeholder="Hi {name}, this is {agentName}. We have property options in {location} you might like!"
                  className="min-h-32 resize-none"
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  You can use placeholders like {"{name}"}, {"{location}"}, {"{agentName}"} which will be replaced with
                  the lead's information.
                </p>
              </div>

              {/* Send Button */}
              <div className="flex justify-end">
                <Button
                  onClick={sendWhatsappCampaign}
                  disabled={sendingWhatsapp || selectedLeads.length === 0}
                  className="bg-primary hover:bg-primary/90"
                >
                  {sendingWhatsapp ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send WhatsApp Blast
                    </>
                  )}
                </Button>
              </div>

              {/* Results */}
              {whatsappResults.length > 0 && (
                <div className="space-y-2 border rounded-md p-4 bg-muted/20">
                  <h3 className="text-lg font-medium">Campaign Results</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {whatsappResults.map((result) => (
                      <div
                        key={result.id}
                        className={`flex items-center justify-between p-2 rounded-md ${
                          result.status === "success" ? "bg-green-50" : "bg-red-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {result.status === "success" ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <span className="h-4 w-4 text-red-600">✕</span>
                          )}
                          <span className="font-medium">{result.name}</span>
                        </div>
                        <span className={result.status === "success" ? "text-green-600" : "text-red-600"}>
                          {result.status === "success" ? "Sent successfully" : result.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Campaign Tab */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-secondary" />
                Email Campaign Blast
              </CardTitle>
              <CardDescription>
                Send custom email messages to selected leads using Brevo (Sendinblue) API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
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
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Leads Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} aria-label="Select all" />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Lead Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedLeads.includes(lead.id)}
                            onCheckedChange={() => handleSelectLead(lead.id)}
                            aria-label={`Select ${lead.name}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
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
                                <Mail className="mr-2 h-4 w-4 text-secondary" />
                                Send Individual Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-primary">Remove from Campaign</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Email Template */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Email Template</h3>
                  <Badge variant="outline" className="text-xs">
                    {selectedLeads.length} leads selected
                  </Badge>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    placeholder="Exclusive Property Listings Just For You"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Body</label>
                  <Textarea
                    placeholder="Dear {name}, I hope this email finds you well..."
                    className="min-h-48 resize-none"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    You can use placeholders like {"{name}"}, {"{location}"}, {"{agentName}"} which will be replaced
                    with the lead's information.
                  </p>
                </div>
              </div>

              {/* Send Button */}
              <div className="flex justify-end">
                <Button
                  onClick={sendEmailCampaign}
                  disabled={sendingEmail || selectedLeads.length === 0 || !emailSubject.trim()}
                  className="bg-secondary hover:bg-secondary/90"
                >
                  {sendingEmail ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Email Campaign
                    </>
                  )}
                </Button>
              </div>

              {/* Results */}
              {emailResults.length > 0 && (
                <div className="space-y-2 border rounded-md p-4 bg-muted/20">
                  <h3 className="text-lg font-medium">Campaign Results</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {emailResults.map((result) => (
                      <div
                        key={result.id}
                        className={`flex items-center justify-between p-2 rounded-md ${
                          result.status === "success" ? "bg-green-50" : "bg-red-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {result.status === "success" ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <span className="h-4 w-4 text-red-600">✕</span>
                          )}
                          <span className="font-medium">{result.name}</span>
                        </div>
                        <span className={result.status === "success" ? "text-green-600" : "text-red-600"}>
                          {result.status === "success" ? "Sent successfully" : result.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

