"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DocumentSignatureSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex justify-between items-center border px-5 py-3 rounded-md"
        >
          {/* Left Section */}
          <div className="flex space-x-3 items-center">
            <div className="p-4 bg-gray-100 rounded-md">
              <Skeleton className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-64" />
            </div>
          </div>

          {/* Right Button */}
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      ))}
    </div>
  );
}
