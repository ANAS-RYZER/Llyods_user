"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import CarouselComponent from "../common/CourselComponet"
import { Edit2 } from "lucide-react"
import api from "@/lib/httpClient"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { z } from "zod"

const otpSchema = z.object({
    otp: z.string()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d+$/, "OTP must contain only numbers")
})

interface OtpDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    email: string
    token: string
    onBack: () => void
    onSubmit: (data: { otp: string; newuser: boolean, userId : string , name: string }) => void
}

export default function OtpDialog({
    open,
    onOpenChange,
    email,
    token,
    onBack,
    onSubmit: submit
}: OtpDialogProps) {

    const [otp, setOtp] = useState("")
    const [timer, setTimer] = useState(60)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isError, setIsError] = useState("")
    

    useEffect(() => {
        if (!open) return
        if (timer === 0) return

        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
        return () => clearInterval(interval)
    }, [timer, open])

    const handleResendOTP = async () => {
        setTimer(60)
        await api.post("/auth/register", { email })
        toast.info("OTP resent!")

    }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const validatedData = otpSchema.parse({ otp })
            setIsSubmitting(true)

            const res = await api.put("/auth/verify-email-otp", { otp: validatedData.otp, token })
            console.log(res.data)
            const { accessToken, sessionId } = res.data.data

            sessionStorage.setItem("accessToken", accessToken)
            sessionStorage.setItem("sessionId", sessionId)
            sessionStorage.setItem("userId", res.data.data.user._id)

            console.log(res.data.data.user.fullName, "name")

            submit({ otp: validatedData.otp, newuser: res.data.data.isNewUser, userId: res.data.data.user._id , name: res.data.data.user.fullName });

            

        } catch (error) {
            
            const message = error instanceof AxiosError
                ? error.response?.data?.message || "Failed to verify OTP"
                : "Unexpected error"
            setIsError(message)
            // toast.error(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const images = [
        "/login.jpg",
        "/login1.jpg",
        "/login3.jpg",
      ]

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-[1000px] p-4 rounded-xl" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold" >Verify Your Email Address</DialogTitle>
                </DialogHeader>

                <div className="flex items-center justify-start gap-8">
                    {/* Left */}
                    <div className="flex flex-col m-8 space-y-4 flex-1">
                        <Image src="/LLyodsLogo.svg" alt="Lloyds Logo" width={120} height={120} />

                        <div>
                            <h1 className="text-xl font-semibold">Enter Email OTP</h1>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                Sent to <span className="font-medium text-black max-w-[200px] truncate inline-block">{email}</span>
                                <Edit2 className="cursor-pointer text-primary" size={16} onClick={onBack} />
                            </p>
                        </div>

                        <form onSubmit={handleVerify} className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <Input
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Only allow numbers and limit to 6 digits
                                        if (/^\d*$/.test(value) && value.length <= 6) {
                                            setOtp(value);
                                            setIsError(""); // Clear error when user types
                                        }
                                    }}
                                    required
                                    className="h-[45px] text-start tracking-widest"
                                />
                                <Button type="submit" className="p-6 rounded-lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Verifying..." : "Verify OTP"}
                                </Button>
                            </div>
                            {isError && (
                                <p className="text-sm text-red-500">{isError}</p>
                            )}
                        </form>

                        {timer > 0 ? (
                            <p className="text-sm text-gray-600">
                                Wait <span className="font-semibold text-primary">{timer}s</span>  to resend OTP
                            </p>
                        ) : (
                            <button
                                onClick={handleResendOTP}
                                className="text-sm text-start font-medium text-primary hover:text-primary/80"
                            >
                                Resend OTP  
                            </button>
                        )}

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
