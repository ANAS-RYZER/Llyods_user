// "use client";
// import "./styles.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "../ui/button";

// declare global {
//   interface Window {
//     veriffSDK?: any;
//   }
// }

// export default function VeriffKyc() {
//   const [sessionId, setSessionId] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadScriptAndStartSession = async () => {
  //     const script = document.createElement("script");
  //     script.src = "https://cdn.veriff.me/incontext/js/v1/veriff.js";
  //     script.async = true;
  
  //     script.onload = async () => {
  //       try {
  //         const { data } = await axios.post("/api/veriff-session");
  //         const sessionUrl = data.verification.url;
  //         const sessionId = data.verification.id;
  
  //         setSessionId(sessionId);
  
  //         const veriff = window.Veriff({
  //           parentId: "veriff-root",
  //           onSession: function (_err: any, _response: any) {
  //             window.veriffSDK = veriff;
  //             veriff.createVeriffFrame({
  //               url: sessionUrl,
  //               onEvent: (msg: any) => console.log("Veriff Event:", msg),
  //             });
  //           },
  //         });
  
  //         veriff.mount();
  //       } catch (err) {
  //         console.error("Failed to start Veriff session", err);
  //       }
  //     };
  
  //     document.head.appendChild(script);
  //   };
  
  //   loadScriptAndStartSession();
  // }, []);
  

  // const submitVerification = async () => {
  //   if (!sessionId) {
  //     console.error("Session ID not available");
  //     return;
  //   }

  //   try {
  //     // ✅ Use your backend to generate HMAC securely
  //     const { data } = await axios.post("/api/veriff-signature", {
  //       sessionId,
  //     });

  //     const { hmacSignature, clientId } = data;

  //     const res = await axios.patch(
  //       `https://stationapi.veriff.me/v1/sessions/${sessionId}`,
  //       {
  //         verification: {
  //           status: "submitted",
  //           timestamp: new Date().toISOString(),
  //         },
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-HMAC-SIGNATURE": hmacSignature,
  //           "X-AUTH-CLIENT": clientId,
  //         },
  //       }
  //     );

  //     console.log("Verification submitted:", res.data);
  //   } catch (error: any) {
  //     console.error("Submission failed:", error.response?.data || error.message);
  //   }
  // };
  

// }
"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    Veriff: any;
    veriffSDK?: any;
  }
}

export default function VeriffComponent() {
  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(); // already loaded
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    };

    const initVeriff = async () => {
      try {
        // ✅ Only load the correct SDK
        await loadScript("https://cdn.veriff.me/sdk/js/1.5/veriff.min.js");

        if (!window.Veriff) {
          console.error("❌ Veriff SDK not available on window");
          return;
        }

        const veriffRoot = document.getElementById("veriff-root");
        if (veriffRoot) {
          veriffRoot.innerHTML = ""; 
        }

        const veriff = window.Veriff({
          host: "https://stationapi.veriff.com",
          apiKey:
            process.env.NEXT_PUBLIC_VERIFF_SECRET_KEY ||
            "cd73da35-78e0-4486-b0c3-283f524df1ce",
          parentId: "veriff-root",
          onSession: function (err: any, response: any) {
            if (err) {
              console.error("❌ Veriff session error", err);
              return;
            }

            // ✅ create iframe
            veriff.createVeriffFrame({
              url: response.verification.url,
              onEvent: (msg: any) => {
                console.log("📩 Veriff Event:", msg);

                if (msg === "veriff-closed") {
                  console.log("🧾 User closed the Veriff iframe");
                }
              },
            });
          },
        });

        veriff.setParams({
          vendorData: "Ryzer Onboarding",
        });

        veriff.mount();
        window.veriffSDK = veriff; // Store if needed
      } catch (error) {
        console.error("❌ Failed to initialize Veriff:", error);
      }
    };

    initVeriff();

    return () => {
      const veriffRoot = document.getElementById("veriff-root");
      if (veriffRoot) {
        veriffRoot.innerHTML = "";
      }
    };
  }, []);

  return <div id="veriff-root" className="min-h-[600px] w-full" />;
}
