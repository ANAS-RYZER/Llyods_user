"use client";

import { useState } from "react";
import {
  MapPin,
  Star,
  BookmarkIcon,
  Share2Icon,
  PlayIcon,
  Loader2,
  BookmarkCheck,
  ChartLineIcon,
  TrendingUpIcon,
  CoinsIcon,
  LockIcon,
  IndianRupee,
  Copy,
  Check,
  Link,
  ArrowUpRight,
  StickyNoteIcon,
  Files,
  Euro,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const CarouselComponent = dynamic(
  () => import("@/components/common/CourselComponet"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[220px] bg-gray-200 rounded-[10px] animate-pulse" />
    ),
  }
);
import VideoDialog from "@/components/complete-kyc/VideoDialog";
import { Progress } from "@/components/ui/progress";
import { IProperty } from "@/constants/global";
import { InfoIcon } from "@/components/common/InfoIcon";
import ShareCard from "../ShareCard/ShareCard";
import dynamic from "next/dynamic";
import useBookmark from "@/hooks/BookMark/useBookmark";
import CreateAssetReview from "./review/CreateAssetReview";
import AssetReview from "./review/AssetReview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
interface PropertyCardProps {
  property: IProperty;
  className?: string;
}
const reviews: any = [
  {
    id: "1",
    user: "Alice",
    rating: 5,
    comment: "Fantastic investment opportunity!",
  },
  {
    id: "2",
    user: "Bob",
    rating: 3,
    comment: "Good overall, but room for improvement.",
  },
  {
    id: "1",
    user: "Alice",
    rating: 5,
    comment: "Fantastic investment opportunity!",
  },
  {
    id: "2",
    user: "Bob",
    rating: 3,
    comment: "Good overall, but room for improvement.",
  },
];

export function PropertyCard({ property, className }: PropertyCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(property?.isBookmarked);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const { bookmarkProperty } = useBookmark();

  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

  const totalTokens = property?.tokenInformation?.tokenSupply || 50;
  const availableTokens = property?.tokenInformation?.availableTokensToBuy || 0;
  const soldTokens = totalTokens - availableTokens;
  const percentInvested = Math.round((soldTokens / totalTokens) * 100);

  // Format returns (using targetCapitalAppreciation or netTargetIRR)
  const returns =
    typeof property?.investmentPerformance?.targetCapitalAppreciation ===
    "number"
      ? property.investmentPerformance.targetCapitalAppreciation
      : typeof property?.investmentPerformance?.netTargetIRR === "number"
      ? property.investmentPerformance.netTargetIRR
      : 0;

  // Get lock-in period
  const lockInPeriod =
    typeof property?.investmentPerformance?.lockInPeriodValue === "number"
      ? property.investmentPerformance.lockInPeriodValue
      : 0;
  const lockInUnit =
    typeof property?.investmentPerformance?.lockInPeriodType === "string"
      ? property.investmentPerformance.lockInPeriodType
      : "days";

  // Get token price
  const tokenPrice =
    typeof property?.tokenInformation?.tokenPrice === "number"
      ? property.tokenInformation.tokenPrice
      : 0;
  const currency = property?.currency === "INR" ? "€" : "$";

  // Placeholder for stage label
  const stageLabel =
    typeof property?.category === "string" ? property.category : "";

  const images =
    property?.media?.imageURL ||
    (Array.isArray(property?.media?.gallery) &&
      property.media.gallery.length > 0)
      ? [property?.media?.imageURL].filter(Boolean)
      : ["/coursel.jpg"];
  const videoUrl =
    typeof property?.media?.videoURL === "string"
      ? property.media.videoURL
      : "";

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVideoOpen(true);
  };

  const handleBookmarkToggle = async () => {
    try {
      setIsBookmarkLoading(true);
      const updatedBookmarkStatus = await bookmarkProperty(property._id);
      if (updatedBookmarkStatus) {
        setIsBookmarked(!isBookmarked);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const handleCopyAddress = async () => {
    const address = property?.tokenInformation?.blockchainProjectAddress || "";
    await navigator.clipboard.writeText(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };


  const handleViewOnBlockchain = () => {
    const address = property?.tokenInformation?.blockchainProjectAddress;
    if (address) {
      window.open(
        `https://explorer.testnet.xrplevm.org/token/${address}`,
        "_blank"
      );
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row rounded-lg overflow-hidden bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      <div className="relative group w-full md:w-2/5 h-[300px] md:h-full overflow-hidden">
        <div className="w-full h-full">
          <CarouselComponent
            images={images}
            className="rounded-[10px]   h-[300px] w-[500px]"
            navigation={false}
            autoplay={false}
          />
        </div>

        {isVideoOpen && (
          <VideoDialog
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            name={property?.name}
            media_value={videoUrl}
          />
        )}

        {videoUrl && (
          <div
            className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50  rounded-full pl-3 pr-4 py-2 cursor-pointer hover:bg-black/80 transition-colors duration-200"
            onClick={handleVideoClick}
          >
            <div className="flex-shrink-0 rounded-full ">
              <PlayIcon className="h-4 w-4 text-white" />
            </div>
            <p className="text-white text-sm font-bold">Watch Video</p>
          </div>
        )}

        <div className="absolute group-hover:opacity-100 opacity-0 transition-opacity duration-300 top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-md text-sm font-medium">
          {stageLabel}
        </div>
      </div>

      {/* Right side - Details */}
      <div className="flex-1 flex flex-col p-5 md:p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {property?.name}
            </h2>
            <div className="flex items-center text-gray-600 mt-1.5">
              <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
              <span className="text-sm">
                {property?.landmark || "Location not specified"},
                {property?.city}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="text-green-500" />
              <p className="text-sm font-medium text-gray-500">
                View on Blockchain:{" "}
              </p>
              <button
                onClick={handleViewOnBlockchain}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2 hover:bg-green-200 transition"
              >
                {formatAddress(
                  property?.tokenInformation?.blockchainProjectAddress || ""
                )}
                <Copy size={12} className="text-green-800" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 ml-2 flex-shrink-0">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-md border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              onClick={handleBookmarkToggle}
            >
              {isBookmarkLoading ? (
                <span className="animate-spin">
                  <Loader2 className="w-4 h-4 sm:w-3 text-black sm:h-3 md:w-6 md:h-6" />
                </span>
              ) : isBookmarked ? (
                <BookmarkCheck className="text-primary" fill="currentColor" />
              ) : (
                <BookmarkIcon className="text-primary" />
              )}
            </Button>
            {isShareOpen && (
              <ShareCard
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                shareUrl={window.location.href}
                title={property?.name}
              />
            )}

            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-md border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              onClick={() => setIsShareOpen(true)}
            >
              <Share2Icon className="h-4 w-4" />
              <span className="sr-only">Share property</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-100/80 rounded-md p-2">
            <div className="flex items-center gap-1 text-gray-500 mb-1 text-sm">
              <TrendingUpIcon size={12} className="flex-shrink-0" />
              <span>Est APY</span>
              <InfoIcon
                className="ml-1 text-gray-400"
                tooltip="Estimated Annual Percentage Yield"
              />

              {/* <Info className="h-3.5 w-3.5 ml-1 text-gray-400" /> */}
            </div>
            <div className="text-emerald-500 font-bold text-xl">+18.5%</div>
          </div>

          <div className="bg-gray-100/80 rounded-md p-2">
            <div className="flex items-center gap-1 text-gray-500 mb-1 text-sm">
              {/* <IndianRupee size={12} className="flex-shrink-0" /> */}
              <Euro size={12} className="flex-shrink-0" />
              <span>Per Token</span>
              <InfoIcon
                className="ml-1 text-gray-400"
                tooltip="Per Token Price"
              />
            </div>
            <div className="font-bold text-xl text-gray-900">
              {formatCurrency(tokenPrice)}
            </div>
          </div>

          <div className="bg-gray-100/80 rounded-md p-2">
            <div className="flex items-center gap-1 text-gray-500 mb-1 text-sm">
              <LockIcon size={12} className="flex-shrink-0" />
              <span>Lock-in</span>
              <InfoIcon
                className="ml-1 text-gray-400"
                tooltip="Lock-in Period"
              />
            </div>
            <div className="font-bold text-xl text-gray-900">{`2 Years`}</div>
          </div>

          <div className="bg-gray-100/80 rounded-md p-2">
            <div className="flex items-center gap-1 text-gray-500 mb-1 text-sm">
              <CoinsIcon size={12} className="flex-shrink-0" />
              <span>Total Tokens</span>
              <InfoIcon className="ml-1 text-gray-400" tooltip="Total Tokens" />
            </div>
            <div className="font-bold text-xl text-emerald-500">
              {String(totalTokens)}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {percentInvested}% Invested
            </span>
            <div className="text-sm font-medium text-[#755ced] flex items-center gap-1">
              <span>
                {" "}
                <b>{availableTokens}</b> Tokens left{" "}
              </span>
              <InfoIcon
                className="ml-1 text-gray-400"
                tooltip="Available Tokens"
              />
            </div>
          </div>
          <div className="w-full bg-gray-100  rounded-full h-2.5">
            <Progress value={percentInvested} className="h-2" />
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-6">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((index) => (
                <Avatar key={index} className="h-8 w-8 border-2 border-white">
                  <AvatarImage src={`/Avatar${index}.png`} />
                  <AvatarFallback>{index}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-700">{23} Investors</span>
          </div>

          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsReviewOpen(true)}
          >
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-semibold">4.6</span>
            <span className="ml-1 text-sm text-indigo-600 font-medium">
              Reviews
            </span>
          </div>
          {isReviewOpen && (
            <AssetReview
              open={isReviewOpen}
              onOpenChange={setIsReviewOpen}
              reviews={reviews}
              onAddReview={() => {
                setIsReviewOpen(false);
                setCreateOpen(true);
              }}
            />
          )}
          {createOpen && (
            <CreateAssetReview
              open={createOpen}
              onOpenChange={setCreateOpen}
              onSubmitChange={() =>{
                setCreateOpen(false);
              }
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
