"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  BookmarkCheck,
  BookmarkIcon,
  Loader2,
  MapPin,
  Play,
  Share2Icon,
  ShareIcon,
  Star,
  Copy,
  Check,
  Link,
  ArrowUpRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import VideoDialog from "@/components/complete-kyc/VideoDialog";
import { toTitleCase } from "@/lib/format.utility";
import { IProperty } from "@/constants/global";
import ShareCard from "../ShareCard/ShareCard";
import useBookmark from "@/hooks/BookMark/useBookmark";
import { toast } from "react-toastify";
import { formatCurrency, formatCurrencyWithOutZero } from "@/lib/utils";
import { InfoIcon } from "@/components/common/InfoIcon";
// Dynamic import for CarouselComponent with proper loading state
const CarouselComponent = dynamic(
  () => import("@/components/common/CourselComponet"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[220px] bg-gray-200 rounded-[10px] animate-pulse" />
    ),
  }
);

interface PropertyCardProps {
  property: IProperty;
}

export default function AssetCard({ property }: PropertyCardProps) {
  const [isClient, setIsClient] = useState(false);
  const [bookmarkMessage, setBookmarkMessage] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(property?.isBookmarked);
  const { bookmarkProperty } = useBookmark();

  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const router = useRouter();
  const [isShareOpen, setIsShareOpen] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const hasVideo = !!property.media?.videoURL;

  const handleBookmarkToggle = async () => {
    try {
      setIsBookmarkLoading(true);
      const updatedBookmarkStatus = await bookmarkProperty(property._id);
      if (updatedBookmarkStatus) {
        const newStatus = !isBookmarked;
        setIsBookmarked(newStatus);
        setBookmarkMessage(
          newStatus ? "Added to bookmarks" : "Removed from bookmarks"
        );

        // Hide the message after 1 second
        setTimeout(() => setBookmarkMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  // const handleCopyAddress = async () => {
  //   const address = property?.tokenInformation?.blockchainProjectAddress || "";
  //   await navigator.clipboard.writeText(address);
  //   setIsCopied(true);
  //   setTimeout(() => setIsCopied(false), 2000);
  // };

  // const handleViewOnBlockchain = () => {
  //   const address = property?.tokenInformation?.blockchainProjectAddress;
  //   if (address) {
  //     window.open(`https://testnet.xdcscan.com/address/${address}`, "_blank");
  //   }
  // };

  // const formatAddress = (address: string) => {
  //   return `${address.substring(0, 6)}...${address.substring(
  //     address.length - 4
  //   )}`;
  // };
  console.log(property);
  const returns = property.investmentPerformance?.grossTargetIRR || 0;
  const formattedReturns = `${returns}%`;

  const totalTokens = property.tokenInformation?.tokenSupply;
  const availableTokens = property.tokenInformation?.availableTokensToBuy;
  const investedPercentage = Math.round(
    ((totalTokens - availableTokens) / totalTokens) * 100
  );
  const lockInPeriod = property.investmentPerformance?.lockInPeriodValue || 1;
  const lockInType = property.investmentPerformance?.lockInPeriodType || "year";
  const lockInText = `${lockInPeriod} ${lockInType}${
    lockInPeriod > 1 ? "s" : ""
  }`;

  const images =
    property?.media?.imageURL || property?.media?.gallery?.length > 0
      ? [property?.media?.imageURL, ...(property?.media?.gallery || [])].filter(
          Boolean
        )
      : [
          "/coursel.jpg",
          // "/coursel2.jpg",
          // "/coursel3.jpg",
          // "/coursel4.jpg",
        ];
  // Default rating
  const rating = 4.6;

  return (
    <article className=" rounded-2xl w-96  bg-white border  border-gray-100 shadow-xl">
      <div className="group relative">
        <div className="w-full h-full">
          <CarouselComponent
            images={images}
            className=" h-[220px]  w-[400px] "
            navigation={images?.length > 1 ? true : false}
            autoplay
            dots={images?.length > 1 ? true : false}
          />
        </div>

        <Badge className="absolute block left-4 top-4 bg-[#12B981] text-white font-medium px-4 py-1 rounded-full">
          {toTitleCase(property.category)}
        </Badge>

        <div className="hidden group-hover:flex transition-all duration-300 absolute right-4 top-4 gap-2">
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full bg-white"
            onClick={(e) => {
              e.stopPropagation();
              handleBookmarkToggle();
            }}
          >
            {isBookmarkLoading ? (
              <span className="animate-spin">
                <Loader2 className="w-4 h-4 sm:w-3 text-black sm:h-3 md:w-6 md:h-6" />
              </span>
            ) : isBookmarked ? (
              <>
                <BookmarkCheck className="text-primary" fill="currentColor" />
              </>
            ) : (
              <BookmarkIcon className="text-primary" />
            )}
          </Button>
          {isShareOpen && (
            <ShareCard
              isOpen={isShareOpen}
              onClose={() => setIsShareOpen(false)}
              shareUrl={`${window.location.origin}/property/${property._id}`}
              title={property?.name}
            />
          )}

          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full bg-white"
            onClick={() => setIsShareOpen(true)}
          >
            <Share2Icon />
          </Button>
        </div>
        {isVideoOpen && (
          <VideoDialog
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            name={property?.name}
            media_value={property?.media?.videoURL}
          />
        )}

        {bookmarkMessage && (
          <div className="absolute   bottom-4 right-2   z-50">
            <div
              className="px-2 py-2 bg-white border border-purple-300 text-purple-700 font-medium text-sm rounded-full shadow-md
                 animate-bookmark-pop transition-all duration-500 ease-in-out w-fit animate-in "
            >
              {bookmarkMessage}
            </div>
          </div>
        )}

        {hasVideo && (
          <Button
            className="absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-black/70 p-2 text-white hover:bg-black/80"
            onClick={() => setIsVideoOpen(true)}
          >
            <Play size={10} />
            <span className="text-sm font-medium">Watch video</span>
          </Button>
        )}
      </div>

      <div className="p-4">
        <div className="flex flex-col items-start justify-center gap-1">
          <h3 className="text-lg font-semibold truncate">{property.name}</h3>
        </div>
        <div className="mt-1 flex items-center gap-2 ">
          <MapPin size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-500">
            {property?.landmark + " " }
          </span>
        </div>

        <div className="flex justify-between items-center gap-4 rounded-lg bg-[#F9FAFB] p-2 mt-4 ">
          <div className="flex flex-col">
            <div className="flex justify-center items-center gap-1 text-gray-500 ">
              <span className="text-xs ">Exp Yield</span>
              <InfoIcon
                tooltip={formatCurrency(property?.totalPropertyValueAfterFees)}
                size={10}
              />
            </div>
            <span className="text-base font-semibold text-[#12B981]">
              {property?.investmentPerformance?.grossRentalYield || 0}%
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center items-center gap-1 text-gray-500 ">
              <span className="text-xs ">Est. IRR</span>
              <InfoIcon
                tooltip={formatCurrency(property?.totalPropertyValueAfterFees)}
                size={10}
              />
            </div>
            <span className="text-base font-semibold  text-[#12B981]">
              {property?.investmentPerformance?.irr.toFixed(2)}%
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center items-center gap-1  text-gray-500 ">
              <span className="text-xs ">Asset Value</span>
              <InfoIcon
                tooltip={formatCurrencyWithOutZero(property?.totalPropertyValueAfterFees)}
                size={10}
              />
            </div>
            <span className="text-base font-semibold">
              {formatCurrencyWithOutZero(property?.totalPropertyValueAfterFees)}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-[#04966A]">
              {investedPercentage}% Invested
            </span>
            <span className="text-sm text-[#755ced] font-medium">
              {availableTokens} Tokens left
            </span>
          </div>
          <Progress value={investedPercentage} className="h-2" />
        </div>

        <Button
          className="mt-3 w-full  border-[#0eb57b] hover:bg-[#0eb57b] hover:text-white py-4 rounded-lg"
          variant="outline"
          onClick={() => router.push(`/property/${property._id}`)}
        >
          View details
        </Button>
      </div>
    </article>
  );
}