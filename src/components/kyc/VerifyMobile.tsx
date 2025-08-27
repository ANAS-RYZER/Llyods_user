"use client"

import { useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { AlertCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { countries } from "@/lib/utils"
import Image from "next/image"
import CarouselComponent from "../common/CourselComponet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useMobileOtp from "@/hooks/kyc/useMobileOtp"
import useInvestorApi from "@/hooks/user/useInvestorApi"
const mobileSchema = z.object({
  mobile: z
    .string()
    .min(10, { message: "Mobile number must be 10 digits" })
    .max(10, { message: "Mobile number must contain only digits" })
    .regex(/^\d+$/, { message: "Mobile number must contain only digits" }),
})

interface VerifyMobileProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { mobile: string }) => void
}

export default function VerifyMobile({ open, onOpenChange, onSubmit: submit }: VerifyMobileProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signInError, setSignInError] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("India")
  const [selectedCode, setSelectedCode] = useState("+91")
  
  const form = useForm<z.infer<typeof mobileSchema>>({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      mobile: ``,
    },
  })

  
  const {handleMobileOtp , error , loading } = useMobileOtp();
  
  
  
  async function onSubmit(data: z.infer<typeof mobileSchema>) {
    try {
      setIsSubmitting(true)
      setSignInError("")

      // Check for internet connection
      if (!navigator.onLine) {
        setSignInError("No internet connection. Please check your network and try again.")
        return
      }

      const response = handleMobileOtp(data.mobile, selectedCode)
      console.log(response)
     
      console.log(data)
      form.reset()
      submit({ mobile: data.mobile })

    } catch (error) {
      if (error instanceof AxiosError) {
        if (!navigator.onLine) {
          setSignInError("No internet connection. Please check your network and try again.")
        } else {
          const errorMessage = error.response?.data?.message || "Verification failed. Please try again."
          setSignInError(errorMessage)
        }
      } else {
        setSignInError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const images = ["/login.jpg", "/login1.jpg", "/login3.jpg"]

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        form.reset()
      }
      onOpenChange(newOpen)
    }}>
      <DialogContent
        className="w-full max-w-[900px] p-0 overflow-hidden rounded-xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-semibold">Verify Your Identity</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left side - Form */}
            <div className="p-6 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">Verify Mobile Number</h1>
                  <p className="text-sm text-gray-500">To invest in our platform, please verify your mobile number</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-gray-700 font-medium">Mobile Number</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <div className="flex">
                                <Select
                                  value={`${selectedCountry}|${selectedCode}`}
                                  onValueChange={(value) => {
                                    const [country, code] = value.split("|")
                                    setSelectedCountry(country)
                                    setSelectedCode(code)
                                  }}
                                >
                                  <SelectTrigger className="w-[110px] h-10 border-r-0 rounded-r-none flex justify-between items-center focus:ring-0 focus:border-input bg-white">
                                    <SelectValue>
                                      <div className="flex items-center gap-1 overflow-hidden">
                                        <Image
                                          src={countries.find((c) => c.country === selectedCountry)?.flag || ""}
                                          alt={selectedCountry}
                                          width={20}
                                          height={15}
                                          className="shrink-0"
                                        />
                                        <span className="text-sm font-medium truncate">{selectedCode}</span>
                                      </div>
                                    </SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {countries.map((country) => (
                                      <SelectItem
                                        key={country.code}
                                        value={`${country.country}|${country.code}`}
                                        className="flex items-center gap-2"
                                      >
                                        <div className="flex items-center gap-2">
                                          <Image
                                            src={country.flag || "/placeholder.svg"}
                                            alt={country.country}
                                            width={20}
                                            height={15}
                                          />
                                          <span>{country.country}</span>
                                          <span className="ml-auto text-sm text-gray-500">{country.code}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input
                                  {...field}
                                  placeholder="Enter 10-digit mobile number"
                                  className="h-10 rounded-l-none border-l-0 focus:ring-0 focus:border-input"
                                  maxLength={10}
                                />
                              </div>
                            </FormControl>
                          </div>
                          <FormDescription className="text-xs text-gray-500 mt-1">
                            Format: {countries.find((c) => c.country === selectedCountry)?.format}
                          </FormDescription>
                          <FormMessage />
                          {signInError && (
                      <div className="flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{signInError}</span>
                      </div>
                    )}
                        </FormItem>
                      )}
                    />

                   

                    <Button type="submit" className="w-full h-10 font-medium rounded-lg" disabled={isSubmitting || !form.formState.isValid}>
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
  )
}
