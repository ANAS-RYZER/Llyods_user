"use client";

import { useWeb3AuthUser } from "@web3auth/modal/react";
import { useAccount, useBalance, useSignMessage, useSendTransaction } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Web3AuthDemo() {
  const { userInfo } = useWeb3AuthUser();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { signMessage } = useSignMessage();
  const { sendTransaction } = useSendTransaction();
  const [isSigning, setIsSigning] = useState(false);

  const handleSignMessage = async () => {
    if (!address) return;
    
    try {
      setIsSigning(true);
      const message = "Hello from Ryzer Platform! This is a test message.";
      const signature = await signMessage({ message });
      toast.success("Message signed successfully!");
      console.log("Message:", message);
      console.log("Signature:", signature);
    } catch (error) {
      console.error("Sign message error:", error);
      toast.error("Failed to sign message");
    } finally {
      setIsSigning(false);
    }
  };

  if (!isConnected || !userInfo) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Web3Auth Demo</CardTitle>
          <CardDescription>Connect your wallet to see your details</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Please connect your wallet first</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Web3Auth Connected</CardTitle>
        <CardDescription>Your wallet information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">User Info</h4>
          <div className="text-sm space-y-1">
            <p><span className="font-medium">Name:</span> {userInfo.name || "Not provided"}</p>
            <p><span className="font-medium">Email:</span> {userInfo.email || "Not provided"}</p>
            <p><span className="font-medium">Wallet:</span> {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}</p>
          </div>
        </div>

        {balance && (
          <div className="space-y-2">
            <h4 className="font-medium">Balance</h4>
            <div className="text-sm">
              <p><span className="font-medium">{balance.symbol}:</span> {parseFloat(balance.formatted).toFixed(6)}</p>
              <p><span className="font-medium">USD Value:</span> ${(Number(balance.value) / Math.pow(10, balance.decimals)).toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-medium">Actions</h4>
          <Button
            onClick={handleSignMessage}
            disabled={isSigning}
            variant="outline"
            className="w-full"
          >
            {isSigning ? "Signing..." : "Sign Test Message"}
          </Button>
        </div>

        <div className="text-xs text-gray-500">
          <p>Decimals: {balance?.decimals || "Unknown"}</p>
        </div>
      </CardContent>
    </Card>
  );
}