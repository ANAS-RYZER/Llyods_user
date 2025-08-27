"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Eye, BookOpen, Scale, Building, FileText, ShieldCheck } from "lucide-react"

export function InvestmentSecurityDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader className="flex border-b border-gray-200 pb-4   gap-2">
                    <div className="flex items-center gap-2">
                        <Shield size={16} className=" text-green-600" />
                        <DialogTitle>Investment Security</DialogTitle>
                    </div>

                </DialogHeader>

                <Tabs defaultValue="safeguards" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="safeguards">Safeguards</TabsTrigger>
                        <TabsTrigger value="transparency">Transparency</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                    </TabsList>

                    {/* Safeguards Tab */}
                    <TabsContent value="safeguards" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-green-50 p-4 flex flex-col gap-2 items-center justify-center rounded-md">
                                <Scale className="h-6 w-6 text-green-600 mb-2" />
                                <h3 className="font-medium">Legal Protection</h3>
                                <p className="text-sm text-center text-gray-600">SEBI-compliant security tokens with legal ownership rights</p>
                            </div>
                            <div className="bg-blue-50 p-4 flex flex-col gap-2 items-center justify-center rounded-md">
                                <Building className="h-6 w-6 text-blue-600 mb-2" />
                                <h3 className="font-medium">Escrow System</h3>
                                <p className="text-sm text-center text-gray-600">Funds held in escrow until ownership transfer is complete</p>
                            </div>
                            <div className="bg-purple-50 p-4 flex flex-col gap-2 items-center justify-center rounded-md">
                                <FileText className="h-6 w-6 text-purple-600 mb-2" />
                                <h3 className="font-medium">Smart Contracts</h3>
                                <p className="text-sm text-center text-gray-600">Audited smart contracts secure your ownership rights</p>
                            </div>
                            <div className="bg-amber-50 p-4 flex flex-col gap-2 items-center justify-center rounded-md">
                                <ShieldCheck className="h-6 w-6 text-amber-600 mb-2" />
                                <h3 className="font-medium">Insurance</h3>
                                <p className="text-sm text-center text-gray-600">Investment protection up to €50 lakh per property</p>
                            </div>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-md border border-amber-200 flex items-start gap-2">
                            <span className="text-amber-500 text-lg">⚠️</span>
                            <p className="text-xs text-gray-700">
                                All investments carry risk. Our safeguards protect your legal rights but market conditions may affect
                                returns.
                            </p>
                        </div>
                    </TabsContent>

                    {/* Transparency Tab */}
                    <TabsContent value="transparency" className="space-y-4">
                        <div className="flex items-center  gap-3 mb-4">

                            <div className="bg-blue-50 p-4 flex flex-col gap-2 items-center justify-center rounded-full">
                                <Eye className="h-6 w-6 text-blue-500" />

                            </div>
                            <div>
                                <h3 className="font-medium">Full Transparency</h3>
                                <p className="text-sm text-gray-600">Access all property and financial documents in your dashboard</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="border rounded-md p-4 flex flex-col gap-0 items-center justify-center">
                                <FileText className="h-5 w-5 text-green-600 mb-2" />
                                <h4 className="font-medium">Property Documents</h4>
                                <p className="text-xs text-gray-600">Title, valuation reports</p>
                            </div>
                            <div className="border rounded-md p-4 flex flex-col gap-0 items-center justify-center">
                                <FileText className="h-5 w-5 text-green-600 mb-2" />
                                <h4 className="font-medium">Financial Reports</h4>
                                <p className="text-xs text-gray-600">Quarterly statements</p>
                            </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded-md flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-green-600" />
                            <p className="text-sm">Real-time performance tracking in your dashboard</p>
                        </div>
                    </TabsContent>

                    {/* Education Tab */}
                    <TabsContent value="education" className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-amber-50 p-2 flex flex-col gap-2 items-center justify-center rounded-full">
                                <BookOpen className="h-6 w-6 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold ">Investor Education</h3>
                                <p className="text-sm text-gray-600">Resources to help you make informed investment decisions</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <div className="flex flex-col items-center">
                                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                                    <span className="font-medium">1</span>
                                </div>
                                <p className="text-sm">Tokenization Basics</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                                    <span className="font-medium">2</span>
                                </div>
                                <p className="text-sm">Risk Assessment</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                                    <span className="font-medium">3</span>
                                </div>
                                <p className="text-sm">Tax Guidelines</p>
                            </div>
                        </div>

                        <button className="w-full py-2 border rounded-md text-center">View Learning Center</button>
                    </TabsContent>
                </Tabs>

                <div className="bg-green-50 flex p-2 rounded-md mt-4">

                    <div className="flex items-center  gap-3 ">

                        <div className="bg-white p-2 flex flex-col gap-2 items-center justify-center rounded-full">
                            <Shield className="h-6 w-6 text-green-600" />

                        </div>
                        <div> 
                            <h3 className="font-semibold text-green-800">Investment Security Guarantee</h3>
                            <p className="text-sm text-green-800">Triple-layer protection: Legal documentation, blockchain verification, and investor insurance</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
