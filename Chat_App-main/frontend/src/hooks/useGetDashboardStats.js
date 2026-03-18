import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

const useGetDashboardStats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, onlineNow: 0, messagesToday: 0 });

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, refetch: fetchStats };
};

export default useGetDashboardStats;
