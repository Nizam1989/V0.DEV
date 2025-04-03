import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      {/* Profile Card Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-48 mb-2" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-28" />
              </div>
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Card Skeleton */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Skeleton className="h-5 w-16 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-10 w-[400px]" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Skeleton className="h-10 w-full sm:w-72" />
            <div className="flex gap-2 flex-wrap">
              <Skeleton className="h-10 w-[130px]" />
              <Skeleton className="h-10 w-[130px]" />
              <Skeleton className="h-10 w-[130px]" />
            </div>
          </div>

          <Skeleton className="h-10 w-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, colIndex) => (
              <div key={colIndex} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, taskIndex) => (
                    <Card key={taskIndex}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <Skeleton className="h-5 w-full max-w-[200px]" />
                            <Skeleton className="h-4 w-full max-w-[250px]" />
                          </div>
                          <Skeleton className="h-6 w-16" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-6 w-24" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

