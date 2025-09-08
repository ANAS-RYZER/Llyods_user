"use client";

import React, { useState } from "react";
import { Building2, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Asset type
type Asset = {
  id: string;
  name: string;
  category:
    | "Tokenized Real Estates"
    | "Bonds"
    | "Debt"
    | "Equity"
    | "IP & Licenses"
    | "Stocks"
    | "Mutual Funds";
  quantity: number;
  invested: string;
  current: string;
  returns: string;
  returnsSign: "pos" | "neg";
  Icon?: React.ReactNode;
};

// Example API type
type ApiAsset = {
  _id: string;
  tokens: number;
  investedAmount: number;
  currentValue: number;
  assetDetails: { name: string };
  // Assuming the API returns a category - if not,
  // you can assign category in transform or add logic
  category?: string;
};

// Format currency in GBP with Indian grouping
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Dummy: category → icon mapping
function getCategoryIcon(category: string) {
  return category.slice(0, 2); // placeholder
}

// Transform API → UI
function transformApiAssets(apiAssets: ApiAsset[]): Asset[] {
  return apiAssets.map((apiAsset) => {
    const investedAmount = apiAsset.investedAmount;
    const currentValue = apiAsset.currentValue;
    const returns = currentValue - investedAmount;
    const returnsSign = returns >= 0 ? "pos" : "neg";

    // If you get categories from backend you can fix here.
    // Since you mentioned default is Tokenized Real Estates, fallback to that
    const category: Asset["category"] =
      (apiAsset.category as Asset["category"]) || "Tokenized Real Estates";

    return {
      id: apiAsset._id,
      name: apiAsset.assetDetails.name,
      category,
      quantity: apiAsset.tokens,
      invested: formatCurrency(investedAmount),
      current: formatCurrency(currentValue),
      returns: formatCurrency(Math.abs(returns)),
      returnsSign,
      Icon: getCategoryIcon(category),
    };
  });
}

const categories = [
  { label: "All", key: "all" },
  { label: "Stocks", key: "Stocks" },
  { label: "Bonds", key: "Bonds" },
  { label: "Mutual Funds", key: "Mutual Funds" },
  {
    label: "Tokenized Real Estate",
    key: "Tokenized Real Estates",
    isNew: true,
  },
];

export default function MyAssetsTable({ assets }: { assets: ApiAsset[] }) {
  const data = transformApiAssets(assets);
  const router = useRouter();

  // Default selected category is Tokenized Real Estates
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "all"
  );

  // Filter data based on selected category
  const filteredData =
    selectedCategory === "all"
      ? data
      : data.filter((a) => a.category === selectedCategory);

  return (
    <div className="rounded-xl p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          My Investments
        </h2>
        <Button
          onClick={() => {
            router.push("https://llyods-user.vercel.app/?assetCategory=all");
          }}
        >
          Explore Tokenized assets
        </Button>
      </div>
      <div className="my-2">
        <nav className="py-2 flex items-center gap-8 text-sm font-medium text-gray-500">
          {categories.map(({ label, key, isNew }) => {
            const isSelected =
              selectedCategory === key ||
              (key === "all" && selectedCategory === "all");
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={cn(
                  "relative px-2 pb-1 min-w-28",
                  isSelected
                    ? "text-green-600 border-b-2 border-green-600"
                    : "hover:text-gray-700"
                )}
              >
                <span className="inline-flex items-center">
                  {label}
                  {isNew && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                      New
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border rounded-xl">
        <Table className="border border-gray-200 rounded-xl overflow-hidden">
          {/* Header */}
          <TableHeader className="bg-gray-100 ">
            <TableRow>
              <TableHead className="text-gray-500 p-4">Assets Name</TableHead>
              <TableHead className="text-gray-500 p-4">Quantity</TableHead>
              <TableHead className="text-gray-500 p-4">
                Invested Amount
              </TableHead>
              <TableHead className="text-gray-500 p-4">
                Current Amount
              </TableHead>
              <TableHead className="text-gray-500 p-4">Gain/Loss</TableHead>
              <TableHead className="text-gray-500 p-4">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody className="bg-white">
            {filteredData.length > 0 ? (
              filteredData.map((a, i) => (
                <TableRow
                  key={a.id}
                  className={cn(
                    "hover:bg-transparent",
                    i === filteredData.length - 1 ? "last:rounded-b-xl" : ""
                  )}
                >
                  <TableCell className="align-middle p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-black text-white">
                        <Building2 />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                          {a.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {a.category === "Debt"
                            ? "Debt Investment"
                            : a.category}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="align-middle px-6">
                    {a.quantity}
                  </TableCell>
                  <TableCell className="align-middle px-6">
                    {a.invested}
                  </TableCell>
                  <TableCell className="align-middle px-6">
                    {a.current}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "align-middle font-semibold px-6",
                      a.returnsSign === "pos"
                        ? "text-emerald-500"
                        : "text-red-500"
                    )}
                  >
                    {a.returns}
                  </TableCell>
                  <TableCell className="align-middle text-center">
                    <Button
                      variant={"outline"}
                      aria-label="View asset"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-50 bg-transparent border-none "
                    >
                      <EllipsisVertical className="h-4 w-4 text-gray-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-gray-500"
                >
                  No assets found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
