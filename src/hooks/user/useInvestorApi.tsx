'use client'

import api from '@/lib/httpClient';
import { UserProfile } from '@/types/project';
import { useState, useEffect, useCallback } from 'react';

const useInvestorApi = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const[mobile, setMobile] = useState<string>("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const userResponse = await api.get('/user/investor/my-profile');
      setData(userResponse.data?.data);
      setMobile(userResponse.data?.data?.mobileNumber);
      return userResponse.data?.data;
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = window.sessionStorage?.getItem('accessToken');
      const sessionId = window.sessionStorage?.getItem('sessionId');
      
      if (accessToken && sessionId) {
        fetchData();
      }
    }
  }, [fetchData]);

  return { data, loading, error, fetchData, mobile };
};

export default useInvestorApi;