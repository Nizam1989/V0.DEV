"use client"

import { useState } from "react"
import {
  ArrowRight,
  Bot,
  Building,
  Camera,
  Check,
  Copy,
  FileText,
  Image,
  Loader2,
  MessageSquare,
  PenTool,
  Send,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

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

// Sample property data for the AI to use
const sampleProperty = {
  title: "Luxury Penthouse in KLCC",
  price: "RM 3,500,000",
  location: "KLCC, Kuala Lumpur",
  type: "Penthouse",
  bedrooms: 4,
  bathrooms: 4,
  size: "3,200 sq ft",
  features: [
    "Private pool",
    "Floor-to-ceiling windows",
    "360° city views",
    "Smart home system",
    "Private elevator",
    "Marble flooring",
    "Designer kitchen",
    "24/7 security",
  ],
  nearbyAmenities: [
    "KLCC Park (5 min walk)",
    "Suria KLCC Mall (8 min walk)",
    "International schools (10 min drive)",
    "Premium restaurants",
    "Luxury hotels",
  ],
}

// Sample chat history
const initialChatHistory = [
  {
    role: "assistant",
    content: "Hello! I'm your AI assistant. How can I help you with your real estate business today?",
  },
]

// Sample prompts for property descriptions
const descriptionPrompts = [
  "Create a luxury property description that highlights exclusivity",
  "Write a family-friendly property description focusing on space and comfort",
  "Generate a description for investors highlighting ROI potential",
  "Create a description emphasizing the property's modern features and technology",
  "Write a description focusing on the neighborhood and lifestyle",
]

// Sample prompts for social media
const socialMediaPrompts = [
  "Create an Instagram caption for a new luxury listing",
  "Write a Facebook post announcing an open house event",
  "Generate a LinkedIn post highlighting my expertise in the luxury market",
  "Create a TikTok script for a property walkthrough video",
  "Write a Twitter thread about the current real estate market trends",
]

// Sample email templates
const emailTemplates = [
  {
    title: "New Listing Announcement",
    subject: "Exclusive New Listing: Luxury Penthouse in KLCC",
    body: "Dear [Client Name],\n\nI'm excited to share with you an exclusive new listing that has just hit the market. This stunning luxury penthouse in KLCC offers breathtaking views and world-class amenities.\n\nKey features include:\n• 4 bedrooms, 4 bathrooms\n• 3,200 sq ft of living space\n• Private pool and terrace\n• Floor-to-ceiling windows with panoramic city views\n\nI believe this property aligns perfectly with your preferences. Would you be interested in scheduling a private viewing this week?\n\nBest regards,\n[Your Name]",
  },
  {
    title: "Follow-up After Viewing",
    subject: "Thank You for Viewing the KLCC Penthouse",
    body: "Dear [Client Name],\n\nThank you for taking the time to view the luxury penthouse in KLCC yesterday. I hope you found the property as impressive as I do.\n\nI'd love to hear your thoughts and answer any questions you might have. If you're interested in moving forward, I can provide more information about the purchasing process and potential negotiation strategies.\n\nLooking forward to hearing from you.\n\nBest regards,\n[Your Name]",
  },
  {
    title: "Market Update",
    subject: "Kuala Lumpur Real Estate Market Update - Q2 2023",
    body: "Dear [Client Name],\n\nI hope this email finds you well. As your dedicated real estate agent, I wanted to share some insights about the current market trends in Kuala Lumpur.\n\nKey highlights:\n• Luxury property prices have increased by 5.2% in KLCC and surrounding areas\n• Interest rates remain favorable for buyers\n• New developments in Mont Kiara and Bangsar South are creating investment opportunities\n\nIf you're considering buying or selling in the near future, now might be an excellent time to discuss your options.\n\nWould you like to schedule a call to discuss how these trends might affect your real estate goals?\n\nBest regards,\n[Your Name]",
  },
]

export default function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const [chatInput, setChatInput] = useState("")
  const [chatHistory, setChatHistory] = useState(initialChatHistory)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // Property description generator states
  const [propertyInput, setPropertyInput] = useState("")
  const [propertyOutput, setPropertyOutput] = useState("")
  const [propertyTone, setPropertyTone] = useState("luxury")
  const [propertyLength, setPropertyLength] = useState("medium")

  // Social media generator states
  const [socialMediaInput, setSocialMediaInput] = useState("")
  const [socialMediaOutput, setSocialMediaOutput] = useState("")
  const [socialMediaPlatform, setSocialMediaPlatform] = useState("instagram")

  // Email generator states
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(emailTemplates[0])
  const [emailSubject, setEmailSubject] = useState(emailTemplates[0].subject)
  const [emailBody, setEmailBody] = useState(emailTemplates[0].body)

  // Image caption generator states
  const [captionOutput, setCaptionOutput] = useState("")

  const handleSendChat = () => {
    if (!chatInput.trim()) return

    // Add user message to chat
    setChatHistory([...chatHistory, { role: "user", content: chatInput }])

    // Clear input and show loading
    const userQuery = chatInput
    setChatInput("")
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (userQuery.toLowerCase().includes("property description")) {
        response =
          "I can help you create compelling property descriptions! Here's a sample:\n\n**Breathtaking Luxury in the Heart of KLCC**\n\nPerched high above the bustling city, this exquisite penthouse offers an unparalleled living experience. Floor-to-ceiling windows frame spectacular panoramic views of the iconic Petronas Towers and city skyline. The 3,200 sq ft of meticulously designed living space features 4 luxurious bedrooms, 4 designer bathrooms, and an open-concept living area perfect for both relaxation and entertainment.\n\nWould you like me to create a more specific description for one of your properties?"
      } else if (userQuery.toLowerCase().includes("market trends")) {
        response =
          "Based on recent data, the Kuala Lumpur luxury property market is showing strong signs of recovery with a 5.2% increase in prices over the last quarter. Areas like KLCC, Bangsar, and Mont Kiara continue to be in high demand among both local and foreign investors. The rental market has stabilized with a slight uptick in yields for premium properties. Would you like more specific information about a particular neighborhood?"
      } else if (userQuery.toLowerCase().includes("email")) {
        response =
          "I can help you draft professional emails to clients! Would you like me to help with a new listing announcement, follow-up after viewing, or a market update email? Just let me know which type you need and any specific details to include."
      } else {
        response =
          "I'm here to help with your real estate business! I can assist with creating property descriptions, drafting emails to clients, generating social media content, analyzing market trends, or answering questions about real estate best practices. What would you like help with today?"
      }

      setChatHistory([...chatHistory, { role: "user", content: userQuery }, { role: "assistant", content: response }])
      setIsGenerating(false)
    }, 2000)
  }

  const generatePropertyDescription = () => {
    if (!propertyInput.trim()) {
      toast({
        title: "Input required",
        description: "Please enter property details to generate a description.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate API call to ChatGPT
    setTimeout(() => {
      const luxuryDescription = `
**Unparalleled Luxury Living in the Heart of KLCC**

Welcome to the pinnacle of sophisticated urban living. This breathtaking penthouse residence offers an extraordinary lifestyle experience that redefines luxury in every sense.

Perched high above the city, this magnificent 3,200 sq ft penthouse showcases unobstructed 360-degree panoramic views of Kuala Lumpur's iconic skyline through dramatic floor-to-ceiling windows. The 4 meticulously designed bedrooms and 4 opulent bathrooms blend functionality with uncompromising elegance.

Step into your private sanctuary where every detail has been thoughtfully curated. The private pool terrace provides an exclusive outdoor retreat while still enjoying the privacy and security of penthouse living. The smart home system allows effortless control of lighting, climate, and entertainment systems with a simple touch.

The designer kitchen features premium European appliances, marble countertops, and custom cabinetry—a chef's dream for both everyday use and sophisticated entertaining. The private elevator ensures discreet and convenient access directly to your residence.

Located in the prestigious KLCC district, residents enjoy proximity to world-class shopping at Suria KLCC, fine dining establishments, luxury hotels, and the verdant KLCC Park. International schools and corporate headquarters are just minutes away.

This exceptional residence isn't merely a home—it's a statement of achievement and a legacy of distinction for the most discerning buyer.
      `

      const familyDescription = `
**Spacious Family Haven with Modern Comforts in KLCC**

Discover the perfect blend of luxury and family-friendly living in this welcoming 3,200 sq ft penthouse in the heart of KLCC. This exceptional home offers generous space for the whole family to thrive while enjoying the convenience of city living.

The thoughtfully designed floor plan features 4 spacious bedrooms and 4 bathrooms, providing ample private space for every family member. The open-concept living and dining areas create a warm, inviting atmosphere perfect for family gatherings and entertaining friends.

Children will delight in the private pool, while parents can relax knowing the 24/7 security system ensures complete safety. The smart home technology simplifies daily life, allowing you to control everything from lighting to temperature with ease.

The gourmet kitchen comes fully equipped with premium appliances and abundant counter space, making meal preparation a joy. Expansive windows throughout the home flood the space with natural light and showcase breathtaking views of the city skyline.

Located just minutes from international schools, KLCC Park, and family-friendly dining options, this home offers the perfect balance of luxury and practicality. The nearby Suria KLCC mall provides convenient shopping, entertainment, and everyday necessities.

This exceptional residence offers your family a premium lifestyle with all the space, comfort, and amenities you desire in Kuala Lumpur's most prestigious neighborhood.
      `

      setPropertyOutput(propertyTone === "luxury" ? luxuryDescription : familyDescription)
      setIsGenerating(false)
    }, 2000)
  }

  const generateSocialMedia = () => {
    if (!socialMediaInput.trim()) {
      toast({
        title: "Input required",
        description: "Please enter details to generate social media content.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      const instagramCaption = `✨ EXCLUSIVE LISTING ALERT! ✨

Just listed: This breathtaking 4-bedroom penthouse in KLCC with panoramic city views and a private pool! 🏙️ 💦

Luxury living reaches new heights with:
• 3,200 sq ft of designer space
• Floor-to-ceiling windows
• Smart home technology
• Private elevator access

This isn't just a home—it's a lifestyle statement. 💯

DM for private viewing appointments! Limited slots available this weekend. 🗓️

#KLRealEstate #LuxuryLiving #KLCC #PenthouseLife #DreamHome #MalaysiaProperty #RealEstateInvestment #PropertyHunting`

      const facebookPost = `🏙️ EXCLUSIVE LUXURY PENTHOUSE IN KLCC - JUST LISTED! 🏙️

I'm excited to present this extraordinary 4-bedroom, 4-bathroom penthouse in the heart of KLCC that redefines luxury living.

Spanning 3,200 sq ft with breathtaking 360° views of the Kuala Lumpur skyline, this residence offers:

✅ Private pool and terrace
✅ Floor-to-ceiling windows throughout
✅ Smart home system
✅ Private elevator access
✅ Designer kitchen with premium appliances
✅ 24/7 security and concierge

Located just minutes from Suria KLCC, international schools, and premium dining establishments, this property combines luxury with unmatched convenience.

🗓️ OPEN HOUSE THIS WEEKEND: Saturday and Sunday, 10 AM - 4 PM
📍 By appointment only - contact me to reserve your private viewing!

Don't miss this rare opportunity to own one of KLCC's most prestigious addresses.

#LuxuryRealEstate #KLProperty #PenthouseLife #ExclusiveListing`

      const tiktokScript = `[Start with a panoramic view of the city skyline from the penthouse]

"Welcome to the most breathtaking view in Kuala Lumpur!" [dramatic pause]

[Quick transition to the living room with floor-to-ceiling windows]
"This exclusive KLCC penthouse just hit the market, and I'm giving you the first look!"

[Pan to the private pool]
"Yes, that's a private pool, 30 floors above the city!"

[Walk through the main living spaces]
"4 bedrooms, 4 bathrooms, and 3,200 square feet of pure luxury"

[Show smart home features]
"Control everything from your phone - lights, temperature, security"

[End with another skyline view at sunset]
"This isn't just a home, it's a lifestyle that few will ever experience"

[Face camera]
"DM me now for a private viewing before this gem is gone!"

#LuxuryRealEstate #PropertyTok #MillionDollarListing #KLRealEstate #DreamHome`

      setSocialMediaOutput(
        socialMediaPlatform === "instagram"
          ? instagramCaption
          : socialMediaPlatform === "facebook"
            ? facebookPost
            : tiktokScript,
      )
      setIsGenerating(false)
    }, 2000)
  }

  const handleEmailTemplateChange = (templateTitle: string) => {
    const template = emailTemplates.find((t) => t.title === templateTitle)
    if (template) {
      setSelectedEmailTemplate(template)
      setEmailSubject(template.subject)
      setEmailBody(template.body)
    }
  }

  const generateImageCaption = () => {
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setCaptionOutput(
        `Step into luxury at this stunning KLCC penthouse! Breathtaking panoramic views, private pool, and designer interiors await. This 4-bedroom, 4-bathroom sky mansion spans 3,200 sq ft of pure elegance. Swipe to see more and DM for private viewing! #LuxuryLiving #KLRealEstate #DreamHome`,
      )
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    })
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">🤖 AI Assistant</h2>
          <p className="text-muted-foreground">Your AI-powered real estate marketing and sales assistant</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Zap className="mr-2 h-4 w-4" />
          Upgrade AI Credits
        </Button>
      </div>

      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="property" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Property Descriptions
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Social Media
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Email Templates
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Image Captions
          </TabsTrigger>
        </TabsList>

        {/* AI Chat Tab */}
        <TabsContent value="chat">
          <Card className="h-[calc(100vh-250px)] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Chat with Your AI Assistant
              </CardTitle>
              <CardDescription>Ask questions, get property descriptions, market insights, and more</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto space-y-4 p-4 border rounded-md mb-4">
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
                    } p-3 rounded-lg`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                        <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="space-y-1">
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <div className="flex justify-end gap-2">
                        {message.role === "assistant" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(message.content)}
                          >
                            <Copy className="h-3 w-3" />
                            <span className="sr-only">Copy</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%] bg-muted p-3 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                      <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="ml-2 text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex w-full gap-2">
                <Textarea
                  placeholder="Ask me anything about real estate, property descriptions, market trends..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendChat()
                    }
                  }}
                />
                <Button
                  onClick={handleSendChat}
                  disabled={isGenerating || !chatInput.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Property Description Generator Tab */}
        <TabsContent value="property">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Property Description Generator
              </CardTitle>
              <CardDescription>Create compelling property descriptions for your listings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Property Details</label>
                    <Textarea
                      placeholder="Enter property details (location, size, bedrooms, features, etc.)"
                      value={propertyInput}
                      onChange={(e) => setPropertyInput(e.target.value)}
                      className="min-h-32 resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      The more details you provide, the better the generated description will be.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tone</label>
                      <Select value={propertyTone} onValueChange={setPropertyTone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="luxury">Luxury & Exclusive</SelectItem>
                          <SelectItem value="family">Family-Friendly</SelectItem>
                          <SelectItem value="investment">Investment Focused</SelectItem>
                          <SelectItem value="modern">Modern & Trendy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Length</label>
                      <Select value={propertyLength} onValueChange={setPropertyLength}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short (100 words)</SelectItem>
                          <SelectItem value="medium">Medium (200 words)</SelectItem>
                          <SelectItem value="long">Long (300+ words)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={generatePropertyDescription}
                    disabled={isGenerating || !propertyInput.trim()}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Description
                      </>
                    )}
                  </Button>

                  <div className="mt-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="prompts">
                        <AccordionTrigger className="text-sm">Example prompts</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {descriptionPrompts.map((prompt, index) => (
                              <div
                                key={index}
                                className="text-sm p-2 rounded-md bg-muted hover:bg-muted/80 cursor-pointer"
                                onClick={() => setPropertyInput(prompt)}
                              >
                                {prompt}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Generated Description</label>
                  <div className="relative">
                    <div className="rounded-md border p-4 min-h-[400px] bg-muted/20 whitespace-pre-line overflow-y-auto">
                      {propertyOutput || "Your generated property description will appear here..."}
                    </div>
                    {propertyOutput && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 bg-background/80"
                        onClick={() => copyToClipboard(propertyOutput)}
                      >
                        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Content Generator Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                Social Media Content Generator
              </CardTitle>
              <CardDescription>Create engaging social media posts for your properties and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Content Details</label>
                    <Textarea
                      placeholder="Describe what you want to post about (property details, event, market update, etc.)"
                      value={socialMediaInput}
                      onChange={(e) => setSocialMediaInput(e.target.value)}
                      className="min-h-32 resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Be specific about what you want to highlight in your social media post.
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Platform</label>
                    <Select value={socialMediaPlatform} onValueChange={setSocialMediaPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="tiktok">TikTok Script</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={generateSocialMedia}
                    disabled={isGenerating || !socialMediaInput.trim()}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Social Media Content
                      </>
                    )}
                  </Button>

                  <div className="mt-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="prompts">
                        <AccordionTrigger className="text-sm">Example prompts</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {socialMediaPrompts.map((prompt, index) => (
                              <div
                                key={index}
                                className="text-sm p-2 rounded-md bg-muted hover:bg-muted/80 cursor-pointer"
                                onClick={() => setSocialMediaInput(prompt)}
                              >
                                {prompt}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Generated Content</label>
                  <div className="relative">
                    <div className="rounded-md border p-4 min-h-[400px] bg-muted/20 whitespace-pre-line overflow-y-auto">
                      {socialMediaOutput || "Your generated social media content will appear here..."}
                    </div>
                    {socialMediaOutput && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 bg-background/80"
                        onClick={() => copyToClipboard(socialMediaOutput)}
                      >
                        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates Tab */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Email Templates
              </CardTitle>
              <CardDescription>Professional email templates for client communication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Template</label>
                  <div className="space-y-2">
                    {emailTemplates.map((template) => (
                      <div
                        key={template.title}
                        className={`p-3 rounded-md border cursor-pointer ${
                          selectedEmailTemplate.title === template.title
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => handleEmailTemplateChange(template.title)}
                      >
                        <div className="font-medium">{template.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{template.subject}</div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Customize Template
                  </Button>
                </div>

                <div className="md:col-span-2">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject</label>
                      <Input
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email Body</label>
                      <div className="relative">
                        <Textarea
                          value={emailBody}
                          onChange={(e) => setEmailBody(e.target.value)}
                          className="min-h-[300px] resize-none"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 bg-background/80"
                          onClick={() => copyToClipboard(emailBody)}
                        >
                          {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          <span className="sr-only">Copy</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">
                        <PenTool className="mr-2 h-4 w-4" />
                        Edit Template
                      </Button>
                      <Button className="bg-primary hover:bg-primary/90">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Use in Email App
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Image Caption Generator Tab */}
        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Image Caption Generator
              </CardTitle>
              <CardDescription>Create engaging captions for your property photos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Upload Property Image</label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Drag & drop or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG or WEBP (max. 5MB)</p>
                      <Button variant="outline" className="mt-4">
                        Select Image
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Property Details</label>
                      <Textarea
                        placeholder="Enter details about the property in this image (features, location, etc.)"
                        className="min-h-[100px] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Platform</label>
                        <Select defaultValue="instagram">
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="twitter">Twitter/X</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Style</label>
                        <Select defaultValue="professional">
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual & Friendly</SelectItem>
                            <SelectItem value="luxury">Luxury & Exclusive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={generateImageCaption} className="w-full bg-primary hover:bg-primary/90">
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing Image...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Caption
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Image Preview</label>
                    <div className="border rounded-md aspect-video bg-muted flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=300&width=500"
                        alt="Property"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Generated Caption</label>
                    <div className="relative">
                      <div className="rounded-md border p-4 min-h-[150px] bg-muted/20 whitespace-pre-line">
                        {captionOutput || "Your generated caption will appear here..."}
                      </div>
                      {captionOutput && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 bg-background/80"
                          onClick={() => copyToClipboard(captionOutput)}
                        >
                          {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          <span className="sr-only">Copy</span>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium mb-2 block">Suggested Hashtags</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">#LuxuryLiving</Badge>
                      <Badge variant="outline">#KLRealEstate</Badge>
                      <Badge variant="outline">#DreamHome</Badge>
                      <Badge variant="outline">#PropertyHunting</Badge>
                      <Badge variant="outline">#MalaysiaProperty</Badge>
                      <Badge variant="outline">#PenthouseLife</Badge>
                      <Badge variant="outline">#RealEstateInvestment</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>AI Usage & Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Credits Remaining</div>
              <div className="text-2xl font-bold">247</div>
              <div className="text-xs text-muted-foreground">Renews on May 1, 2023</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Used This Month</div>
              <div className="text-2xl font-bold">153</div>
              <div className="text-xs text-muted-foreground">Out of 400 monthly credits</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Most Used Feature</div>
              <div className="text-2xl font-bold">Property Descriptions</div>
              <div className="text-xs text-muted-foreground">72 generations this month</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Plan</div>
              <div className="text-2xl font-bold">Premium</div>
              <Button variant="outline" size="sm" className="mt-2">
                <ArrowRight className="mr-2 h-3 w-3" />
                Upgrade Plan
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Need more AI-powered features? Let us know what would help your business.
            </div>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Request Feature
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

