"use client"

import { useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { AlertCircle, ArrowRight, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import CarouselComponent from "../common/CourselComponet"
import api from "@/lib/httpClient"
import useAadharOtp from "@/hooks/kyc/useAadharVerify"

// Define the form schema with validation
const aadharSchema = z.object({
    otp: z
        .string()
        .min(6, { message: "OTP must be 6 digits" })
        .max(6, { message: "OTP must be 6 digits" })
        .regex(/^\d+$/, { message: "OTP must contain only digits" }),
})

interface VerifyAadharOtpProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: () => void
    onBack: () => void
    aadhar: string
}

export default function VerifyAadharOtp({ open, onOpenChange, onSubmit: submit, aadhar, onBack }: VerifyAadharOtpProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [signInError, setSignInError] = useState("")
    const [resendError, setResendError] = useState("")
    const [resendSuccess, setResendSuccess] = useState('')

    const [timeLeft, setTimeLeft] = useState(60)
    const [timerActive, setTimerActive] = useState(true)
    const { handleAadharOtp, loading: aadharOtpLoading } = useAadharOtp();
    // Start countdown when component mounts or dialog opens
    useEffect(() => {
        if (!open) return

        setTimeLeft(60)
        setTimerActive(true)
    }, [open])

    useEffect(() => {
        if (!timerActive || timeLeft <= 0) return

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    setTimerActive(false)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [timerActive, timeLeft])

    async function resendOtp() {
        setTimeLeft(60)
        setTimerActive(true)
        try {
            const response = await handleAadharOtp(Number(aadhar));
             setResendSuccess("OTP resent successfully.")
            

        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "OTP resend failed. Please try again."
                setResendError(errorMessage)
                toast.error(errorMessage)
            }
        }

        // You can trigger your resend API call here
    }


    const form = useForm<z.infer<typeof aadharSchema>>({
        resolver: zodResolver(aadharSchema),
        defaultValues: {
            otp: "",
        },
    })

    async function onSubmit(data: z.infer<typeof aadharSchema>) {
        try {
            setIsSubmitting(true)
            setSignInError("")

            // Uncomment and modify this section when ready to implement API call
            
            const response = await api.post('/kyc/verify', {otp:    Number(data.otp)})
            // if (response.data) {
            //   toast.success("OTP Sent Successfully")
            //   submit({ aadhar: data.aadhar })
            // }

            console.log(data)
            toast.success("Verification OTP sent successfully")
            submit()
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Verification failed. Please try again."
                setSignInError(errorMessage)
                toast.error(errorMessage)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const images = ["/login.jpg", "/login1.jpg", "/login3.jpg"]

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="w-full max-w-[1000px] p-0 overflow-hidden rounded-xl"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <div className="flex flex-col">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-lg font-medium">Verify Your Identity</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Left side - Form */}
                        <div className="p-6 flex flex-col justify-center">
                            <div className="space-y-4">
                                <Card className="border-none shadow-none p-0">
                                    <CardContent className="p-0 flex flex-col items-start justify-start gap-1">
                                        <h1 className="text-2xl font-bold">Enter Aadhar OTP</h1>
                                        <p className="text-sm text-gray-600">We’ve sent an OTP to Aadhar linked Mobile Number</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-600">{aadhar}</p>
                                            <button className="p-0" onClick={onBack}>
                                                <Edit className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                                        <FormField
                                            control={form.control}
                                            name="otp"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    {/* <FormLabel className="text-gray-700 font-medium">Aadhar Number</FormLabel> */}
                                                    <div className="flex gap-3">
                                                        <FormControl className="flex-1">
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter OTP (6 digits)"
                                                                className="h-12 pl-4 pr-4 text-base bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                                                                maxLength={6}
                                                                onChange={(e) => {
                                                                    field.onChange(e)
                                                                    if (signInError) setSignInError("")
                                                                    if (resendError) setResendError("")
                                                                    if (resendSuccess) setResendSuccess("")
                                                                  }}
                                                            />
                                                        </FormControl>
                                                        <Button
                                                            type="submit"
                                                            className="h-12 px-6 whitespace-nowrap font-medium rounded-lg"
                                                            disabled={isSubmitting || !form.formState.isValid}
                                                        >
                                                            {isSubmitting ? (
                                                                <span className="flex items-center gap-2">
                                                                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                                                                    Processing...
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center justify-center gap-2">
                                                                    Verify OTP <ArrowRight className="h-4 w-4" />
                                                                </span>
                                                            )}
                                                        </Button>
                                                    </div>
                                                    <FormMessage />
                                                    {resendSuccess && (
                                                <div className="flex items-center justify-center gap-2 text-green-500 text-sm bg-gray-50 p-2 font-semibold">
                                                    <span >{resendSuccess}</span>
                                                </div>
                                            )}
                                            {resendError && (
                                                <div className="flex items-center justify-center gap-2 text-red-500 text-sm">
                                                    <span>{resendError}</span>
                                                </div>
                                            )}
                                        {signInError && (
                                            <div className="flex items-center gap-2 text-red-500 text-sm">
                                                <span>{signInError}</span>
                                            </div>
                                        )}

                                                    <div className="flex items-center gap-2">
                                                        <div
                                                      
                                                        
                                                            className="h-12 px-6 whitespace-nowrap  text-sm"
                                                        >
                                                            {isSubmitting ? (
                                                                <span className="flex items-start gap-2">
                                                                    <span className="border-2 border-current border-t-transparent rounded-full"></span>
                                                                    Processing...
                                                                </span>
                                                            ) : (
                                                                        <div className="flex items-start  justify-start gap-2" 
                                                                        >
                                                                    {timerActive ? ` 
                                                                    Wait for  ${timeLeft}s seconds` : <div className="flex items-start  text-[#725AC1]  justify-start cursor-pointer gap-2" onClick={resendOtp}>
                                                                    Resend OTP
                                                                </div>} 
                                                                </div>
                                                            )}
                                                        </div>

                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                          
                                    </form>
                                </Form>


                            </div>
                        </div>

                        {/* Right side - Carousel */}
                        <div className="hidden md:block relative h-[400px]">
                            <div className="absolute inset-0 p-8 mb-8 flex items-center justify-center">
                                <CarouselComponent images={images} autoplay={true} className="h-[350px]"  dots={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
