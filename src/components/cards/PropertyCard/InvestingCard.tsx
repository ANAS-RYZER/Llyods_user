"use client";

import { IProperty } from "@/constants/global";
import React, { useState } from "react";
import {
  Bookmark,
  Share2,
  MapPin,
  Shield,
  CheckCircle,
  Images,
  Info,
  TrendingUp,
  Star,
  ArrowUpLeftIcon,
  ArrowUpRightIcon,
  DollarSign,
  LayoutGridIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconRight } from "react-day-picker";
import { formatCurrency, formatCurrencyWithOutZero, formatDate, getFormattedVideoUrl } from "@/lib/utils";
import ProgressBar from "./ProgessBar";
import PhotoDialog from "./PhotoDialog";
import { InfoIcon } from "@/components/common/InfoIcon";

interface PropertyCardProps {
  property: IProperty;
  className?: string;
}

const InvestingCard = ({ property, className }: PropertyCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const formattedUrl = getFormattedVideoUrl(property?.media?.videoURL);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const gallery = [
    ...(Array.isArray(property?.media?.imageURL)
      ? property.media.imageURL
      : [property?.media?.imageURL].filter(Boolean)),
    ...(property?.media?.gallery || []),
  ];
  const displayGallery = showAllPhotos ? gallery : gallery.slice(0, 4);

  const handleViewOnBlockchain = () => {
    const address = property?.tokenInformation?.blockchainProjectAddress;
    if (address) {
      window.open(
        `https://explorer.testnet.xrplevm.org/token/${address}`,
        "_blank"
      );
    }
  };

  const totalTokens = property.tokenInformation?.tokenSupply;
  const availableTokens = property.tokenInformation?.availableTokensToBuy;
  const investedPercentage = Math.round(
    ((totalTokens - availableTokens) / totalTokens) * 100
  );
  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {/* Image Section */}
            <div className="flex flex-col lg:flex-row">
              {/* Main Image */}
              <div className="lg:w-1/2 p-2  relative">
                {formattedUrl ? (
                  <iframe
                    src={formattedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-zinc-400">
                    No video available
                  </div>
                )}
                <Badge className="absolute top-6 rounded-full left-6 bg-emerald-500 hover:bg-emerald-600">
                  Commercial
                </Badge>
              </div>

              <div className="lg:w-1/2 relative">
                <div className="grid  grid-cols-2 h-[300px] lg:h-[400px]">
                  {displayGallery.map((image: string, index: number) => (
                    <div key={index} className="relative overflow-hidden">
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        onClick={() => {
                          setCurrentIndex(index);
                          setDialogOpen(true);
                        }}
                        className="cursor-pointer w-full p-1 rounded-md h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="bg-[#ECE8FF] border-[#BCACFF] border-2 rounded-full hover:bg-[#ECE8FF]/90"
                  >
                    <Bookmark
                      className={`h-4 text-primary w-4 ${
                        isBookmarked ? "fill-current" : ""
                      }`}
                    />
                    <span className="text-primary text-[12px] font-semibold">
                      Bookmark{" "}
                    </span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-[#D9E7FF] border-2 border-[#83B2FF] rounded-full hover:bg-[#D9E7FF]/90"
                  >
                    <Share2 className="h-4 w-4 text-[#3B82F6]" />
                    <span className="text-[#3B82F6] text-[12px] font-semibold">
                      {" "}
                      Share{" "}
                    </span>
                  </Button>
                </div>

                {/* Show All Photos Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-8 right-4 bg-white text-black hover:bg-white/90 rounded-full"
                  onClick={() => {
                    setCurrentIndex(0); // or any index based on user click
                    setDialogOpen(true);
                  }}
                >
                  <LayoutGridIcon className="h-4 w-4" />
                  Show all photos
                </Button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {property.name}
                  </h1>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-full flex w-auto h-auto  ">
                      <div
                        className="flex justify-center gap-2 cursor-pointer items-center bg-[#2663EB] rounded-l-full p-1 text-[12px] font-medium   text-white border-blue-20"
                        onClick={handleViewOnBlockchain}
                      >
                        <div className="rounded-full h-2 w-2 bg-white" />{" "}
                        {property.tokenInformation?.tokenSymbol}{" "}
                        <ArrowUpRightIcon size={16} />
                      </div>
                      <div className="flex justify-center    items-center bg-[#F1F6FF] rounded-r-full p-1  text-[12px] font-medium mr-2 text-[#2663EB] border-blue-20">
                        <DollarSign size={12} />{" "}
                        {property.tokenInformation?.tokenPrice} Per Token
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className="text-[#9384FF] rounded-full bg-[#ECEFFF] border-purple-200"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Proof of Reserves
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[#485F71] bg-[#E2F2FF] rounded-full border-green-200"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      Legally Verified
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[#1D9E74] bg-[#D5FFF1] rounded-full border-green-200"
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      View Location
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3  gap-6 mb-6">
                {/* Fund Progress */}
                <div className="lg:col-span-2 border border-gray-100 rounded-xl shadow-sm p-4 ">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <div className="text-[16px] font-semibold text-[#059669]">
                        {formatCurrencyWithOutZero(property.totalFundsRaised)}
                      </div>
                      <div className="text-sm text-gray-500">Fund Raised</div>
                    </div>
                    <div className="text-center">
                      <div className="text-base font-semibold text-[#12B981]">
                        {investedPercentage}%
                      </div>
                      <div className="text-sm text-gray-500">Funded</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-semibold text-black">
                        {formatCurrencyWithOutZero(property.totalPropertyValueAfterFees)}
                      </div>
                      <div className="text-sm text-gray-500">Asset Value</div>
                    </div>
                  </div>

                  {/* <Progress value={property} className="h-2 mb-4" /> */}
                  <ProgressBar
                    totalTokens={totalTokens}
                    availableTokens={availableTokens}
                    total={property?.totalPropertyValueAfterFees}
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>Last Transaction</span>
                      <Badge variant="outline" className="text-xs gap-4">
                       {property?.lastTransaction?.tokensBooked} {property?.lastTransaction?.tokenSymbol}
                       <img src={property?.lastTransaction?.avatar } alt="avatar" className="w-4 h-4 rounded-full" />
                       <ArrowUpRightIcon size={16} />
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-2">
                          {property.investors && property.investors.length > 0 ? (
                            property.investors.slice(0, 3).map((i) => (
                              <div
                                key={i.investorId}
                                className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"
                              >
                                <img src={i.avatar} alt="avatar" className="w-full h-full rounded-full" />
                              </div>
                            ))
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                              <span className="text-xs text-gray-500">0</span>
                            </div>
                          )}
                        </div>
                        <span>+{property.investors?.length || 0} Investors</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>4.5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 border border-gray-200 rounded-xl p-4 gap-6 bg-white shadow-sm">
                  <div  className="">
                    <div className="flex  items-center gap-1 mb-1">
                      <span className="text-sm text-gray-500">Gross Yield</span>
                      <InfoIcon
                        tooltip="Gross Yield"
                        size={12}
                        className="h-3 w-3 text-gray-400"
                      />
                    </div>
                    <div className="text-xl font-semibold text-emerald-600">
                      {property?.investmentPerformance?.grossRentalYield || 0}%
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm text-gray-500">Net Yield</span>
                      <InfoIcon
                        tooltip="Net Yield"
                        size={12}
                        className="h-3 w-3 text-gray-400"
                      />
                    </div>
                    <div className="text-xl font-semibold text-emerald-600">
                      {property?.investmentPerformance?.netRentalYield || 0}%
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm text-gray-500">Est. IRR</span>
                      <InfoIcon
                        tooltip="Estimated IRR"
                        size={12}
                        className="h-3 w-3 text-gray-400"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-semibold text-emerald-600">
                        {property?.investmentPerformance?.irr.toFixed(2) || 0}%
                      </span>
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm text-gray-500">ROI (MOIC)</span>
                      <InfoIcon
                        tooltip="Multiple on Invested Capital"
                        size={12}
                        className="h-3 w-3 text-gray-400"
                      />
                    </div>
                    <div className="text-xl font-semibold text-emerald-600">
                      {property?.investmentPerformance?.moic.toFixed(2)}x
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <PhotoDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        images={gallery} // ✅ Pass full gallery
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </>
  );
};

export default InvestingCard;
