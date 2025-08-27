"use client"
import React, { useEffect, useState } from "react";
import WalletComponet from "@/components/wallet/WalletCard/WalletComponet";
import Transaction from "@/components/wallet/WalletCard/Transaction";
import CryptoCard from "@/components/wallet/WalletCard/CryptoCard";
import useGetBlockChainBalance from "@/hooks/wallet/usegetBlockChainBalance";
import { Button } from "@/components/ui/button";
import useCreateWallet from "@/hooks/wallet/useCreateWallet";
import { Loader2, Copy, Check } from "lucide-react";
import CryptoBalanceCards from "@/components/wallet/WalletCard/CryptoCard";
import useUserDetails from "@/hooks/user/useUserDetail";
const page = () => {

  const { usdt, xrp, xdc, getUSDTBalance, getXRPBalance } = useGetBlockChainBalance()
  const { createWallet, isLoading, error, success, data } = useCreateWallet()
  const [copied, setCopied] = useState(false);
  const {data: userData} = useUserDetails();

  useEffect(() => {
    getUSDTBalance()
    getXRPBalance()
  }, [])

  const handleCreateWallet = () => {
    createWallet()
  }

  const copyToClipboard = () => {
    if (userData?.smartWalletAddress) {
      navigator.clipboard.writeText(userData.smartWalletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto ">
        <div className="p-2">
          <h1 className="text-2xl font-bold">Wallet</h1>
          <span className="text-sm text-gray-500">
            {" "}
            Manage your Currencies and assets
          </span>
        </div>
      </div>
      <div className="flex items-start justify-center gap-4">
        <div className="space-y-4 w-[850px]">
          <WalletComponet xrp={xrp} />
          <CryptoBalanceCards usdt={usdt} xrp={xrp} xdc={0} />
          {/* <Transaction /> */}
        </div>
        <div className="w-[350px]">
          <div className="bg-gradient-to-b from-purple-500  to-black text-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md">
            {userData?.smartWalletAddress ? (
              <>
                <h2 className="text-xl font-semibold mb-2">Wallet Created</h2>
                <p className="mb-4 text-sm">Your wallet has been created successfully.</p>
                <div className="bg-white/10 rounded-full px-4 py-2 flex items-center gap-2 relative">
                  <span className="text-sm truncate max-w-[180px]">
                    {userData?.smartWalletAddress}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="hover:bg-white/20 p-1 rounded-full transition-colors"
                  >
                    {copied ? (
                      <div className="flex items-center gap-1">
                        <Check className="w-4 h-4 text-green-400 animate-bounce" />
                        <span className="text-xs text-green-400 animate-fade-in">Copied!</span>
                      </div>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2">No Wallet Found</h2>
                <p className="mb-4 text-sm">To start investing, please create your wallet.</p>
                <Button
                  onClick={handleCreateWallet}
                  disabled={isLoading}
                  className="bg-white text-purple-600 hover:bg-white/90 font-medium"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    "Create Wallet"
                  )}
                </Button>

              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
