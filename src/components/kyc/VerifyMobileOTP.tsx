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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import CarouselComponent from "../common/CourselComponet"
import api from "@/lib/httpClient"
import useMobileOtp from "@/hooks/kyc/useMobileOtp"

// Schema for OTP validation
const aadharSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "OTP must be 6 digits" })
    .max(6, { message: "OTP must be 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only digits" }),
})

interface VerifyMobileOtpProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  onBack?: () => void
  mobile: string
}

export default function VerifyMobileOtp({ open, onOpenChange, onSubmit: submit, mobile, onBack }: VerifyMobileOtpProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signInError, setSignInError] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [timerActive, setTimerActive] = useState(true)
  const { handleMobileOtp } = useMobileOtp()

  useEffect(() => {
    if (!open) return
    setTimeLeft(60)
    setTimerActive(true)
  }, [open])

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
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

  function resendOtp() {
    setTimeLeft(60)
    setTimerActive(true)
    handleMobileOtp(mobile, "+91")
    toast.info("OTP resent to your mobile number")
  }

  const form = useForm<z.infer<typeof aadharSchema>>({
    resolver: zodResolver(aadharSchema),
    defaultValues: { otp: "" },
  })

  async function onSubmit(data: z.infer<typeof aadharSchema>) {
    try {
      setIsSubmitting(true)
      setSignInError("")
      const response = await api.post('/sms/verify-otp', data)
      form.reset()
      toast.success("OTP verified successfully")
      // Only call submit() if verification was successful (no error thrown)
      submit()
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || "Invalid OTP. Please try again."
        setSignInError(errorMessage)
      } else {
        setSignInError("An unexpected error occurred.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const images = ["/login.jpg", "/login1.jpg", "/login3.jpg"]

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) form.reset()
        onOpenChange(newOpen)
      }}
    >
      <DialogContent
        className="w-full max-w-[1000px] p-0 overflow-hidden rounded-xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-lg font-medium">Verify Your Identity</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side */}
            <div className="p-6 flex flex-col justify-center space-y-4">
              <Card className="border-none shadow-none p-0">
                <CardContent className="p-0 flex flex-col items-start gap-1">
                  <h1 className="text-2xl font-bold">Enter Mobile OTP</h1>
                  <p className="text-sm text-gray-600">We've sent an OTP to your mobile number</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">{mobile}</p>
                    <button className="p-0" onClick={() => onBack?.()}>
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-3">
                          <FormControl className="flex-1">
                            <Input
                              {...field}
                              placeholder="Enter OTP (6 digits)"
                              maxLength={6}
                              className="h-12 text-base bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                              onChange={(e) => {
                                field.onChange(e)
                                if (signInError) setSignInError("")
                              }}
                            />
                          </FormControl>
                          <Button
                            type="submit"
                            className="h-12 px-6 font-medium"
                            disabled={isSubmitting || !form.formState.isValid}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                                Processing...
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                Verify OTP <ArrowRight className="h-4 w-4" />
                              </span>
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                        {signInError && (
                          <div className="flex items-center gap-2 text-sm text-destructive mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <span className="font-medium">{signInError}</span>
                          </div>
                        )}

                        <div className="mt-3 text-sm text-muted-foreground">
                          {timerActive ? (
                            <span>
                              Please wait <span className="font-medium text-primary">{timeLeft}</span> seconds to resend
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={resendOtp}
                              className="text-primary hover:underline"
                            >
                              Resend OTP
                            </button>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>

            {/* Right Side - Carousel */}
            <div className="hidden md:block relative h-[400px]">
              <div className="absolute inset-0 p-8 mb-8 flex items-center justify-center">
                <CarouselComponent images={images} autoplay={true} className="h-[350px]" dots={true} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
