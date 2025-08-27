import { PortfolioResponse } from "@/constants/global";
import api from "@/lib/httpClient";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

const useFetchPortfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError<{ statusCode: number; message: string }> | null>(null);

  const fetchPortfolio = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<PortfolioResponse>("/portfolio");
      setPortfolio(response.data);
    } catch (err: unknown) {
      if (err && (err as AxiosError).isAxiosError) {
        // Cast to AxiosError with known data type
        setError(err as AxiosError<{ statusCode: number; message: string }>);
      } else {
        console.error("Unexpected error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return { portfolio, loading, error, fetchPortfolio };
};

export default useFetchPortfolio;
