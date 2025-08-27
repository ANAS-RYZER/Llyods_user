"use client";

import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Veriff: any;
  }
}

interface VerifyMobileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VeriffDialog({ open, onOpenChange }: VerifyMobileProps) {
  const loadVeriffSDK = () => {
    const existingScript = document.querySelector("script[src='https://cdn.veriff.me/sdk/js/1.5/veriff.min.js']");
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://cdn.veriff.me/sdk/js/1.5/veriff.min.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ Veriff SDK loaded");
    };

    script.onerror = () => {
      console.error("❌ Failed to load Veriff SDK");
    };

    document.body.appendChild(script);
  };

  const startVerification = () => {
    if (!window.Veriff) {
      console.error("Veriff SDK not loaded");
      return;
    }

    // Clear old DOM content
    const root = document.getElementById("veriff-root");
    if (root) {
      root.innerHTML = "";
    }

    const veriff = window.Veriff({
      host: "https://stationapi.veriff.com",
      apiKey: process.env.NEXT_PUBLIC_VERIFF_SECRET_KEY || "cd73da35-78e0-4486-b0c3-283f524df1ce",
      parentId: "veriff-root",
      onSession: function (err: any, response: any) {
        if (err) {
          console.error("❌ Veriff session error", err);
          return;
        }
        console.log("🔁 Redirecting to Veriff session:", response.verification.url);
        window.location.replace(response.verification.url); // You can customize this if needed
      },
    });

    veriff.mount({
      formLabel: {
        vendorData: "Unique User ID",
      },
    });
  };

  useEffect(() => {
    loadVeriffSDK();
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        startVerification();
      }, 100); // slight delay ensures DOM is ready
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Identity Verification</DialogTitle>
        </DialogHeader>
        <div id="veriff-root" className="min-h-[400px]" />
      </DialogContent>
    </Dialog>
  );
}
