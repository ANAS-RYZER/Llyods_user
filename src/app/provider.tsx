"use client";

import React from "react";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer, Slide } from "react-toastify";
import { MetaMaskProvider } from "@/providers/MetaMaskProvider";
import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import web3AuthContextConfig from "@/lib/web3authContext";

interface GlobalProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // 60 seconds
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Fallback to a default client ID if environment variable is not set
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "530817829217-lmbfd9n7rjse61rtnvnt91p1jsch5dfl.apps.googleusercontent.com";

const GlobalRyzerProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  if (!googleClientId) {
    console.error("Google Client ID is not configured");
    return null;
  }

  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={googleClientId}>
        <QueryClientProvider client={queryClient}>
          <Web3AuthProvider config={web3AuthContextConfig}>
            <WagmiProvider>
              <MetaMaskProvider>
                {children}
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  transition={Slide}
                />
              </MetaMaskProvider>
            </WagmiProvider>
          </Web3AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
};

export default GlobalRyzerProvider;
