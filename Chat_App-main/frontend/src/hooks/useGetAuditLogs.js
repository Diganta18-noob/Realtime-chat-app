import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetAuditLogs = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    action: "",
    userId: "",
    startDate: "",
    endDate: "",
  });

  const { accessToken, refreshAccessToken } = useAuthContext();

  const fetchLogs = useCallback(
    async (pageNum = 1, currentFilters = filters) => {
      setLoading(true);
      try {
        // Build query string
        const params = new URLSearchParams();
        params.set("page", pageNum);
        if (currentFilters.action) params.set("action", currentFilters.action);
        if (currentFilters.userId) params.set("userId", currentFilters.userId);
        if (currentFilters.startDate) params.set("startDate", currentFilters.startDate);
        if (currentFilters.endDate) params.set("endDate", currentFilters.endDate);

        let token = accessToken;
        let res = await fetch(`/api/admin/audit-logs?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          token = await refreshAccessToken();
          if (!token) return;
          res = await fetch(`/api/admin/audit-logs?${params.toString()}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setLogs(data.logs);
        setTotal(data.total);
        setPage(data.page);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [accessToken, refreshAccessToken, filters]
  );

  const applyFilters = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      setPage(1);
      fetchLogs(1, newFilters);
    },
    [fetchLogs]
  );

  useEffect(() => {
    fetchLogs(page, filters);
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  return { logs, total, page, setPage, totalPages, loading, fetchLogs, filters, setFilters, applyFilters };
};
export default useGetAuditLogs;
