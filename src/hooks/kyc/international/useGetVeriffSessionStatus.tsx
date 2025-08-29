import { KYCStatus } from "@/app/kyc_status/(components)/kyc-status-card";
import api from "@/lib/httpClient";
import { useState, useEffect } from "react";

const useGetVeriffSessionStatus = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<KYCStatus | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await api.get("/kyc/veriff/get-session");
        // Map backend status to internal type if needed
        setStatus(res.data.data as KYCStatus);
      } catch (err: any) {
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return { status, loading, error };
};

export default useGetVeriffSessionStatus;
