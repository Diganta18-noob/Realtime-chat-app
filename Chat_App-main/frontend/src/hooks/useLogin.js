import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, setAccessToken } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", { username, password });
      
      const { accessToken, ...userProfile } = res.data;
      localStorage.setItem("chat-user", JSON.stringify(userProfile));
      setAuthUser(userProfile);
      setAccessToken(accessToken);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}
