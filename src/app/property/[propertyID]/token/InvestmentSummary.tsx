import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from '@/components/ui/dialog'
  import React from 'react'
  import { Button } from '@/components/ui/button'
  import CheckAnimation from "../../../../../public/lottie-animations/check.json"
  import LottieAnimation from '@/components/animation/LottieAnimation'
  import { useRouter } from 'next/navigation'
  import { formatDate } from '@/lib/utils'
  import { points } from '@/constants/helper'
import { toTitleCase } from '@/lib/format.utility'
  
  interface InvestmentResponse {
    _id: string
    name: string
    tokensBooked: number
    totalOrderValue: number
    remainingAmount?: number
    paymentType: string
    createdAt: string
    hasFullPaymentDone?: boolean
    asset: {
      name: string
    }
  }
  
  interface InvestmentSummaryProps {
    open: boolean
    openChange: (open: boolean) => void
    response: InvestmentResponse | null
  }
  
  const InvestmentSummary = ({ open, openChange, response }: InvestmentSummaryProps) => {
    const router = useRouter()
  
    if (!response) return null
  
    return (
      <Dialog open={open} onOpenChange={openChange}>
        <DialogContent className="w-full max-w-[450px] h-[80vh] overflow-y-auto p-6 rounded-xl">
          <DialogHeader className="border-b border-gray-200">
            <DialogTitle className="text-lg font-bold">Investment Successful!</DialogTitle>
          </DialogHeader>
  
          <div className="mt-6 space-y-4">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-transparent flex items-center justify-center">
                <LottieAnimation
                  animationData={CheckAnimation}
                  style={{ width: "100%", height: "100%", zIndex: 20 }}
                />
              </div>
              <h1 className="text-2xl font-bold">Successfully Invested</h1>
              <p className="text-gray-500">You’ll receive a confirmation email shortly.</p>
            </div>
  
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium">{response._id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Property</span>
                <span className="font-medium">{response?.asset?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Token Purchased</span>
                <span className="font-medium">{response.tokensBooked}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Paid</span>
                <span className="font-medium">€{response.totalOrderValue}</span>
              </div>
              {!response.hasFullPaymentDone && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Remaining Amount</span>
                  <span className="font-medium">€{response.remainingAmount}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">{toTitleCase(response.paymentType)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date & Time</span>
                <span className="font-medium">{formatDate(response.createdAt)}</span>
              </div>
            </div>
  
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 space-y-2">
              {points.map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-gray-600 bg-gray-200 rounded-full w-5 h-5 p-2 flex items-center justify-center">
                    {point.number}
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{point.title}</span>
                    <p className="text-gray-500 text-sm">{point.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="w-full flex flex-col gap-3 mt-6">
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => openChange(false)} className="w-full">
                Explore more Assets
              </Button>
              <Button
                onClick={() => router.push(`/orders/${response._id}/track-order`)}
                className="w-full"
              >
                Track Order
              </Button>
            </div>
            <Button
              onClick={() => {
                openChange(false)
                router.push('/portfolio') // or wherever you want to redirect
              }}
              className="bg-green-500 text-white w-full"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default InvestmentSummary
  