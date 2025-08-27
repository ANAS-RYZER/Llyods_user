"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Input } from "../ui/input"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import CarouselComponent from "../common/CourselComponet"
import { useCountryData } from "@/hooks/useCountryData"
import { useState } from "react"
import { updateAccount } from "@/hooks/auth/useUpdateAccount"
import { countries } from "@/lib/utils"
interface SuccessDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onContinue: () => void
    userId: string
}

const images = [
    "/login.jpg",
    "/login1.jpg",
    "/login3.jpg",
]
export default function CustomerDetailsDialog({
    open,
    onOpenChange,
    onContinue,
    userId
}: SuccessDialogProps) {
    const [type, setAccountType] = useState("individual");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedCode, setSelectedCode] = useState("+91")
    const [selectedCountry, setSelectedCountry] = useState("India")
    const [mobileNumber, setPhone] = useState("");





    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            type,
            firstName,
            lastName,
            mobileNumber,
            countryCode: selectedCode,
            country: selectedCountry,
        };
        try {
            await updateAccount(userId, payload);
            sessionStorage.setItem("mobile", mobileNumber);

            console.log("Account updated");
            onContinue();
        } catch (err) {
            console.error("Failed to update account", err);
        }
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="w-full max-w-[1000px] p-6 rounded-2xl"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => {
                    e.preventDefault();
                    onOpenChange(false);
                }}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold ">
                        Update Your Account
                    </DialogTitle>
                </DialogHeader>

                <div className="flex items-start justify-between gap-4 mt-4">
                    {/* Left */}
                    <div className="flex flex-col space-y-6 w-full max-w-md">
                        <Image
                            src="/LLyodsLogo.svg"
                            alt="Llyods Logo"
                            width={120}
                            height={120}
                            className="mb-2"
                        />
                        <h2 className="text-2xl font-semibold">Let's Create Your Profile</h2>

                        <form onSubmit={handleSubmit} >

                            <div className="space-y-4">
                                {/* <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Account Type</p>
                                    <div className="flex items-center space-x-4">
                                        {["individual", "institutional"].map((option) => (
                                            <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="accountType"
                                                    value={option}
                                                    checked={type === option}
                                                    onChange={() => setAccountType(option)}
                                                    className="accent-blue-600"
                                                />
                                                <span className="text-sm font-medium capitalize">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div> */}

                                <div className="grid grid-cols-2 gap-4">

                                    <div className="space-y-2">


                                        <label htmlFor="name" className="text-sm text-muted-foreground">
                                            First Name
                                        </label>
                                        <Input
                                            id="name"
                                            placeholder="Enter your first name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                            className="h-[45px]"
                                        />
                                    </div>
                                    <div className="space-y-2">


                                        <label htmlFor="name" className="text-sm text-muted-foreground">
                                            Last Name
                                        </label>
                                        <Input
                                            id="name"
                                            placeholder="Enter your last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                            className="h-[45px]"
                                        />
                                    </div>
                                </div>


                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm text-muted-foreground">
                                        Phone Number
                                    </label>
                                    <div className="flex gap-2">
                                        <Select
                                            value={`${selectedCountry}|${selectedCode}`}
                                            onValueChange={(value) => {
                                                const [country, code] = value.split("|");
                                                setSelectedCountry(country);
                                                setSelectedCode(code);
                                            }}
                                            defaultValue={`${selectedCountry}|${selectedCode}`}
                                        >
                                            <SelectTrigger className="min-w-[80px] max-w-[90px] h-[45px]">
                                                <SelectValue placeholder="Select country" />
                                            </SelectTrigger>
                                            <SelectContent>

                                                {countries.map((country) => (
                                                    <SelectItem
                                                        key={country.code}
                                                        value={`${country.country}|${country.code}`}
                                                    >
                                                        <span className="inline-flex items-center gap-2">
                                                            <Image
                                                                src={country.flag}
                                                                alt={country.country}
                                                                width={15}
                                                                height={15}
                                                            />
                                                            ({country.code})
                                                        </span>
                                                    </SelectItem>
                                                ))}

                                            </SelectContent>
                                        </Select>


                                        <Input
                                            id="phone"
                                            type="tel"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            autoComplete="tel"
                                            placeholder="Enter your phone number"
                                            required
                                            value={mobileNumber}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-[45px] flex-1"
                                        />
                                    </div>
                                </div>
                                        
                                <Button

                                    className="w-full mt-4"
                                    type="submit"
                                >
                                    Continue
                                </Button>
                            </div>
                        </form>

                    </div>

                    {/* Right */}
                    <div className="w-[400px] h-[400px] hidden md:block">
                        <CarouselComponent images={images} autoplay={true} dots={true} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
