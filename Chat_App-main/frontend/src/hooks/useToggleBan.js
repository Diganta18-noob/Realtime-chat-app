import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

const useToggleBan = () => {
  const [loading, setLoading] = useState(false);

  const toggleBan = async (userId, { duration = "permanent", reason = "" } = {}) => {
    setLoading(true);
    try {
      const res = await axiosInstance.patch(`/admin/users/${userId}/ban`, { duration, reason });
      const data = res.data;

      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, toggleBan };
};
export default useToggleBan;
