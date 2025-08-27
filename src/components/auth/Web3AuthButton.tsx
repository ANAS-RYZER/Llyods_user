"use client";

import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { useAccount, useBalance, useSignMessage, useSendTransaction, useSwitchChain } from "wagmi";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useIdentityToken } from "@web3auth/modal/react";




interface Web3AuthButtonProps {
  onSuccess?: () => void;
  className?: string;
}

export default function Web3AuthButton({ onSuccess, className }: Web3AuthButtonProps) {
  const { connect } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { signMessage, data: signature, isPending, error } = useSignMessage();
  const { sendTransaction } = useSendTransaction();
  const { switchChain } = useSwitchChain();
  const [isLoading, setIsLoading] = useState(false);
  const [signatureHistory, setSignatureHistory] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<any>(null);
  const { getIdentityToken, loading, error: identityError, token } = useIdentityToken();

  console.log("🔑 Identity Token:", token);
  console.log("🔑 Identity Error:", identityError);
  console.log("🔑 Identity Loading:", loading);

  // Monitor signature changes
  useEffect(() => {
    if (signature) {
      console.log("🎉 NEW SIGNATURE DETECTED:", signature);
      setSignatureHistory(prev => [...prev, signature]);
      
      // Run signature validation tests
      runSignatureTests(signature);
    }
  }, [signature]);

  // Monitor error changes
  useEffect(() => {
    if (error) {
      console.error("❌ SIGNING ERROR:", error);
      setTestResults({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }); 
    }
  }, [error]);

  const runSignatureTests = (sig: string) => {
    const tests = {
      signatureExists: !!sig,
      signatureLength: sig.length,
      signatureFormat: sig.startsWith('0x'),
      signatureValidChars: /^0x[a-fA-F0-9]+$/.test(sig),
      timestamp: new Date().toISOString()
    };

    console.log("🧪 SIGNATURE TESTS:", tests);
    setTestResults({
      success: true,
      signature: sig,
      tests,
      timestamp: new Date().toISOString()
    });

    // Additional validation
    if (tests.signatureExists && tests.signatureFormat && tests.signatureValidChars) {
      toast.success("✅ Signature validation passed!");
    } else {
      toast.error("❌ Signature validation failed!");
    }
  };

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      await connect();
      toast.success("Web3Auth connected successfully!");
      onSuccess?.();
    } catch (error) {
      console.error("Web3Auth connection error:", error);
      toast.error("Failed to connect with Web3Auth");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
      toast.success("Disconnected successfully!");
    } catch (error) {
      console.error("Disconnect error:", error);
      toast.error("Failed to disconnect");
    }
  };

  const handleSignMessage = async () => {
    if (!address) {
      console.log("❌ No address available");
      toast.error("No wallet address available");
      return;
    }
    
    try {
      console.log("🚀 Starting message signing...");
      console.log("📍 Address:", address);
      console.log("⏰ Timestamp:", new Date().toISOString());
      
      const message = "Hello from Ryzer Platform!";
      console.log("📝 Message to sign:", message);
      
      // Clear previous test results
      setTestResults(null);
      
      // In wagmi v2, signMessage triggers the signing process
      signMessage({ message });
      
      console.log("✅ Sign message function called successfully");
      
    } catch (error) {
      console.error("❌ Sign message error:", error);
      toast.error(`Failed to sign message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const verifySignatureWithEthers = async (sig: string, message: string, expectedAddress: string) => {
    try {
      // This would require ethers.js to be imported
      // For now, we'll just log the verification attempt
      console.log("🔍 Attempting signature verification:");
      console.log("  Signature:", sig);
      console.log("  Message:", message);
      console.log("  Expected Address:", expectedAddress);
      
      // You can add actual ethers verification here if needed
      return true;
    } catch (error) {
      console.error("❌ Signature verification failed:", error);
      return false;
    }
  };

  const clearSignatureHistory = () => {
    setSignatureHistory([]);
    setTestResults(null);
    toast.info("Signature history cleared");
  };

  if (isConnected && userInfo) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {userInfo.name?.charAt(0) || userInfo.email?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userInfo.name || userInfo.email}
            </p>
            {address && (
              <p className="text-xs text-gray-500 truncate">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            )}
          </div>
          <Button
            onClick={handleDisconnect}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            Disconnect
          </Button>
        </div>
        
        {address && (
          <div className="flex gap-2">
            <Button
              onClick={handleSignMessage}
              disabled={isPending}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              {isPending ? "⏳ Signing..." : "✍️ Sign Message"}
            </Button>
            {balance && (
              <div className="text-xs text-gray-500 flex items-center">
                Balance: {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </div>
            )}
          </div>
        )}
        
        {/* Test Results Display */}
        {testResults && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-medium text-blue-900 mb-2">
              {testResults.success ? "✅ Test Results" : "❌ Test Results"}
            </h4>
            <div className="text-xs space-y-1">
              <p><span className="font-medium">Status:</span> {testResults.success ? "PASSED" : "FAILED"}</p>
              <p><span className="font-medium">Timestamp:</span> {testResults.timestamp}</p>
              {testResults.tests && (
                <div className="mt-2">
                  <p className="font-medium">Validation Tests:</p>
                  <ul className="ml-2 space-y-1">
                    <li>• Signature exists: {testResults.tests.signatureExists ? "✅" : "❌"}</li>
                    <li>• Signature length: {testResults.tests.signatureLength} chars</li>
                    <li>• Starts with 0x: {testResults.tests.signatureFormat ? "✅" : "❌"}</li>
                    <li>• Valid hex format: {testResults.tests.signatureValidChars ? "✅" : "❌"}</li>
                  </ul>
                </div>
              )}
              {testResults.error && (
                <p className="text-red-600"><span className="font-medium">Error:</span> {testResults.error}</p>
              )}
            </div>
          </div>
        )}
        
        {/* Current Signature Display */}
        {signature && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <h4 className="font-medium text-green-900 mb-2">🎉 Latest Signature</h4>
            <div className="text-xs">
              <p className="font-medium mb-1">Signature:</p>
              <p className="break-all bg-white p-2 rounded border font-mono text-xs">
                {signature}
              </p>
              <div className="mt-2 flex gap-2">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(signature);
                    toast.success("Signature copied to clipboard!");
                  }}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  📋 Copy
                </Button>
                <Button
                  onClick={() => verifySignatureWithEthers(signature, "Hello from Ryzer Platform!", address!)}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  🔍 Verify
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Signature History */}
        {signatureHistory.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">📚 Signature History ({signatureHistory.length})</h4>
              <Button
                onClick={clearSignatureHistory}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                🗑️ Clear
              </Button>
            </div>
            <div className="text-xs space-y-2 max-h-32 overflow-y-auto">
              {signatureHistory.map((sig, index) => (
                <div key={index} className="bg-white p-2 rounded border">
                  <p className="font-medium text-xs">Signature #{index + 1}:</p>
                  <p className="break-all font-mono text-xs">{sig.slice(0, 20)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <h4 className="font-medium text-gray-900 mb-2">🔑 Identity Token</h4>
          <div className="text-xs">
            <p className="font-medium mb-1">Token:</p>
            <p className="break-all bg-white p-2 rounded border font-mono text-xs">
              {token}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading}
      className={`flex items-center gap-2 ${className || ""}`}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Image 
            src="/web3/web3auth-icon.svg" 
            alt="Web3Auth" 
            width={20} 
            height={20}
            onError={(e) => {
              // Fallback if icon doesn't exist
              e.currentTarget.style.display = 'none';
            }}
          />
          Connect with Web3Auth
        </>
      )}
    </Button>
  );
}