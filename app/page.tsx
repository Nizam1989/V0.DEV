"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building,
  Copy,
  ExternalLink,
  Eye,
  LineChart,
  MessageSquare,
  Share,
  Share2,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for charts
const performanceData = [
  { name: "Mon", views: 120, leads: 8 },
  { name: "Tue", views: 150, leads: 12 },
  { name: "Wed", views: 180, leads: 15 },
  { name: "Thu", views: 220, leads: 20 },
  { name: "Fri", views: 250, leads: 22 },
  { name: "Sat", views: 280, leads: 25 },
  { name: "Sun", views: 300, leads: 30 },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex-1 space-y-6 p-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Microsite Performance Overview */}
        <motion.div variants={item} className="col-span-full">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">📈 Microsite Performance</CardTitle>
                  <CardDescription className="text-white/80">
                    Your personal property microsite at <span className="font-medium">ejenanda.tokanproperty.my</span>
                  </CardDescription>
                </div>
                <Button variant="outline" className="bg-white/20 text-white hover:bg-white/30 border-white/40">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Microsite
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="conversion">Conversion</TabsTrigger>
                  <TabsTrigger value="sharing">Sharing</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-primary">1,248</div>
                        <div className="flex items-center text-xs text-green-600 mt-1">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          <span>+12% from last week</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-secondary">132</div>
                        <div className="flex items-center text-xs text-green-600 mt-1">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          <span>+8% from last week</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-success/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-success">10.6%</div>
                        <div className="flex items-center text-xs text-green-600 mt-1">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          <span>+2.3% from last week</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Weekly Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ChartContainer
                          className="h-full w-full"
                          data={performanceData}
                          xAxisKey="name"
                          yAxisWidth={30}
                        >
                          <BarChart
                            className="h-full w-full"
                            dataKey="views"
                            fill="#0066FF" // Primary blue
                            opacity={0.8}
                          />
                          <BarChart
                            className="h-full w-full"
                            dataKey="leads"
                            fill="#FF3366" // Secondary pink
                            opacity={0.8}
                          />
                          <ChartTooltip>
                            <ChartTooltipContent />
                          </ChartTooltip>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="conversion" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Conversion Funnel</CardTitle>
                      <CardDescription>How visitors convert to leads</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Page Views</span>
                          </div>
                          <span className="font-medium">1,248</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Listing Views</span>
                          </div>
                          <span className="font-medium">864</span>
                        </div>
                        <Progress value={69} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Smartphone className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Contact Button Clicks</span>
                          </div>
                          <span className="font-medium">215</span>
                        </div>
                        <Progress value={17} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Form Submissions</span>
                          </div>
                          <span className="font-medium">132</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Converting Listings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                            <Building className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">Damansara Heights Condo</div>
                            <div className="text-sm text-muted-foreground">18.5% conversion rate</div>
                          </div>
                          <Badge className="bg-success">+24%</Badge>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                            <Building className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">Mont Kiara Residence</div>
                            <div className="text-sm text-muted-foreground">15.2% conversion rate</div>
                          </div>
                          <Badge className="bg-success">+12%</Badge>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                            <Building className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">Bangsar South Apartment</div>
                            <div className="text-sm text-muted-foreground">12.8% conversion rate</div>
                          </div>
                          <Badge className="bg-success">+8%</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Conversion by Source</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                            <span>Direct</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">42%</span>
                            <Progress value={42} className="h-2 w-24" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                            <span>WhatsApp Shares</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">28%</span>
                            <Progress value={28} className="h-2 w-24" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
                            <span>Social Media</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">18%</span>
                            <Progress value={18} className="h-2 w-24" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-warning mr-2"></div>
                            <span>Email Campaigns</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">12%</span>
                            <Progress value={12} className="h-2 w-24" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="sharing" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>WhatsApp Sharing</CardTitle>
                      <CardDescription>Track your WhatsApp sharing performance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Total Shares</div>
                          <div className="text-2xl font-bold">248</div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Click-through Rate</div>
                          <div className="text-2xl font-bold">32.5%</div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Conversion Rate</div>
                          <div className="text-2xl font-bold">8.2%</div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Share your microsite</div>
                          <Button variant="outline" size="sm">
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90">
                            <Share className="mr-2 h-4 w-4" />
                            Share via WhatsApp
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Share2 className="mr-2 h-4 w-4" />
                            Other Platforms
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Domain Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">ejenanda.tokanproperty.my</div>
                            <div className="text-sm text-muted-foreground">Default subdomain</div>
                          </div>
                          <Badge className="bg-success">Active</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">ejenanda.com</div>
                            <div className="text-sm text-muted-foreground">Custom domain</div>
                          </div>
                          <Badge variant="outline" className="text-muted-foreground">
                            Not configured
                          </Badge>
                        </div>

                        <Button variant="outline" className="w-full">
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Configure Custom Domain
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Content Assistant */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">🧠 AI Content Assistant</CardTitle>
                  <CardDescription>Generate content for your listings and communications</CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-primary to-secondary text-white">Power Tool</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Property Titles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Generate catchy titles for your property listings</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Zap className="mr-2 h-4 w-4 text-primary" />
                      Generate
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-secondary/5 hover:bg-secondary/10 transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Property Descriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Create compelling descriptions that sell</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Zap className="mr-2 h-4 w-4 text-secondary" />
                      Generate
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-success/5 hover:bg-success/10 transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">TikTok Scripts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Create viral-worthy TikTok video scripts</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Zap className="mr-2 h-4 w-4 text-success" />
                      Generate
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="gradient-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-warning" />
                    Viral Listing Idea of the Day
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <span className="font-medium">Create a "Virtual Neighborhood Tour" video series</span> - Walk
                    through the neighborhood highlighting local cafes, parks, and amenities. Show the lifestyle, not
                    just the property. This content performs 3.2x better than standard property tours.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                  <Button size="sm" className="bg-warning hover:bg-warning/90 text-black">
                    Try This Idea
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">WhatsApp Follow-up Message Writer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">Generate personalized follow-up messages for leads</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Users className="mr-2 h-4 w-4" />
                      New Lead
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      After Viewing
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <LineChart className="mr-2 h-4 w-4" />
                      Price Negotiation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">New Lead: John Doe</p>
                  <p className="text-xs text-muted-foreground">Interested in Damansara Heights Condo</p>
                </div>
                <div className="text-xs text-muted-foreground">2h ago</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Share2 className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Co-Broke Request Approved</p>
                  <p className="text-xs text-muted-foreground">Mont Kiara Residence (5% commission)</p>
                </div>
                <div className="text-xs text-muted-foreground">5h ago</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Building className="h-4 w-4 text-secondary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">New Agency Listings</p>
                  <p className="text-xs text-muted-foreground">5 new listings added to masterlist</p>
                </div>
                <div className="text-xs text-muted-foreground">1d ago</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-success/10 flex items-center justify-center">
                  <Eye className="h-4 w-4 text-success" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">High Traffic Alert</p>
                  <p className="text-xs text-muted-foreground">Your Bangsar listing got 50+ views today</p>
                </div>
                <div className="text-xs text-muted-foreground">1d ago</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={container} initial="hidden" animate="show">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div variants={item}>
                <Button
                  variant="outline"
                  className="w-full h-auto flex flex-col items-center justify-center py-4 px-2 gap-2"
                >
                  <Building className="h-6 w-6 text-primary" />
                  <span className="text-xs text-center">Add New Listing</span>
                </Button>
              </motion.div>

              <motion.div variants={item}>
                <Button
                  variant="outline"
                  className="w-full h-auto flex flex-col items-center justify-center py-4 px-2 gap-2"
                >
                  <Share2 className="h-6 w-6 text-secondary" />
                  <span className="text-xs text-center">Request Co-Broke</span>
                </Button>
              </motion.div>

              <motion.div variants={item}>
                <Button
                  variant="outline"
                  className="w-full h-auto flex flex-col items-center justify-center py-4 px-2 gap-2"
                >
                  <MessageSquare className="h-6 w-6 text-success" />
                  <span className="text-xs text-center">Create Campaign</span>
                </Button>
              </motion.div>

              <motion.div variants={item}>
                <Button
                  variant="outline"
                  className="w-full h-auto flex flex-col items-center justify-center py-4 px-2 gap-2"
                >
                  <Zap className="h-6 w-6 text-warning" />
                  <span className="text-xs text-center">AI Assistant</span>
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

