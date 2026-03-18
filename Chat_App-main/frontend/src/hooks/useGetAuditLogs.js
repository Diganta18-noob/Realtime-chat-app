import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

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



  const fetchLogs = useCallback(
    async (pageNum = 1, currentFilters = filters) => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/admin/audit-logs", {
          params: {
            page: pageNum,
            action: currentFilters.action || undefined,
            userId: currentFilters.userId || undefined,
            startDate: currentFilters.startDate || undefined,
            endDate: currentFilters.endDate || undefined,
          },
        });

        const data = res.data;
        setLogs(data.logs);
        setTotal(data.total);
        setPage(data.page);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error(error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    },
    [filters]
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
