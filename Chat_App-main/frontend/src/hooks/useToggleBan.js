import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useToggleBan = () => {
  const [loading, setLoading] = useState(false);
  const { accessToken, refreshAccessToken } = useAuthContext();

  const toggleBan = async (userId, { duration = "permanent", reason = "" } = {}) => {
    setLoading(true);
    try {
      let token = accessToken;
      const body = JSON.stringify({ duration, reason });
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      let res = await fetch(`/api/admin/users/${userId}/ban`, {
        method: "PATCH",
        headers,
        body,
      });

      // If 401, try refreshing the token
      if (res.status === 401) {
        token = await refreshAccessToken();
        if (!token) return false;
        res = await fetch(`/api/admin/users/${userId}/ban`, {
          method: "PATCH",
          headers: { ...headers, Authorization: `Bearer ${token}` },
          body,
        });
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, toggleBan };
};
export default useToggleBan;
