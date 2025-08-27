"use client";
import React from "react";

export default function PaymentMethodsSkeleton() {
  return (
    <div className="w-full border rounded-xl shadow p-4 space-y-5 bg-white animate-pulse">
      {/* Header */}
      <div className="flex justify-between">
        <div className="h-5 w-32 bg-gray-300 rounded" />
        <div className="h-6 w-24 bg-gray-300 rounded" />
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-2 bg-gray-200 rounded-md p-1">
        <div className="h-8 flex-1 bg-gray-300 rounded" />
        <div className="h-8 flex-1 bg-gray-300 rounded" />
      </div>

      {/* Radio Options Skeleton */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex justify-between items-center border rounded-lg px-3 py-3 bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-gray-300" />
              <div className="h-5 w-24 bg-gray-300 rounded" />
            </div>
            <div className="h-5 w-16 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
