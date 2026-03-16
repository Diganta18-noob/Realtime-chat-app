import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { accessToken, refreshAccessToken } = useAuthContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        let token = accessToken;
        let res = await fetch("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If 401, try refreshing the token
        if (res.status === 401) {
          token = await refreshAccessToken();
          if (!token) return;
          res = await fetch("/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) getConversations();
  }, [accessToken, refreshAccessToken]);

  return { loading, conversations };
};
export default useGetConversations;
