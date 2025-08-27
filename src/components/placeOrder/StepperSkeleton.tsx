import React from "react";
import { cn } from "@/lib/utils";

export function StepperSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="mb-8 flex flex-col md:flex-row md:items-center">
        {[...Array(count)].map((_, index) => {
          const isLast = index === count - 1;
          return (
            <React.Fragment key={index}>
              <div className="flex items-center justify-center">
                {/* Circle skeleton */}
                <div
                  className={cn(
                    "h-12 w-12 rounded-full bg-gray-200 animate-pulse"
                  )}
                ></div>

                {/* Text skeleton */}
                <div className="ml-2 md:text-center">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              {/* Connector line skeleton */}
              {!isLast && (
                <>
                  <div className="hidden h-[2px] mx-3 w-[30px] md:block bg-gray-200 animate-pulse" />
                  <div className="my-2 h-8 w-[2px] md:hidden bg-gray-200 animate-pulse" />
                </>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
