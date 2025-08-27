import api from "@/lib/httpClient";
import React, { useState } from "react";

const useVerrifCreateSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSeesion = async (fName : string, lName : string, ) => {
    try {
      setLoading(true);
      const res = await api.post("/kyc/veriff/create-session" ,{
        firstName : fName,
        lastName : lName,
      });
      return res.data;
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createSeesion,
    error,
  }
};

export default useVerrifCreateSession;
