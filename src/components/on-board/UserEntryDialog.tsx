"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { ArrowRight, ChartColumn, CheckCircle, Edit2, TrendingUp } from "lucide-react"
import Image from "next/image"
import LottieAnimation from "@/components/animation/LottieAnimation"
import CheckAnimation from "../../../public/lottie-animations/check.json"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Input } from "../ui/input"
import CarouselComponent from "../common/CourselComponet"
interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinue: () => void
  name: string
  newUser?: boolean
}

const images = [
  "/login.jpg",
  "/login1.jpg",
  "/login3.jpg",
]
export default function UserEntryDialog({ open, onOpenChange, onContinue , name , newUser}: SuccessDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[450px] p-4 rounded-xl" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold" >
              <Image src="/RyzerTextLogo.svg" alt="Ryzer Logo" width={120} height={120} />
            </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col  items-center justify-center">
            <h1 className="text-lg font-semibold" >
                Welcome to Ryzer, {name}
            </h1>
            <p className="text-sm text-center text-muted-foreground" >
                Your Journey to Smarter Investing starts now . Let &apos;s explore what you can do with Ryzer.
                </p>
        
        </div>
        <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-start space-y-2 bg-gray-100 rounded-lg p-4">
                    <ChartColumn className="text-[#725ace]" size={40} />
                    <h1 className="text-md font-semibold" > Portfolio Management</h1>
                    <p className="text-sm text-start text-muted-foreground" >
                        Access your complete investment portfolio overview. with real-time data and insights. and plan your future investments.
                    </p>
                </div>
                <div className="flex flex-col items-start space-y-2 bg-gray-100 rounded-lg p-4">
                    <TrendingUp className="text-[#725ace]" size={40} />
                    <h1 className="text-md font-semibold" > Smart Investment</h1>
                    <p className="text-sm text-start text-muted-foreground" >
                        Leverage AI to make smarter investment decisions. Get personalized recommendations and stay ahead of the curve.
                    </p>
                </div>
        </div>
        <div className="flex items-center justify-center">
            <Button className="w-[200px]" onClick={onContinue}>
                Get Started <ArrowRight size={20} />
            </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}

