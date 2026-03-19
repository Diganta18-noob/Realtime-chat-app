import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/admin/users/${userId}`);
      const data = res.data;

      toast.success(data.message);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteUser };
};

export default useDeleteUser;
