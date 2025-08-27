"use client";

import { Skeleton } from "@/components/ui/skeleton";
import PropertyHeaderSKeleton from "./PropertyHeaderSKeleton";

const OrderStatusSkeleton = () => {
  return (
    <div className="w-full mb-10 space-y-8 px-4 md:px-10">
        <div className="">
            <PropertyHeaderSKeleton/>
        </div>

      {/* Stepper & Content Skeleton */}
      <div className="flex flex-col items-center justify-between">
        <div className="w-full max-w-5xl border border-gray-200 rounded-xl shadow-md px-4 py-6 bg-white space-y-6">
          {/* Heading + Animation */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <Skeleton className="h-6 w-80" />
            <Skeleton className="h-14 w-14 rounded-full" />
          </div>

          {/* Stepper Placeholder */}
          <div className="flex items-center justify-between gap-4 mt-4">
            <Skeleton className="h-3 w-1/4 rounded-full" />
            <Skeleton className="h-3 w-1/4 rounded-full" />
            <Skeleton className="h-3 w-1/4 rounded-full" />
            <Skeleton className="h-3 w-1/4 rounded-full" />
          </div>

          <hr />

          {/* Step Content */}
          <div className="space-y-3 mt-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <hr />

          {/* Disclaimer text */}
          <div className="mt-6 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex justify-between items-center mt-6 max-w-5xl mx-auto gap-4">
          <Skeleton className="h-10 w-40 rounded-lg" />
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default OrderStatusSkeleton;
