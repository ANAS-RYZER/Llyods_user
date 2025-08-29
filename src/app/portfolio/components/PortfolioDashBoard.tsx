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
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import useFetchPortfolio from "@/hooks/portfolio/useFetchPortfolio";
import useFetchPortfolioOrder from "@/hooks/portfolio/useFetchPortfolioOrder";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import NoOrdersError from "./NoOrdersError";

// Mock data - replace with your API calls
const portfolioData = {
  totalValue: 2847500,
  totalValueChange: 18,
  investments: 2650000,
  investmentsChange: 12.3,
  cashflows: 197500,
  cashflowsChange: 8.3,
  annualYields: 8.7,
};

const performanceData = [
  {
    month: "Feb 01",
    grossYield: 20000,
    netYield: 18000,
    potentialEquity: 25000,
  },
  {
    month: "Feb 08",
    grossYield: 35000,
    netYield: 30000,
    potentialEquity: 40000,
  },
  {
    month: "Feb 15",
    grossYield: 25000,
    netYield: 22000,
    potentialEquity: 30000,
  },
  {
    month: "Feb 22",
    grossYield: 45000,
    netYield: 40000,
    potentialEquity: 50000,
  },
  {
    month: "Feb 29",
    grossYield: 60000,
    netYield: 55000,
    potentialEquity: 65000,
  },
];

const overviewStats = {
  states: 2,
  averageLandSize: "90.2 m2",
  averageRent: "$391.5 p/week",
  averagePurchasePrice: "$563,434",
  numberOfProperties: 3,
};

const properties = [
  {
    id: 1,
    address: "31 New Street, Mountain Creek QLD 4557",
    beds: 4,
    baths: 4,
    parks: 4,
    sqft: 579,
    market: "Mountain creek QLD 4557",
    ownedSince: "12 march, 2020(4 years)",
    targetEquity: "21% (+4.1)",
    isTopPerformer: true,
    image: "/modern-house-exterior.png",
  },
  {
    id: 2,
    address: "31 New Street, Mountain Creek QLD 4557",
    beds: 4,
    baths: 4,
    parks: 4,
    sqft: 579,
    market: "Mountain creek QLD 4557",
    ownedSince: "12 march, 2020(4 years)",
    targetEquity: "21% (+4.1)",
    isTopPerformer: true,
    image: "/modern-house-exterior.png",
  },
];

export default function PortfolioDashboard() {
  const [selectedTab, setSelectedTab] = useState("My Assets");
  const [userId, setUserId] = useState<string | null>(null);
  
  // Move sessionStorage access to useEffect to avoid SSR issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = sessionStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  const { portfolio, loading, error, fetchPortfolio } = useFetchPortfolio(
    userId as string
  );

  console.log("portfolio", portfolio);
  const {
    portfolioOrder,
    loading: loadingOrder,
    error: errorOrder,
  } = useFetchPortfolioOrder(userId as string);
  const router = useRouter();
  console.log("Port", portfolioOrder);
  
  // Show loading state while userId is being retrieved
  if (!userId) {
    return <div>Loading...</div>;
  }
  
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-[#30daaa] text-white border-0">
            <CardContent className="p-6">
              <div className="text-sm opacity-90 mb-2">Total Value</div>
              <div className="text-2xl font-bold mb-2">
                 £{portfolio?.metrics?.totalValue}
              </div>
              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />+
                {/* {portfolio?.metrics?.allTimeReturns}% */}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#f9fafb] border-0">
            <CardContent className="p-6">
              <div className="text-sm text-[#9ea3ae] mb-2">Holdings</div>
              <div className="text-2xl font-bold text-[#1a1b1d] mb-2">
                £{portfolio?.metrics?.holdings}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />+
                {/* {portfolio?.metrics?.holdingsReturn}% */}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#f9fafb] border-0">
            <CardContent className="p-6">
              <div className="text-sm text-[#9ea3ae] mb-2">Cashflows</div>
              <div className="text-2xl font-bold text-[#1a1b1d] mb-2">
                £{portfolio?.metrics?.cashFlows}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />+
                {portfolioOrder?.metrics?.cashFlowReturn}%
              </div>
            </CardContent>
          </Card>

          {/* <Card className="bg-[#f9fafb] border-0">
            <CardContent className="p-6">
              <div className="text-sm text-[#9ea3ae] mb-2">Annual Yields</div>
              <div className="text-2xl font-bold text-[#1a1b1d] mb-2">55%</div>
              <div className="text-sm text-[#9ea3ae]">Average</div>
            </CardContent>
          </Card> */}
        </div>

        {/* Performance Chart and Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 border-0 bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-[#1a1b1d]">
                  Performance
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm bg-transparent"
                >
                  Last month
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3e54eb]"></div>
                  <span className="text-[#9ea3ae]">Gross yield</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0eb57b]"></div>
                  <span className="text-[#9ea3ae]">Net yield</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#c4c4c4]"></div>
                  <span className="text-[#9ea3ae]">Potential equity</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Line
                      type="monotone"
                      dataKey="grossYield"
                      stroke="#3e54eb"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="netYield"
                      stroke="#0eb57b"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="potentialEquity"
                      stroke="#c4c4c4"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#1a1b1d]">
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[#9ea3ae]">Assets count</div>
                  <div className="font-semibold text-[#1a1b1d]">
                    {portfolioOrder?.summary.uniqueAssets}
                  </div>
                </div>
                <div>
                  <div className="text-[#9ea3ae]">Monthly Yields</div>
                  <div className="font-semibold text-[#1a1b1d]">
                    {portfolioOrder?.metrics?.monthlyCashFlow}{" "}
                  </div>
                </div>
                <div>
                  <div className="text-[#9ea3ae]">Total Tokens</div>
                  <div className="font-semibold text-[#1a1b1d]">
                    {portfolioOrder?.summary.totalTokens}
                  </div>
                </div>
                <div>
                  <div className="text-[#9ea3ae]">Next Distribution</div>
                  <div className="font-semibold text-[#1a1b1d]">
                    {formatDate(
                      portfolio?.portfolio?.assets[0]?.rentalDistributions[0]
                        ?.month as string
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[#9ea3ae] text-sm">Total Orders</div>
                <div className="font-semibold text-[#1a1b1d]">
                  {portfolio?.summary?.totalOrders}
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Import files (properties)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Assets Section */}
        <Card className="border-0 bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setSelectedTab("My Assets")}
                  className={`text-lg font-semibold pb-2 border-b-2 ${
                    selectedTab === "My Assets"
                      ? "text-[#1a1b1d] border-[#3e54eb]"
                      : "text-[#9ea3ae] border-transparent"
                  }`}
                >
                  My Assets
                </button>
                {/* <button
                  onClick={() => setSelectedTab("Upcoming Earnings")}
                  className={`text-lg font-semibold pb-2 border-b-2 ${
                    selectedTab === "Upcoming Earnings"
                      ? "text-[#1a1b1d] border-[#3e54eb]"
                      : "text-[#9ea3ae] border-transparent"
                  }`}
                >
                  Upcoming Earnings
                </button> */}
              </div>
              <div className="flex items-center gap-2">
                {/* <Button variant="outline" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button> */}
                <Button
                  className="bg-[#3e54eb] hover:bg-[#3e54eb]/90"
                  size="sm"
                  onClick={() => router.push("/property")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Invest more
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioOrder?.portfolio?.assets.map((property:any) => (
                <Card
                  key={property._id}
                  className="border border-[#e4e4e4] hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={
                            property.assetDetails.image || "/placeholder.svg"
                          }
                          alt="Property"
                          className="w-40 h-28 object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-[#1a1b1d] mb-2">
                              {property.assetDetails.name}
                            </h3>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-sm">
                          <div>
                            <div className="text-[#9ea3ae] mb-1">Market</div>
                            <div className="font-medium text-[#1a1b1d]">
                              {property.assetDetails.location}
                            </div>
                          </div>
                          <div>
                            <div className="text-[#9ea3ae] mb-1">
                              Owned since
                            </div>
                            <div className="font-medium text-[#1a1b1d]">
                              {property.investedDate}
                            </div>
                          </div>
                          <div>
                            <div className="text-[#9ea3ae] mb-1">
                              Target equity
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[#1a1b1d]">
                                {property.tokens}
                              </span>
                          
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
