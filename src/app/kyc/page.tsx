// pages/kyc.tsx or app/kyc/page.tsx
"use client"
import VeriffKyc from "@/components/kyc/veriffKyc";
import Lottie from "lottie-react";

export default function KYCPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <VeriffKyc />
       
    </main>
  );
}
