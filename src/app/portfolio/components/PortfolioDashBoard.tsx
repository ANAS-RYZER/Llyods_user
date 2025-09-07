"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Search,
  Download,
  Plus,
  Bed,
  Bath,
  Car,
  Maximize,
  Edit,
  ChevronUp,
  AlertTriangle,
  Minus,
  CircleMinus,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import useFetchPortfolio from "@/hooks/portfolio/useFetchPortfolio";
import useFetchPortfolioOrder from "@/hooks/portfolio/useFetchPortfolioOrder";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import NoOrdersError from "./NoOrdersError";
import PerformanceCard from "./PerformanceCard";
import Banner from "./Banner";
import ActivitiesCard from "./ActivitiesCard";
import MyAssetsTable from "./MyAssetsTable";

// Mock data - replace with your API calls


export default function PortfolioDashboard() {
  const [selectedTab, setSelectedTab] = useState("My Assets");
  const { portfolio, loading, error, fetchPortfolio } = useFetchPortfolio();
  const {
    portfolioOrder,
    loading: loadingOrder,
    error: errorOrder,
  } = useFetchPortfolioOrder();
  const router = useRouter();
  console.log(portfolio);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (
    error?.response?.data?.message === "No completed orders found for this user"
  ) {
    return (
      <div>
        <NoOrdersError />
      </div>
    );
  }
  return (
    <div className="p-0 max-w-7xl ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1a1b1d] mb-6">
          My Portfolio
        </h1>

        {/* Portfolio Cards */}
        <div className="flex">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-[#006861] text-white border-0">
                <CardContent className="p-6">
                  <div className="text-sm opacity-90 mb-2">Total Value</div>
                  {/* <div className="text-2xl font-bold mb-2">£{portfolioOrder?.summary?.totalCurrentValue}</div> */}
                  <div className="text-2xl font-bold mb-2">
                    £{portfolioOrder?.metrics?.totalValue}
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />+
                    {portfolioOrder?.metrics?.allTimeReturns}%{/* 18% */}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#F3F4F6] border shadow-none">
                <CardContent className="p-6">
                  <div className="text-sm text-[#9ea3ae] mb-2">
                    {" "}
                    My Holdings
                  </div>
                  <div className="text-2xl font-bold text-[#1a1b1d] mb-2">
                    £{portfolioOrder?.metrics?.holdings}
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />+
                    {portfolioOrder?.metrics?.holdingsReturn}%
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#F3F4F6] border shadow-none">
                <CardContent className="p-6">
                  <div className="text-sm text-[#9ea3ae] mb-2">
                    My Cashflows
                  </div>
                  <div className="text-2xl font-bold text-[#1a1b1d] mb-2">
                    £{portfolioOrder?.metrics?.cashFlows}
                  </div>
                  {/* <div className="text-2xl font-bold text-[#1a1b1d] mb-2">£197,500</div> */}
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />+
                    {portfolioOrder?.metrics?.cashFlowReturn}%
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#F3F4F6] border shadow-none">
                <CardContent className="p-6">
                  <div className="text-sm text-[#9ea3ae] mb-2">
                    Annual Yields
                  </div>
                  <div className="text-2xl font-bold text-[#1a1b1d] mb-2">
                    8.7%
                  </div>
                  <div className="text-sm text-[#9ea3ae]">Average</div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart and Overview */}
            <div className="flex  gap-6 mb-8">
              <PerformanceCard cashFlowBreakdown={portfolio?.cashFlowBreakdown  } />

              <Card className="rounded-2xl border border-gray-200 bg-white w-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-semibold text-foreground text-balance">
                    Overview
                  </CardTitle>
                </CardHeader>

                {/* subtle divider below header */}
                <div className="border-t border-gray-200" aria-hidden="true" />

                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Asset Count */}
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Assets Count
                      </p>
                      <p className="text-2xl font-semibold text-foreground">
                        {portfolioOrder?.summary?.uniqueAssets ?? "-" }
                      </p>
                    </div>

                    {/* Monthly Yields */}
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Last Month Yields
                      </p>
                      <p className="text-xl font-semibold text-foreground">
                        £
                        {portfolioOrder?.metrics?.annualCashFlow ?? "0"}
                        {/* 100 */}
                      </p>
                    </div>

                    {/* Next Distribution */}
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Upcoming Distribution Date
                      </p>
                      <p className="text-xl font-semibold text-foreground">
                        {formatDate(
                          portfolio?.portfolio?.assets?.[0]
                            ?.rentalDistributions?.[0]?.month ?? ""
                        )}
                      </p>
                    </div>

                    {/* Total Tokens */}
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Upcoming Distribution
                      </p>
                      <p className="text-xl font-semibold text-foreground">
                        £100
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <MyAssetsTable assets={portfolio?.portfolio?.assets ?? []} />
          </div>
          <div className="flex flex-col gap-6 px-4">
            <Banner
              icon={
                <AlertTriangle
                  className="h-6 w-6 text-yellow-400"
                  aria-hidden="true"
                />
              }
              title="Submit tax information"
              description="Redeem reward points or yields to unlock airline promo codes"
              bgColor="black"
              textColor="white"
            />
            <Banner
              icon={
                <CircleMinus
                  className="h-6 w-6 text-red-500"
                  aria-hidden="true"
                />
              }
              title="Submit tax information"
              description="Redeem reward points or yields to unlock airline promo codes"
              bgColor="#FEF3C6"
            />
            <ActivitiesCard />
          </div>
        </div>
      </div>
    </div>
  );
}
