"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  type: z.string({
    required_error: "Please select a property type.",
  }),
  size: z.string().min(1, {
    message: "Size is required.",
  }),
  bedrooms: z.string().min(1, {
    message: "Number of bedrooms is required.",
  }),
  bathrooms: z.string().min(1, {
    message: "Number of bathrooms is required.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  published: z.boolean().default(false),
})

export default function NewListingPage() {
  const [images, setImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "",
      location: "",
      type: "",
      size: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
      published: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Listing created",
      description: "Your listing has been created successfully.",
    })
    console.log(values)
  }

  const handleImageUpload = () => {
    // In a real app, this would handle file uploads
    // For demo purposes, we'll just add a placeholder
    setImages([...images, "/placeholder.svg?height=200&width=300"])
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/listings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Add New Listing</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-full md:col-span-2">
              <CardContent className="p-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <h3 className="text-xl font-medium">Property Details</h3>
                    <p className="text-sm text-muted-foreground">Enter the basic information about the property.</p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Modern Apartment in Damansara" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input placeholder="450000" {...field} />
                          </FormControl>
                          <FormDescription>Enter the price in RM.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Damansara, Kuala Lumpur" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="house">House</SelectItem>
                              <SelectItem value="villa">Villa</SelectItem>
                              <SelectItem value="penthouse">Penthouse</SelectItem>
                              <SelectItem value="studio">Studio</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size (sq ft)</FormLabel>
                          <FormControl>
                            <Input placeholder="1200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bedrooms</FormLabel>
                            <FormControl>
                              <Input placeholder="3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bathrooms</FormLabel>
                            <FormControl>
                              <Input placeholder="2" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe the property in detail..."
                                className="min-h-32 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-full md:col-span-1">
              <CardContent className="p-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <h3 className="text-xl font-medium">Photos</h3>
                    <p className="text-sm text-muted-foreground">Upload photos of the property.</p>
                  </div>
                  <div className="grid gap-4">
                    <div
                      className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 text-center"
                      onClick={handleImageUpload}
                    >
                      <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload</p>
                      <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Property image ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <h3 className="text-xl font-medium">Publishing</h3>
                    <p className="text-sm text-muted-foreground">Control the visibility of your listing.</p>
                  </div>
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Publish Listing</FormLabel>
                          <FormDescription>Make this listing visible to potential buyers.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/listings">Cancel</Link>
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Create Listing
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

