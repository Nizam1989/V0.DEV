"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Globe, Upload, Key, Mail, PhoneIcon as WhatsappIcon, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

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
  bio: z.string().max(500, {
    message: "Bio must not exceed 500 characters.",
  }),
})

const domainFormSchema = z.object({
  domain: z.string().min(3, {
    message: "Domain must be at least 3 characters.",
  }),
})

const apiKeyFormSchema = z.object({
  apiKey: z.string().min(10, {
    message: "API key must be at least 10 characters.",
  }),
})

export default function SettingsPage() {
  const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100")
  const [activeTab, setActiveTab] = useState("profile")

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+60 12-345-6789",
      bio: "Experienced real estate agent with over 10 years in the industry. Specializing in luxury properties and residential real estate in Kuala Lumpur and Selangor.",
    },
  })

  const domainForm = useForm<z.infer<typeof domainFormSchema>>({
    resolver: zodResolver(domainFormSchema),
    defaultValues: {
      domain: "sarahjohnson-realty",
    },
  })

  const apiKeyForm = useForm<z.infer<typeof apiKeyFormSchema>>({
    resolver: zodResolver(apiKeyFormSchema),
    defaultValues: {
      apiKey: "",
    },
  })

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
    console.log(values)
  }

  function onDomainSubmit(values: z.infer<typeof domainFormSchema>) {
    toast({
      title: "Domain updated",
      description: "Your custom domain has been updated successfully.",
    })
    console.log(values)
  }

  function onApiKeySubmit(values: z.infer<typeof apiKeyFormSchema>) {
    toast({
      title: "API key saved",
      description: "Your OpenAI API key has been saved successfully.",
    })
    console.log(values)
  }

  const handleAvatarUpload = () => {
    // In a real app, this would handle file uploads
    // For demo purposes, we'll just use a placeholder
    setAvatar("/placeholder.svg?height=100&width=100")
    toast({
      title: "Avatar updated",
      description: "Your profile picture has been updated successfully.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="domain">Custom Domain</TabsTrigger>
          <TabsTrigger value="api">AI Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your public profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatar} alt="Profile" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">This will be displayed on your profile and listings.</p>
                  <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Image
                  </Button>
                </div>
              </div>

              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Sarah Johnson" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="sarah.johnson@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+60 12-345-6789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell potential clients about yourself..."
                            className="min-h-32 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Write a short bio about yourself and your experience as a real estate agent.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Domain</CardTitle>
              <CardDescription>Set up a custom domain for your property listings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...domainForm}>
                <form onSubmit={domainForm.handleSubmit(onDomainSubmit)} className="space-y-6">
                  <FormField
                    control={domainForm.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domain Name</FormLabel>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <span className="text-muted-foreground">.propertyhub.my</span>
                        </div>
                        <FormDescription>
                          This will be the URL where clients can view your listings. For example:
                          https://sarahjohnson-realty.propertyhub.my
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Save Domain
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-start border-t px-6 py-4">
              <h3 className="text-lg font-medium">Premium Domains</h3>
              <p className="text-sm text-muted-foreground">
                Upgrade to a premium plan to use your own custom domain (e.g., sarahjohnsonrealty.com).
              </p>
              <Button variant="outline" className="mt-4 text-secondary hover:text-secondary/90 hover:bg-secondary/10">
                Upgrade to Premium
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>Connect to OpenAI API for AI-powered content generation.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...apiKeyForm}>
                <form onSubmit={apiKeyForm.handleSubmit(onApiKeySubmit)} className="space-y-6">
                  <FormField
                    control={apiKeyForm.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OpenAI API Key</FormLabel>
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input type="password" placeholder="sk-..." {...field} />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Your API key is used to generate property descriptions with ChatGPT. Get your API key from the{" "}
                          <a
                            href="https://platform.openai.com/account/api-keys"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:underline"
                          >
                            OpenAI dashboard
                          </a>
                          .
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Save API Key
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-start border-t px-6 py-4">
              <h3 className="text-lg font-medium">API Usage</h3>
              <p className="text-sm text-muted-foreground">
                Your API key is stored securely and only used for generating content within this platform. You will be
                billed directly by OpenAI based on your usage.
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-muted-foreground" />
                External Integrations
              </CardTitle>
              <CardDescription>Connect to third-party services for messaging and email campaigns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2 rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <WhatsappIcon className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">WhatsApp Business API</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connect your WhatsApp Business API to send messages directly from this dashboard.
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link href="/settings/integrations">Configure WhatsApp</Link>
                  </Button>
                </div>

                <div className="flex flex-col gap-2 rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-secondary" />
                    <h3 className="font-medium">Brevo Email API</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connect Brevo (formerly Sendinblue) to send email campaigns to your leads.
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link href="/settings/integrations">Configure Email</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

