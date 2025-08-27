import api from '@/lib/httpClient';
import { useState, useEffect } from 'react';
import { UserData } from '@/types/userType';


const useUserDetails = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userResponse = await api.get('/user/investor');
      setData(userResponse.data?.data as UserData) ;
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearUser = () => {
    setData(null);
    setError(null);
  };

  useEffect(() => {
    // Only fetch data if both tokens are available
    if (typeof window !== 'undefined') {
      const accessToken = window.sessionStorage?.getItem('accessToken');
      const sessionId = window.sessionStorage?.getItem('sessionId');
      
      if (accessToken && sessionId) {
        fetchData();
      } else {
        setLoading(false);
      }
    }
  }, []);

  return { data, loading, error, fetchData, clearUser };
};

export default useUserDetails;