"use client";

import Web3AuthButton from "@/components/auth/Web3AuthButton";
import Web3AuthDemo from "@/components/auth/Web3AuthDemo";

export default function Web3AuthTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Web3Auth Test</h1>
          <p className="text-gray-600">Test the Web3Auth integration</p>
        </div>
        
        <Web3AuthButton />
        <Web3AuthDemo />
      </div>
    </div>
  );
}