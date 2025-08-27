"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { CheckCircle, Edit2 } from "lucide-react"
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
  email: string
}

const images = [
  "/login.jpg",
  "/login1.jpg",
  "/login3.jpg",
]
export default function CreatedDialog({ open, onOpenChange, onContinue , email }: SuccessDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[1000px] p-4 rounded-xl" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold" >Update Your Account</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-start gap-8">
          {/* Left */}
          <div className="flex items-center justify-center flex-col m-6 space-y-4 flex-1">
            <Image src="/LLyodsLogo.svg" alt="Lloyds Logo" width={120} height={120} />

            <div className="w-32 h-32 md:w-32 md:h-32  rounded-full bg-transparent  items-center justify-center">

              <LottieAnimation
                animationData={CheckAnimation}
                style={{ width: "100%", height: "100%", zIndex: 20 }}
              />
            </div>
            <h1 className=" font-bold"> Account Created Sucessfully </h1>
             <span className="text-sm text-muted-foreground"> 
             {email}
                </span> 
     <Button type="button" className="p-4 rounded-full" onClick={onContinue}>
        Go to  Home
     </Button>
          </div>

          {/* Right */}
          <div className="w-[444px] h-[444px]">
            <CarouselComponent images={images} autoplay={true} dots={true} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

