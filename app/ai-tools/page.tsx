"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Copy, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function AIToolsPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleGenerate = () => {
    if (!input.trim()) {
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
      const sampleOutput = `
**Luxurious Modern Living in the Heart of Damansara**

Welcome to this stunning property that combines elegance with contemporary design. This beautifully maintained home offers:

• Spacious 3-bedroom layout with 2 bathrooms
• Open-concept living and dining area flooded with natural light
• Modern kitchen with premium appliances and ample storage
• Master bedroom with en-suite bathroom and walk-in closet
• Private balcony with panoramic city views
• Secure parking for 2 vehicles

Located in the prestigious Damansara Heights neighborhood, residents enjoy proximity to international schools, shopping malls, and fine dining establishments. The property features 24-hour security, a swimming pool, fitness center, and landscaped gardens.

Perfect for professionals or families seeking a sophisticated urban lifestyle with all modern conveniences at your doorstep.

Contact us today to schedule a viewing of this exceptional property!
      `
      setOutput(sampleOutput)
      setIsGenerating(false)
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
    toast({
      title: "Copied to clipboard",
      description: "The generated description has been copied to your clipboard.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">AI Tools</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary" />
            Generate Listing Description with ChatGPT
          </CardTitle>
          <CardDescription>Use AI to create compelling property descriptions based on your input.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Paste your property details</h3>
            <Textarea
              placeholder="Enter property details (e.g., 3-bedroom apartment in Damansara, 1200 sq ft, renovated kitchen, near international schools...)"
              className="min-h-32 resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              The more details you provide, the better the generated description will be.
            </p>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !input.trim()}
            className="bg-secondary hover:bg-secondary/90 w-full"
          >
            {isGenerating ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Description
              </>
            )}
          </Button>

          {output && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Generated Description</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 text-secondary hover:text-secondary/90 hover:bg-secondary/10"
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="rounded-md border p-4 bg-secondary/5 whitespace-pre-line">{output}</div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start border-t px-6 py-4">
          <h3 className="text-sm font-medium">Tips for better results</h3>
          <ul className="text-xs text-muted-foreground mt-2 list-disc pl-4 space-y-1">
            <li>Include specific details about the property (size, rooms, features)</li>
            <li>Mention the location and nearby amenities</li>
            <li>Highlight unique selling points</li>
            <li>Specify the target audience (families, professionals, investors)</li>
          </ul>
        </CardFooter>
      </Card>
    </div>
  )
}

