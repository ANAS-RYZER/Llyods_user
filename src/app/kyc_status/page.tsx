"use client";

import useGetVeriffSessionStatus from "@/hooks/kyc/international/useGetVeriffSessionStatus";
import KYCStatusCard from "./(components)/kyc-status-card";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { status, loading, error } = useGetVeriffSessionStatus();

  if (loading) {
    return (
      <div className="animate-spin">
        <Loader2 size={30} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">KYC Status Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your verification status
          </p>
        </div>

        <div className="flex justify-center">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Current Status</h2>
            {status && <KYCStatusCard  status={status} />}
          </div>
        </div>
      </div>
    </main>
  );
}
