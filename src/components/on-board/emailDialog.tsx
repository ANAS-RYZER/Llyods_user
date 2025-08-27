"use client"

import dynamic from "next/dynamic"
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
const CarouselComponent = dynamic(() => import("../common/CourselComponet"), {
    ssr: false,
    loading: () => (
        <div className="w-[444px] h-[444px]">
            <Skeleton className="w-full h-full rounded-[10px] animate-pulse" />
        </div>
    )
}
)
import SignInGoogleButton from "../auth/SignInGoogleButton"
import { toast } from "react-toastify"
import { z } from "zod"
import { Skeleton } from "../ui/skeleton"
import api from "@/lib/httpClient"
import { AxiosError } from 'axios';
import { Form } from "react-hook-form"
import Web3AuthButton from "../auth/Web3AuthButton"

const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address")
        .min(1, "Email is required")
        .max(255, "Email is too long")
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: { email: string; token: string }) => void
}




export default function EmailDialog({ open, onOpenChange, onSubmit: submit }: EmailDialogProps) {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [signInError, setSignInError] = useState("")

    async function onSubmit(data: EmailFormData) {
        try {
            setIsSubmitting(true);
            setSignInError("");

            const validatedData = emailSchema.parse(data);
            const response = await api.post('/auth/register', validatedData);
            console.log(response.data);

            if (response.data) {
                toast.success("OTP Sent Successful");
                submit({ email: validatedData.email, token: response.data.data.token });
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessage = error.errors[0]?.message || "Invalid email format";
                setSignInError(errorMessage);
            } else if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Failed to sign in. Please try again.";
                setSignInError(errorMessage);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    const images = [
        "/login.jpg",
        "/login1.jpg",
        "/login3.jpg",
    ]
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-[1000px] h-[500px] p-4 rounded-xl" onInteractOutside={(e) => e.preventDefault()}>

                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Welcome To Ryzer Platform</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center gap-8">

                    <div className="flex flex-col items-start px-4 py-4 space-y-6 -mt-16 flex-1">
                        <div className="flex items-start gap-3">
                            <Image src="/RyzerTextLogo.svg" alt="Ryzer Logo" width={120} height={120} />
                        </div>

                        <div className="w-full max-w-md space-y-2">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit({ email });
                            }} className="flex items-center gap-3">
                                <Input
                                    type="text"
                                    placeholder="Enter your email"
                                    className="flex-1 h-[45px]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button type="submit" className="p-6 rounded-lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Loading..." : "Get OTP"}
                                </Button>
                            </form>
                            {signInError && (
                                <p className="text-red-500 text-sm mt-2">{signInError}</p>
                            )}

                            <div className="flex  justify-start items-center gap-2 ">
                                <span className="w-[150px] h-[1px] bg-[#0000004D]"></span>
                                <p className="text-sm text-gray-500">Or</p>
                                <span className="w-[150px] h-[1px] bg-[#0000004D]"></span>
                            </div>


                                <div className="flex items-start justify-start gap-2 ">
                                    <SignInGoogleButton
                                        apiUrl="https://backend.ryzer.app/api/auth/login-with-google"
                                        onSuccess={() => {
                                            onOpenChange(false);
                                        }}
                                    />
                                        {/* <Web3AuthButton
                                    onSuccess={() => {
                                        onOpenChange(false);
                                    }}
                                 
                                /> */}
                                </div>

                        </div>
                    </div>

                    <div className="w-[444px] h-[444px]">
                        <CarouselComponent images={images} autoplay={true} dots={true} />
                    </div>
                </div>
            </DialogContent>

        </Dialog>
    )
}

