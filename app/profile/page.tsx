"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Building,
  Calendar,
  CheckCircle,
  Edit,
  Mail,
  MapPin,
  Phone,
  Save,
  Upload,
  User,
  Users,
  Award,
  Star,
  Clock,
  BarChart2,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not exceed 500 characters.",
  }),
  specialization: z.string().min(1, {
    message: "Please select a specialization.",
  }),
  experience: z.string().min(1, {
    message: "Please select your years of experience.",
  }),
  languages: z.string().min(1, {
    message: "Please enter at least one language.",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  name: "Sarah Johnson",
  email: "sarah.johnson@tokanproperty.com",
  phone: "+60 12-345-6789",
  address: "Jalan Ampang, Kuala Lumpur, Malaysia",
  bio: "Experienced real estate agent with over 5 years in the industry. Specializing in luxury properties and residential real estate in Kuala Lumpur and Selangor.",
  specialization: "luxury",
  experience: "5",
  languages: "English, Malay, Mandarin",
}

const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(true),
  appNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
  newListingAlerts: z.boolean().default(true),
  leadNotifications: z.boolean().default(true),
})

type NotificationSettingsValues = z.infer<typeof notificationSettingsSchema>

const defaultNotificationSettings: NotificationSettingsValues = {
  emailNotifications: true,
  smsNotifications: true,
  appNotifications: true,
  marketingEmails: false,
  newListingAlerts: true,
  leadNotifications: true,
}

export default function ProfilePage() {
  const [avatar, setAvatar] = useState("/placeholder.svg?height=200&width=200")
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const notificationForm = useForm<NotificationSettingsValues>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: defaultNotificationSettings,
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
    setIsEditing(false)
    console.log(data)
  }

  function onNotificationSettingsSubmit(data: NotificationSettingsValues) {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    })
    console.log(data)
  }

  const handleAvatarUpload = () => {
    // In a real app, this would handle file uploads
    toast({
      title: "Avatar updated",
      description: "Your profile picture has been updated successfully.",
    })
  }

  // Sample performance data
  const performanceStats = [
    { label: "Listings", value: 24, icon: Home },
    { label: "Closed Deals", value: 18, icon: CheckCircle },
    { label: "Active Clients", value: 32, icon: Users },
    { label: "Avg. Response Time", value: "2h", icon: Clock },
  ]

  // Sample recent activities
  const recentActivities = [
    {
      id: 1,
      type: "listing",
      title: "Added new listing",
      description: "Luxury Penthouse in KLCC",
      date: "2 days ago",
      icon: Home,
    },
    {
      id: 2,
      type: "client",
      title: "New client acquired",
      description: "Ahmad Ismail is interested in Damansara Heights properties",
      date: "3 days ago",
      icon: User,
    },
    {
      id: 3,
      type: "deal",
      title: "Closed deal",
      description: "Mont Kiara Residence sold for RM 1.2M",
      date: "1 week ago",
      icon: CheckCircle,
    },
    {
      id: 4,
      type: "award",
      title: "Received award",
      description: "Top Performing Agent - Q2 2023",
      date: "2 weeks ago",
      icon: Award,
    },
  ]

  // Sample certifications
  const certifications = [
    {
      id: 1,
      name: "Registered Real Estate Agent (REN)",
      issuer: "Board of Valuers, Appraisers, Estate Agents and Property Managers",
      date: "2018",
      icon: Award,
    },
    {
      id: 2,
      name: "Certified Luxury Home Marketing Specialist",
      issuer: "Institute for Luxury Home Marketing",
      date: "2020",
      icon: Award,
    },
    {
      id: 3,
      name: "Certified International Property Specialist",
      issuer: "National Association of Realtors",
      date: "2021",
      icon: Award,
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? "bg-primary hover:bg-primary/90" : ""}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Profile Details</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32 border-4 border-primary">
                    <AvatarImage src={avatar} alt="Sarah Johnson" />
                    <AvatarFallback className="text-2xl">SJ</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
                      <Upload className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                  )}
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold">Sarah Johnson</h3>
                    <p className="text-muted-foreground">Premium Property Agent</p>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-1 text-sm text-muted-foreground">(4.9)</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        <Building className="mr-1 h-3 w-3" />
                        Luxury Property Specialist
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />5 Years Experience
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>sarah.johnson@tokanproperty.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+60 12-345-6789</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Kuala Lumpur, Malaysia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>32 Active Clients</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">About Me</h4>
                    <p className="text-muted-foreground">
                      Experienced real estate agent with over 5 years in the industry. Specializing in luxury properties
                      and residential real estate in Kuala Lumpur and Selangor. Committed to providing exceptional
                      service and finding the perfect property for my clients.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {performanceStats.map((stat, index) => (
                      <Card key={index} className="bg-muted/50">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                          <stat.icon className="h-8 w-8 text-primary mb-2" />
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Your latest actions and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <activity.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{activity.title}</p>
                          <span className="text-xs text-muted-foreground">{activity.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certifications & Licenses
                </CardTitle>
                <CardDescription>Your professional qualifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <cert.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{cert.name}</p>
                          <span className="text-xs text-muted-foreground">{cert.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profile Details Tab */}
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal and professional details</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Sarah Johnson" {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="sarah.johnson@example.com" {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+60 12-345-6789" {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Jalan Ampang, Kuala Lumpur" {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialization</FormLabel>
                          <Select disabled={!isEditing} onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your specialization" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="luxury">Luxury Properties</SelectItem>
                              <SelectItem value="residential">Residential Properties</SelectItem>
                              <SelectItem value="commercial">Commercial Properties</SelectItem>
                              <SelectItem value="investment">Investment Properties</SelectItem>
                              <SelectItem value="international">International Properties</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <Select disabled={!isEditing} onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select years of experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 year</SelectItem>
                              <SelectItem value="2">2 years</SelectItem>
                              <SelectItem value="3">3 years</SelectItem>
                              <SelectItem value="5">5 years</SelectItem>
                              <SelectItem value="10">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Languages</FormLabel>
                          <FormControl>
                            <Input placeholder="English, Malay, Mandarin" {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormDescription>Enter languages separated by commas</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell potential clients about yourself..."
                              className="min-h-32 resize-none"
                              {...field}
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormDescription>
                            Write a short bio about yourself and your experience as a real estate agent.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {isEditing && (
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Home className="h-6 w-6 text-primary mr-2" />
                  <div className="text-3xl font-bold">24</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">↑ 12%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Closed Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-primary mr-2" />
                  <div className="text-3xl font-bold">18</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">↑ 8%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <div className="text-3xl font-bold">32</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">↑ 15%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BarChart2 className="h-6 w-6 text-primary mr-2" />
                  <div className="text-3xl font-bold">RM 120K</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">↑ 22%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Your sales performance over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart2 className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                  <p>Sales performance chart would appear here</p>
                  <p className="text-sm">Showing monthly closed deals and revenue</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Acquisition</CardTitle>
                <CardDescription>New clients acquired over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Users className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                  <p>Client acquisition chart would appear here</p>
                  <p className="text-sm">Showing growth in client base over time</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Listings</CardTitle>
              <CardDescription>Your most viewed and inquired listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">Property</th>
                      <th className="p-3 text-left font-medium">Type</th>
                      <th className="p-3 text-left font-medium">Views</th>
                      <th className="p-3 text-left font-medium">Inquiries</th>
                      <th className="p-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-muted"></div>
                          <div>
                            <p className="font-medium">Luxury Penthouse in KLCC</p>
                            <p className="text-xs text-muted-foreground">RM 2,500,000</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">Condominium</td>
                      <td className="p-3">1,245</td>
                      <td className="p-3">32</td>
                      <td className="p-3">
                        <Badge className="bg-amber-100 text-amber-800">For Sale</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-muted"></div>
                          <div>
                            <p className="font-medium">Bangsar South Apartment</p>
                            <p className="text-xs text-muted-foreground">RM 1,200,000</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">Apartment</td>
                      <td className="p-3">980</td>
                      <td className="p-3">28</td>
                      <td className="p-3">
                        <Badge className="bg-amber-100 text-amber-800">For Sale</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-muted"></div>
                          <div>
                            <p className="font-medium">Mont Kiara Residence</p>
                            <p className="text-xs text-muted-foreground">RM 1,500,000</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">Condominium</td>
                      <td className="p-3">875</td>
                      <td className="p-3">24</td>
                      <td className="p-3">
                        <Badge className="bg-green-100 text-green-800">Sold</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-muted"></div>
                          <div>
                            <p className="font-medium">Damansara Heights Bungalow</p>
                            <p className="text-xs text-muted-foreground">RM 4,800,000</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">Bungalow</td>
                      <td className="p-3">750</td>
                      <td className="p-3">18</td>
                      <td className="p-3">
                        <Badge className="bg-amber-100 text-amber-800">For Sale</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-muted"></div>
                          <div>
                            <p className="font-medium">Subang Jaya Terrace House</p>
                            <p className="text-xs text-muted-foreground">RM 850,000</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">Terrace House</td>
                      <td className="p-3">620</td>
                      <td className="p-3">15</td>
                      <td className="p-3">
                        <Badge className="bg-amber-100 text-amber-800">For Sale</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSettingsSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={notificationForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Email Notifications</FormLabel>
                            <FormDescription>Receive notifications via email</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="smsNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">SMS Notifications</FormLabel>
                            <FormDescription>Receive notifications via SMS</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="appNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">App Notifications</FormLabel>
                            <FormDescription>Receive in-app notifications</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Marketing Emails</FormLabel>
                            <FormDescription>Receive marketing and promotional emails</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="newListingAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">New Listing Alerts</FormLabel>
                            <FormDescription>Get notified when new listings match your criteria</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="leadNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Lead Notifications</FormLabel>
                            <FormDescription>Get notified immediately when you receive new leads</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Save Notification Settings
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Change Password</h3>
                  <p className="text-sm text-muted-foreground">Update your password for enhanced security</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Connected Accounts</h3>
                  <p className="text-sm text-muted-foreground">Manage your connected social and third-party accounts</p>
                </div>
                <Button variant="outline">Manage Connections</Button>
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4 border-destructive/50">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium text-destructive">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all your data</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

