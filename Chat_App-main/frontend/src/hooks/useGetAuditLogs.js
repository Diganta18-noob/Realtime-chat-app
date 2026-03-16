import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetAuditLogs = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { accessToken, refreshAccessToken } = useAuthContext();

  const fetchLogs = useCallback(
    async (pageNum = 1) => {
      setLoading(true);
      try {
        let token = accessToken;
        let res = await fetch(`/api/admin/audit-logs?page=${pageNum}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If 401, try refreshing the token
        if (res.status === 401) {
          token = await refreshAccessToken();
          if (!token) return;
          res = await fetch(`/api/admin/audit-logs?page=${pageNum}`, {
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
    [accessToken, refreshAccessToken]
  );

  useEffect(() => {
    fetchLogs(page);
  }, [fetchLogs, page]);

  return { logs, total, page, setPage, totalPages, loading, fetchLogs };
};
export default useGetAuditLogs;
