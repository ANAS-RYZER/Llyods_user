"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { AlertCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import CarouselComponent from "../common/CourselComponet"
import useAadharOtp from "@/hooks/kyc/useAadharVerify"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define the form schema with validation
const aadharSchema = z.object({
  aadhar: z
    .string()
    .min(12, { message: "Aadhar number must be 12 digits" })
    .max(12, { message: "Aadhar number must be 12 digits" })
    .regex(/^\d+$/, { message: "Aadhar number must contain only digits" }),
})

interface VerifyAadharProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { aadhar: string }) => void
}

export default function VerifyAadhar({ open, onOpenChange, onSubmit: submit }: VerifyAadharProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aadharError, setAadharError] = useState("")

  const form = useForm<z.infer<typeof aadharSchema>>({
    resolver: zodResolver(aadharSchema),
    defaultValues: {
      aadhar: "",
    },
  })

  const { handleAadharOtp, loading: aadharOtpLoading, error: hookError } = useAadharOtp();

  async function onSubmit(data: z.infer<typeof aadharSchema>) {
    try {
      setIsSubmitting(true)
      setAadharError("")

      const response = await handleAadharOtp(Number(data.aadhar));
      if (response) {
        submit(data)
      }
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        const errorData = error.response?.data?.data;
        let errorMessage = "Verification failed. Please try again."
        
        if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (error.response?.status === 400) {
          errorMessage = "Invalid Aadhar number. Please check and try again.";
        } else if (error.response?.status === 401) {
          errorMessage = "Unauthorized. Please try again.";
        } else if (error.response?.status === 404) {
          errorMessage = "Aadhar verification service not available. Please try again later.";
        } else if (error.response?.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
        
        setAadharError(errorMessage)
      } else {
        setAadharError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update error state when hook error changes
  useEffect(() => {
    if (hookError) {
      setAadharError(hookError);
    }
  }, [hookError]);

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
                    <h1 className="text-2xl font-bold">Verify Aadhar Number</h1>
                    <p className="text-sm text-gray-600">To invest in our platform, please verify your aadhar</p>
                  </CardContent>
                </Card>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                    <FormField
                      control={form.control}
                      name="aadhar"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-gray-700 font-medium">Aadhar Number</FormLabel>
                          <div className="flex gap-3">
                            <FormControl className="flex-1">
                              <Input
                                {...field}
                                value={field.value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim()}
                                onChange={(e) => {
                                  const rawValue = e.target.value.replace(/\D/g, "").slice(0, 12);
                                  field.onChange(rawValue);
                                }}
                                placeholder="Enter 12-digit Aadhar number"
                                className="h-12 pl-4 pr-4 text-base bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                                maxLength={14}
                              />
                            </FormControl>

                            <Button
                              type="submit"
                              className="h-12 px-6 whitespace-nowrap font-medium rounded-lg"
                              disabled={isSubmitting || !form.formState.isValid }
                            >
                              {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                                  Processing...
                                </span>
                              ) : (
                                <span className="flex items-center justify-center gap-2">
                                  Get OTP <ArrowRight className="h-4 w-4" />
                                </span>
                              )}
                            </Button>
                          </div>
                          <FormDescription className="text-xs text-gray-500 mt-1">
                            Format: XXXX XXXX XXXX (12 digits)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    { aadharError && (
                      <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{aadharError}</AlertDescription>
                      </Alert>
                    )}
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
