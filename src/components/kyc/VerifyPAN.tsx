"use client"

import { useState } from "react"
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
import usePanVerify from "@/hooks/kyc/usePanVerify"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define the form schema with validation
const panSchema = z.object({
  pan: z
    .string()
    .min(10, { message: "PAN number must be 10 characters" })
    .max(10, { message: "PAN number must be 10 characters" })
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Invalid PAN format. Must be in format: ABCDE1234F" }),
  name: z.string().min(1, { message: "Name is required" }),
})

interface VerifyPANProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
}

export default function VerifyPAN({ open, onOpenChange, onSubmit: submit }: VerifyPANProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [panError, setPanError] = useState("")
  const form = useForm<z.infer<typeof panSchema>>({
    resolver: zodResolver(panSchema),
    defaultValues: {
      pan: "",
      name: "",
    },
  })

  const { handlePanVerify, loading: panVerifyLoading } = usePanVerify();

  async function onSubmit() {
    try {
      setIsSubmitting(true)
      setPanError("")

      const response = await handlePanVerify(form.getValues("pan"), form.getValues("name"));
      // Only call submit() if verification was successful
      if (response === true) {
        submit()
      } else {
        // If response is false, it means verification failed but no exception was thrown
        setPanError("Verification failed. Please check your PAN number and name and try again.")
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
          errorMessage = "Invalid PAN number or name. Please check and try again.";
        } else if (error.response?.status === 401) {
          errorMessage = "Unauthorized. Please try again.";
        } else if (error.response?.status === 404) {
          errorMessage = "PAN verification service not available. Please try again later.";
        } else if (error.response?.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
        
        setPanError(errorMessage)
      } else {
        setPanError("An unexpected error occurred. Please try again.")
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
                    <h1 className="text-2xl font-bold">Verify PAN Number</h1>
                    <p className="text-sm text-gray-600">To invest in our platform, please verify your PAN number</p>
                  </CardContent>
                </Card>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                    <FormField
                      control={form.control}
                      name="pan"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-gray-700 font-medium">PAN Number</FormLabel>
                          <div className="flex gap-3">
                            <FormControl className="flex-1">
                              <Input
                                {...field}
                                value={field.value.toUpperCase()}
                                onChange={(e) => {
                                  const value = e.target.value.toUpperCase();
                                  field.onChange(value);
                                }}
                                placeholder="Enter PAN number (e.g., ABCDE1234F)"
                                className="h-12 pl-4 pr-4 text-base bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                                maxLength={10}
                              />
                            </FormControl>
                          </div>
                          <FormDescription className="text-xs text-gray-500 mt-1">
                            Format: ABCDE1234F (5 letters, 4 numbers, 1 letter)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                          <div className="flex gap-3">
                            <FormControl className="flex-1">
                              <Input
                                {...field}
                                placeholder="Enter your full name as per PAN card"
                                className="h-12 pl-4 pr-4 text-base bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                              />
                            </FormControl>
                          </div>
                          <FormDescription className="text-xs text-gray-500 mt-1">
                            Enter your name exactly as it appears on your PAN card
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex w-full mt-4">
                      <Button
                        type="submit"
                        className="h-12 px-6 w-full whitespace-nowrap font-medium rounded-lg"
                        disabled={isSubmitting || !form.formState.isValid}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Verify Now <ArrowRight className="h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </div>
                
                    {panError && (
                      <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{panError}</AlertDescription>
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


