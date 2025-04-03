"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileSpreadsheet, Download, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

// Sample data for preview
const sampleData = [
  {
    title: "Modern Apartment in Damansara",
    price: "RM 450,000",
    location: "Damansara, Kuala Lumpur",
    type: "Apartment",
    bedrooms: "3",
    bathrooms: "2",
    size: "1200 sq ft",
    status: "Success",
  },
  {
    title: "Luxury Villa with Pool in Bangsar",
    price: "RM 1,200,000",
    location: "Bangsar, Kuala Lumpur",
    type: "Villa",
    bedrooms: "5",
    bathrooms: "4",
    size: "3500 sq ft",
    status: "Success",
  },
  {
    title: "Cozy Studio near Sunway University",
    price: "RM 180,000",
    location: "Sunway, Selangor",
    type: "Studio",
    bedrooms: "1",
    bathrooms: "1",
    size: "600 sq ft",
    status: "Error: Missing description",
  },
]

enum UploadStatus {
  IDLE = "idle",
  UPLOADING = "uploading",
  SUCCESS = "success",
  ERROR = "error",
}

export default function UploadExcelPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(UploadStatus.IDLE)
  const [progress, setProgress] = useState(0)
  const [previewData, setPreviewData] = useState<typeof sampleData | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
      setUploadStatus(UploadStatus.IDLE)
      setPreviewData(null)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an Excel or CSV file to upload.",
        variant: "destructive",
      })
      return
    }

    setUploadStatus(UploadStatus.UPLOADING)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus(UploadStatus.SUCCESS)
          setPreviewData(sampleData)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const downloadTemplate = () => {
    toast({
      title: "Template downloaded",
      description: "Sample template has been downloaded successfully.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Upload Property Listings via Excel</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bulk Upload Properties</CardTitle>
          <CardDescription>
            Upload multiple property listings at once using an Excel (.xlsx) or CSV file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Button
              variant="outline"
              onClick={downloadTemplate}
              className="text-secondary hover:text-secondary/90 hover:bg-secondary/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Sample Template
            </Button>
            <p className="text-sm text-muted-foreground">
              Download our sample template to ensure your data is formatted correctly.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="rounded-full bg-secondary/10 p-3">
                <FileSpreadsheet className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Upload Excel or CSV File</h3>
                <p className="text-sm text-muted-foreground mt-1">Drag and drop your file here, or click to browse</p>
              </div>
              <div className="w-full max-w-md">
                <label
                  htmlFor="file-upload"
                  className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 text-center"
                >
                  <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                  <p className="text-sm font-medium">{selectedFile ? selectedFile.name : "Click to upload"}</p>
                  <p className="text-xs text-muted-foreground">XLSX or CSV (max. 10MB)</p>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {uploadStatus === UploadStatus.UPLOADING && (
                <div className="w-full max-w-md">
                  <Progress value={progress} className="h-2 w-full" />
                  <p className="text-xs text-center mt-1 text-muted-foreground">Uploading... {progress}%</p>
                </div>
              )}
              {uploadStatus === UploadStatus.SUCCESS && (
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="h-5 w-5" />
                  <span>Upload successful!</span>
                </div>
              )}
              {uploadStatus === UploadStatus.ERROR && (
                <div className="flex items-center gap-2 text-primary">
                  <AlertCircle className="h-5 w-5" />
                  <span>Upload failed. Please try again.</span>
                </div>
              )}
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploadStatus === UploadStatus.UPLOADING}
                className="bg-primary hover:bg-primary/90"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload & Import
              </Button>
            </div>
          </div>

          {previewData && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Preview of Imported Data</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Bedrooms</TableHead>
                    <TableHead>Bathrooms</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.title}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.bedrooms}</TableCell>
                      <TableCell>{row.bathrooms}</TableCell>
                      <TableCell>{row.size}</TableCell>
                      <TableCell>
                        {row.status.startsWith("Error") ? (
                          <span className="flex items-center text-primary text-sm">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            {row.status}
                          </span>
                        ) : (
                          <span className="flex items-center text-green-500 text-sm">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            {row.status}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end">
                <Button className="bg-secondary hover:bg-secondary/90">Confirm Import</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

