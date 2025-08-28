import { IProperty } from "@/constants/global";
import { type ClassValue, clsx } from "clsx";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date): string {
  // Handle null, undefined, or invalid inputs
  if (!input || input === "N/A" || input === "") {
    return "N/A";
  }

  const date = new Date(input);

  // Check if the date is valid (not NaN and not the Unix epoch)
  if (isNaN(date.getTime()) || date.getTime() === 0) {
    return "N/A";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const getFormattedVideoUrl = (url: string) => {
  if (!url) return "";

  try {
    // Handle different YouTube URL formats
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtube.com/embed/")) {
      return url; // Already in correct format
    }
    return url; // Return original URL if not YouTube
  } catch (error) {
    console.error("Error formatting video URL:", error);
    return "";
  }
};

export const countries = [
  {
    country: "India",
    code: "+91",
    flag: "https://flagsapi.com/IN/shiny/64.png",
    format: "XXXXX-XXXXX (10 digits)",
  },
  {
    country: "United States",
    code: "+1",
    flag: "https://flagsapi.com/US/shiny/64.png",
    format: "(XXX) XXX-XXXX (10 digits)",
  },
  {
    country: "United Kingdom",
    code: "+44",
    flag: "https://flagsapi.com/GB/shiny/64.png",
    format: "XXXXX XXXXXX or 07XXX XXXXXX (10-11 digits)",
  },
];

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
export function formatString(input: string): string {
  // Remove special characters and split the string
  const words = input.replace(/[-/_]/g, " ").split(" ");

  // Capitalize first letter of each word and join
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
) {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export const formatCurrency = (value: number) => {
  return isNaN(value)
    ? "£ 0"
    : value
        .toLocaleString("en-US", { style: "currency", currency: "EUR" })
        .replace("£", "£ ");
};

export const formatCurrencyWithOutZero = (value: number) => {
  return isNaN(value)
    ? "£ 0"
    : `£ ${Math.round(value).toLocaleString("en-US")}`;
};

export const formatPercentage = (value: number) => {
  return isNaN(value) ? "0%" : `${value.toFixed(1)}%`;
};

// utils/redirect.js

// export function redirectToSignin() {
//   Router.push('/signin');
// }
export function roundDownToOneDecimal(num: number) {
  return Math.floor(num * 10) / 10;
}

export function getTimeRemaining(targetDate: string) {
  const total = Date.parse(targetDate) - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

export const calculateOrderCalculations = (
  property: IProperty,
  quantity: number,
  tokenPrice: number
) => {
  const fees = [...property?.fees?.registration, ...property?.fees?.legal];

  if (quantity === 0) {
    return {
      totalShareValue: 0,
      totalOrderValue: 0,
      preTaxReturns: 0,
      // eoiPercentage: 0,
      // eoiToConfirmOrder: 0,
      investorOwnership: 0,
      breakdown: {
        totalSharesValue: 0,
        fees: [],
      },
    };
  }

  const totalShareValue = tokenPrice * quantity;

  const totalFees = fees?.reduce((acc: number, fee: any) => {
    if (fee.name === "EOI") return acc;
    return fee.isPercentage
      ? acc + (totalShareValue / 100) * Number.parseFloat(fee.value)
      : acc + Number.parseFloat(fee.value);
  }, 0);

  // const eoiFee = fees?.registration?.find((fee: any) => fee.name === "EOI")
  // const eoiPercentage = Number.parseFloat(property?.eoi || "0")
  const totalOrderValue = totalShareValue + totalFees;

  return {
    totalShareValue,
    totalOrderValue,
    preTaxReturns:
      (property?.investmentPerformance?.grossTargetIRR / 100) * totalShareValue,
    // eoiPercentage,
    // eoiToConfirmOrder: (eoiPercentage / 100) * totalOrderValue,
    investorOwnership:
      (quantity / property?.tokenInformation?.availableTokensToBuy) * 100,
    breakdown: {
      totalSharesValue: totalShareValue,
      fees: fees,
    },
  };
};

export const formatDateForInput = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};
