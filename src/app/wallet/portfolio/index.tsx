"use client"
import dynamic from 'next/dynamic'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, BarChart3, Building2, LineChart } from "lucide-react"
import { usePortfolioStore } from "./data"

const RecentActivities = dynamic(() => import("@/components/wallet/PortfolioCard/Recent").then(mod => mod.RecentActivities), { ssr: false })
const PortfolioSummary = dynamic(() => import("@/components/wallet/PortfolioCard/Portofolio").then(mod => mod.PortfolioSummary), { ssr: false })
const AssetList = dynamic(() => import("@/components/wallet/PortfolioCard/AssetList").then(mod => mod.AssetList), { ssr: false })

export default function PortfolioDashboard() {
    const { assets, totalInvested, totalValue, totalEarned, totalTokens, totalAssets, averageGrowth } =
        usePortfolioStore()




    return (
        <div className=" max-w-6xl space-y-4 mx-auto w-full">
           

            <div className="flex items-center  justify-between">
                <h2 className="flex items-center gap-2 text-lg font-semibold">My Portfolio</h2>
                <Button variant="outline" size="sm" className="gap-2">
                    <Bell className="h-4 w-4" />
                    Alerts
                </Button>
            </div>

            <PortfolioSummary
                totalValue={totalValue}
                totalInvested={totalInvested}
                totalEarned={totalEarned}
                averageGrowth={averageGrowth}
                totalTokens={totalTokens}
                totalAssets={totalAssets}
            />

            <div className="grid grid-cols-[1fr,300px] gap-6">
                <AssetList assets={assets} />
                <div className="space-y-4">
                    <RecentActivities activities={[]} />
                </div>
            </div>


        </div>
    )
}


  
