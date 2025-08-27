"use client"

import { useMemo } from "react"
import type { Order } from "@/constants/global"
import { TrackingStep } from "./TrackingSteps"
import OrderProgess from "./OrderProgess"
interface OrderTrackingProps {
  order: Order
}

export function OrderTracking({ order }: OrderTrackingProps) {
  const trackingWithUIState = useMemo(() => {
    const activeIndex = order.tracking.findIndex((step) => step.status === order.currentStatus)

    return order.tracking
      .sort((a, b) => a.comingOrder - b.comingOrder)
      .map((step, idx) => {
        let uiState: "completed" | "active" | "inactive"
        if (idx < activeIndex) uiState = "completed"
        else if (idx === activeIndex) uiState = "active"
        else uiState = "inactive"
        return { ...step, uiState }
      })
  }, [order])

  const completedSteps = trackingWithUIState.filter((step) => step.uiState === "completed").length
  const totalSteps = trackingWithUIState.length

  return (
    <div className="space-y-4">


    <div className="bg-white space-y-4 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <OrderProgess completedSteps={completedSteps} totalSteps={totalSteps} />
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">


      <div className="px-6 py-5 space-y-2" >
        {trackingWithUIState.map((step, index) => (
          <TrackingStep key={step._id} step={step} isLast={index === trackingWithUIState.length - 1} />
        ))}
      </div>
    </div>
    </div>
  )
}
