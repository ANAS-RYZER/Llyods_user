"use client";

import { Skeleton } from "@/components/ui/skeleton";

const LLyodsCardSkeleton = () => {
  return (
    <div className="space-y-5">
      {/* Header Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" /> {/* Logo */}
          <Skeleton className="h-6 w-48" /> {/* Title */}
          <Skeleton className="h-6 w-20 rounded-full" /> {/* Added badge */}
        </div>
        <Skeleton className="h-9 w-20 rounded-md" /> {/* Button */}
      </div>

      {/* Description */}
      <ul>
        <li>
          <Skeleton className="h-5 w-full" />
        </li>
      </ul>

      {/* Coverage Section */}
      <div>
        <Skeleton className="h-5 w-40 mb-3" /> {/* Section title */}
        <div className="flex gap-3 items-center my-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-52" />
        </div>
        <div className="flex gap-3 items-center">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-64" />
        </div>
      </div>

      {/* Escrow Info Box */}
      <div className="flex items-center w-full border rounded-md px-4 py-3 bg-gray-50 gap-3">
        <Skeleton className="h-6 w-6 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Disclaimer Text */}
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};

export default LLyodsCardSkeleton;
