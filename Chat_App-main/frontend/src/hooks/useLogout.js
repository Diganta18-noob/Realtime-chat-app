import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, setAccessToken } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/auth/logout");
      setAuthUser(null);
      setAccessToken(null);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
