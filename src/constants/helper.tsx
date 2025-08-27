'use client';

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const getStatusClasses = (status: string) => {
  switch (status) {
    case "Booked":
      return {
        textClass: "text-green-800", // Darker green for better readability
        bgClass: "bg-green-100", // Light green background
      };
    case "awaiting-documents-to-be-signed":
      return {
        textClass: "text-yellow-800", // Dark blue for pending actions
        bgClass: "bg-yellow-100", 
        rounded: "rounded-full",
        text : "Document Signature Pending"

        // Light blue background
      };
    case "awaiting-100%-investment":
      return {
        textClass: "text-yellow-800", // Dark yellow for pending payments
        bgClass: "bg-yellow-100", // Light yellow background
        rounded: "rounded-full",
        text : "Awaiting 100% Investment"
      };
    case "Full_Payment_Done":
      return {
        textClass: "text-green-800", // Dark green for completed payments
        bgClass: "bg-green-100", // Light green background
        rounded: "rounded-full",
        text : "Full Payment Done"
      };
    case "Token_Transfer":
      return {
        textClass: "text-purple-800", // Dark purple for token-related actions
        bgClass: "bg-purple-100", // Light purple background
        rounded: "rounded-full",
        text : "Token Transfer"
      };
    case "Cancelled":
      return {
        textClass: "text-red-800", // Dark red for cancelled status
        bgClass: "bg-red-100", // Light red background
        rounded: "rounded-full",
        text : "Cancelled"
      };
    case "Refunded":
      return {
        textClass: "text-gray-800", // Dark gray for refunded status
        bgClass: "bg-gray-100", // Light gray background
        rounded: "rounded-full",
        text : "Refunded"
      };
    default:
      return {
        textClass: "text-gray-800", // Default dark gray text
        bgClass: "bg-gray-100", // Default light gray background
      };
  }
};


export const points = [
   {
    number : 1,
    title : "Check Your Email",
    value : "We have sent you an email with the investment summary."
   },
   {
    number : 2,
    title : "Track Your Investment",
    value : "You can track your investment performance in your portfolio Dashboard"
   },
   {
    number : 3,
    title : "Receive Dividend Payments",
    value : "You will receive your dividends in your wallet after the property is fully paid for."
   },

]

const isOver18 = (dateString: string) => {
  if (!dateString) return false
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age >= 18
}

export const validateForm = (formData: any) => {
  if (!formData.fullName.trim()) {
    toast.error("Full name is required")
    return false
  }
  if (!formData.dateOfBirth) {
    toast.error("Date of birth is required")
    return false
  }
  if (!isOver18(formData.dateOfBirth)) {
    toast.error("You must be at least 18 years old")
    return false
  }
  if (!formData.gender) {
    toast.error("Gender is required")
    return false
  }
  return true
}