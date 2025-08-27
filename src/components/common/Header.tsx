"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useUserDetails from "@/hooks/user/useUserDetail";

import EmailDialog from "../on-board/emailDialog";
import OtpDialog from "../on-board/otpDialog";
import SuccessDialog from "../on-board/SuccesfullDialog";
import CustomerDetailsDialog from "../on-board/CustomerDeatilsDialog";
import CreatedDialog from "../on-board/createdDialof";
import DropDown from "./DropDown";
import VerifyAadhar from "../kyc/VerifyAadhar";
import VerifyAadharOtp from "../kyc/VerifyAadharOtp";
import VerifyMobile from "../kyc/VerifyMobile";
import VerifyMobileOtp from "../kyc/VerifyMobileOTP";
import { HeaderSkeleton } from "./SkeletonUIS";
import UserEntryDialog from "../on-board/UserEntryDialog";
import useAadharOtp from "@/hooks/kyc/useAadharVerify";
import VerifyPAN from "../kyc/VerifyPAN";

import { Loader2 } from "lucide-react";
import KycAcceptedDialog from "../on-board/KycAcceptedDialog";
import VeriffDialog from "../kyc/verifKycDialog";
import useVerrifCreateSession from "@/hooks/kyc/international/useVerrifCreateSession";

const Header = () => {
  const [step, setStep] = useState<
    | "email"
    | "otp"
    | "success"
    | "customer"
    | "created"
    | "verifyAadhar"
    | "AadharOTP"
    | "mobileOTP"
    | "mobile"
    | "userEntry"
    | "verifyPAN"
    | "veriffDialog"
    | null
  >(null);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [otp, setOtp] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [userId, setUserId] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [mobile, setMobile] = useState("");
  const [kycAcceptedDialog, setKycAcceptedDilaog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasShownCustomerDialog, setHasShownCustomerDialog] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: userData, loading, error, fetchData } = useUserDetails();

  const [name, setName] = useState("");
  const {
    createSeesion,
    loading: veriffLoading,
    error: veriffError,
  } = useVerrifCreateSession();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const accessToken = window.sessionStorage?.getItem("accessToken");
    const sessionId = window.sessionStorage?.getItem("sessionId");
    const storedUserId = window.sessionStorage?.getItem("userId");
    const isLoggedIn = !!(accessToken && sessionId);
    setIsAuthenticated(isLoggedIn);

    if (isLoggedIn) {
      if (!userData) {
        fetchData();
      }
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }

    if (userData?.isNewUser && !hasShownCustomerDialog) {
      setNewUser(true);
      setStep("customer");
      setHasShownCustomerDialog(true);
      if (storedUserId && !userId) {
        setUserId(storedUserId);
      }
    }

    // Show KYC Accepted Dialog only once
    const kycDialogShown = localStorage.getItem("kycAcceptedDialogShown");
    if (userData?.adminApprovalStatus === "Approved" && !kycDialogShown) {
      setKycAcceptedDilaog(true);
      localStorage.setItem("kycAcceptedDialogShown", "true");
    }
  }, [userData, hasShownCustomerDialog, userId]);

  const handleRequestOtp = ({
    email,
    token,
  }: {
    email: string;
    token: string;
  }) => {
    setEmail(email);
    setToken(token);
    setStep("otp");
  };

  const handleRequestMobileOtp = ({ mobile }: { mobile: string }) => {
    setMobile(mobile);
    setStep("mobileOTP");
  };

  const handleVerifyOtp = ({
    otp: submittedOtp,
    newuser,
    userId,
    name,
  }: {
    otp: string;
    newuser: boolean;
    userId: string;
    name: string;
  }) => {
    setOtp(submittedOtp);
    setNewUser(newuser);
    setUserId(userId);
    setStep(newuser ? "customer" : "success");
    setName(name);
  };

  const handleClose = async () => {
    setStep(null);
    setEmail("");
    setToken("");
    setOtp("");
    setNewUser(false);
    setUserId("");

    // Smooth refresh: manually refetch user data
    if (isAuthenticated) {
      try {
        setIsRefreshing(true);
        await fetchData(); // your hook will fetch fresh user info
      } catch (error) {
        console.error("Error refreshing user data:", error);
      } finally {
        await new Promise((res) => setTimeout(res, 1000));
        setIsRefreshing(false);
      }
    }
  };

  const handleVerifyAadhar = ({ aadhar }: { aadhar: string }) => {
    setStep("AadharOTP");
    setAadhar(aadhar);
  };

  const handleKYCComplete = async () => {
    setIsRefreshing(true);
    try {
      // Refresh user data
      await fetchData();
      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error refreshing user data:", error);
    } finally {
      setIsRefreshing(false);
      handleClose();
    }
  };

  const handleMobileVerificationComplete = async () => {
    // Check if mobile verification is the last step needed
    if (userData && userData.isAadhaarVerified && userData.isPanVerified) {
      await handleKYCComplete();
    } else {
      setStep("verifyAadhar");
    }
  };

  const handleAadharVerificationComplete = async () => {
    // Check if Aadhar verification is the last step needed
    if (userData && userData.isMobileVerified && userData.isPanVerified) {
      await handleKYCComplete();
    } else {
      setStep("verifyPAN");
    }
  };

  const handleVeriffSession = async () => {
    const response = await createSeesion(
      userData?.firstName,
      userData?.lastName
    );
    if (response?.data?.sessionUrl) {
      window.open(response.data.sessionUrl);
    }
  };

  if (loading && !userData) {
    return <HeaderSkeleton />;
  }

  return (
    <header className="w-full border-b bg-primary">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/Llyods.png"
              alt="Ryzer"
              width={120}
              height={32}
              className="h-auto w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {/* Add Nav Items Here */}
          </nav>
        </div>

        <div className="flex items-center justify-center gap-10 space-x-4">
          {(!userData?._id ||
            !window.sessionStorage?.getItem("accessToken") ||
            !window.sessionStorage?.getItem("sessionId")) && (
            <Button
              onClick={() => setStep("email")}
              className="px-6 bg-white hover:bg-white/80 text-primary"
            >
              Login
            </Button>
          )}

         

          {userData &&
            !userData?.kycCompleted &&
            userData?.country !== "India" && (
              <Button onClick={handleVeriffSession}>Complete Kyc</Button>
            )}

          {userData?._id &&
            window.sessionStorage?.getItem("accessToken") &&
            window.sessionStorage?.getItem("sessionId") && (
              <DropDown user={userData} />
            )}
        </div>
      </div>

      <EmailDialog
        open={step === "email"}
        onOpenChange={(open) => !open && handleClose()}
        onSubmit={handleRequestOtp}
      />

      <OtpDialog
        open={step === "otp"}
        onOpenChange={(open) => !open && handleClose()}
        email={email}
        token={token}
        onBack={() => setStep("email")}
        onSubmit={handleVerifyOtp}
      />

      <SuccessDialog
        open={step === "success"}
        onOpenChange={(open) => !open && handleClose()}
        onContinue={() => setStep("userEntry")}
        email={email}
        newUser={newUser}
      />

      <UserEntryDialog
        open={step === "userEntry"}
        onOpenChange={(open) => !open && handleClose()}
        onContinue={() => handleClose()}
        name={name}
      />

      <CustomerDetailsDialog
        // open={true}
        open={step === "customer" && newUser}
        onOpenChange={(open) => {
          if (!open) {
            handleClose();
          }
        }}
        onContinue={() => setStep("created")}
        userId={userId}
      />

      <CreatedDialog
        open={step === "created"}
        onOpenChange={(open) => !open && handleClose()}
        onContinue={() => handleClose()}
        email={email}
      />
      {/* <VerifyMobile
        open={step === "mobile"}
        onOpenChange={(open) => !open && handleClose()}
        onSubmit={handleRequestMobileOtp}
      />

      <VerifyMobileOtp
        open={step === "mobileOTP"}
        onOpenChange={(open) => !open && handleClose()}
        onSubmit={handleMobileVerificationComplete}
        mobile={mobile}
        onBack={() => setStep("mobile")}
      />
      <VerifyAadhar
        open={step === "verifyAadhar"}
        onOpenChange={(open) => !open && handleClose()}
        onSubmit={handleVerifyAadhar}
      />

      <VerifyAadharOtp
        open={step === "AadharOTP"}
        onOpenChange={(open) => !open && handleClose()}
        onSubmit={handleAadharVerificationComplete}
        aadhar={aadhar}
        onBack={() => setStep("verifyAadhar")}
      />

      <VerifyPAN
        open={step === "verifyPAN"}
        onOpenChange={(open) => !open && handleClose()}
        onSubmit={handleKYCComplete}
      />
      {/* <KycAcceptedDialog
        open={kycAcceptedDialog}
        onOpenChange={(open) => {
       
        }}
      /> */}
      {/* <VeriffDialog
        open={step === "veriffDialog"}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }} */}
      {/* />  */}

      {/* Loading Overlay */}
      {isRefreshing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-lg font-medium text-gray-900">
              Updating your profile...
            </p>
            <p className="text-sm text-gray-500">
              Please wait while we refresh your information
            </p>
          </div>
        </div>
      )}
      {veriffLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-lg font-medium text-gray-900">
              Naviagate to Complete kyc page u can use Mobiel or Laptop ...
            </p>
            <p className="text-sm text-gray-500">Please wait .....</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
