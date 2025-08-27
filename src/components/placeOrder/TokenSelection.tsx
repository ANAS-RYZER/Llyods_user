"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function TokenSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl shadow-sm p-4 bg-white lg:w-[400px] animate-pulse">
      {/* Header */}
      <div className="flex justify-between mb-2">
        <Skeleton className="h-5 w-32 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-12 rounded" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>
      <hr />

      {/* Tabs */}
      <div className="pt-3">
        <Tabs defaultValue="monthly">
          <TabsList className="w-full flex bg-white rounded-none p-0">
            <TabsTrigger value="monthly" className="w-full">
              <Skeleton className="h-6 w-full" />
            </TabsTrigger>
            <TabsTrigger value="yearly" className="w-full">
              <Skeleton className="h-6 w-full" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <div className="space-y-2 mt-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </TabsContent>
          <TabsContent value="yearly">
            <div className="space-y-2 mt-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

      {/* Disclaimer row */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
    </div>
  );
}
