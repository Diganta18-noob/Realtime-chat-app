import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetDashboardStats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, onlineNow: 0, messagesToday: 0 });
  const { accessToken, refreshAccessToken } = useAuthContext();

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      let token = accessToken;
      let res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        token = await refreshAccessToken();
        if (!token) return;
        res = await fetch("/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStats(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken, refreshAccessToken]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, refetch: fetchStats };
};

export default useGetDashboardStats;
