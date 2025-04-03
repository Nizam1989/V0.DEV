import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileLoading() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" disabled>
            Overview
          </TabsTrigger>
          <TabsTrigger value="details" disabled>
            Profile Details
          </TabsTrigger>
          <TabsTrigger value="performance" disabled>
            Performance
          </TabsTrigger>
          <TabsTrigger value="settings" disabled>
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <Skeleton className="h-32 w-32 rounded-full" />
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <div className="flex items-center mt-1 space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Skeleton key={star} className="h-4 w-4 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <Skeleton key={item} className="h-6 w-full" />
                    ))}
                  </div>

                  <Skeleton className="h-0.5 w-full" />

                  <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((stat) => (
                      <Card key={stat}>
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                          <Skeleton className="h-8 w-8 rounded-full mb-2" />
                          <Skeleton className="h-8 w-16 mb-1" />
                          <Skeleton className="h-4 w-20" />
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
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-60" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((activity) => (
                    <div key={activity} className="flex items-start gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-60" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((cert) => (
                    <div key={cert} className="flex items-start gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-5 w-40" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

