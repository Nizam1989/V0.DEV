"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Info, Mail, Save, PhoneIcon as WhatsappIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

const whatsappFormSchema = z.object({
  instanceId: z.string().min(5, {
    message: "Instance ID must be at least 5 characters.",
  }),
  apiToken: z.string().min(8, {
    message: "API token must be at least 8 characters.",
  }),
})

const emailFormSchema = z.object({
  brevoApiKey: z
    .string()
    .min(10, {
      message: "Brevo API key must be at least 10 characters.",
    })
    .startsWith("xkeysib-", {
      message: "Brevo API key should start with 'xkeysib-'",
    }),
  senderEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function IntegrationsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [whatsappConnected, setWhatsappConnected] = useState(false)
  const [emailConnected, setEmailConnected] = useState(false)

  const whatsappForm = useForm<z.infer<typeof whatsappFormSchema>>({
    resolver: zodResolver(whatsappFormSchema),
    defaultValues: {
      instanceId: "",
      apiToken: "",
    },
  })

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      brevoApiKey: "",
      senderEmail: "",
    },
  })

  function onWhatsappSubmit(values: z.infer<typeof whatsappFormSchema>) {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log("WhatsApp integration values:", values)
      setWhatsappConnected(true)
      setIsSaving(false)
      toast({
        title: "WhatsApp integration saved",
        description: "Your WhatsApp API settings have been saved successfully.",
      })
    }, 1500)
  }

  function onEmailSubmit(values: z.infer<typeof emailFormSchema>) {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Email integration values:", values)
      setEmailConnected(true)
      setIsSaving(false)
      toast({
        title: "Email integration saved",
        description: "Your Brevo email API settings have been saved successfully.",
      })
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/settings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Integration Settings</h2>
      </div>

      <div className="grid gap-6">
        {/* WhatsApp API Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <WhatsappIcon className="h-5 w-5 text-green-600" />
              WhatsApp API Settings
            </CardTitle>
            <CardDescription>
              Connect your WhatsApp Business API to send messages directly from this dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {whatsappConnected && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <Info className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Connected</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your WhatsApp API is connected and working properly.
                </AlertDescription>
              </Alert>
            )}

            <Form {...whatsappForm}>
              <form onSubmit={whatsappForm.handleSubmit(onWhatsappSubmit)} className="space-y-6">
                <FormField
                  control={whatsappForm.control}
                  name="instanceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instance ID (for UltraMsg or 360Dialog)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. instance12345" {...field} />
                      </FormControl>
                      <FormDescription>Get this from your WhatsApp API provider dashboard</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={whatsappForm.control}
                  name="apiToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Token</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="e.g. a1b2c3d4e5" {...field} />
                      </FormControl>
                      <FormDescription>Paste your token to allow WhatsApp sending from this dashboard</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      We support UltraMsg and 360Dialog.
                      <a
                        href="https://docs.ultramsg.com/api/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 font-medium underline hover:text-blue-600"
                      >
                        Learn how to get your API keys.
                      </a>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save WhatsApp Settings
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Brevo Email API Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-secondary" />
              Brevo Email API Settings
            </CardTitle>
            <CardDescription>Connect your Brevo (formerly Sendinblue) account to send email campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            {emailConnected && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <Info className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Connected</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your Brevo email API is connected and working properly.
                </AlertDescription>
              </Alert>
            )}

            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                <FormField
                  control={emailForm.control}
                  name="brevoApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brevo (Sendinblue) API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="e.g. xkeysib-xxxxx" {...field} />
                      </FormControl>
                      <FormDescription>
                        You can find this in your Brevo dashboard under SMTP & API settings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emailForm.control}
                  name="senderEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. ejenanda@tokanproperty.com" {...field} />
                      </FormControl>
                      <FormDescription>The email address that will appear in outgoing emails</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      Brevo (formerly Sendinblue) is a reliable email service provider with high deliverability rates.
                      <a
                        href="https://developers.brevo.com/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 font-medium underline hover:text-blue-600"
                      >
                        Learn how to get your API keys.
                      </a>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Email Settings
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-start border-t px-6 py-4">
            <h3 className="text-sm font-medium">Why connect Brevo?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Connecting Brevo allows you to send professional email campaigns to your leads directly from this
              dashboard. Brevo offers high deliverability rates and detailed analytics to track your email performance.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

