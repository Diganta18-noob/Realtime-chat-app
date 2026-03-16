import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { accessToken, refreshAccessToken } = useAuthContext();

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        let token = accessToken;
        let res = await fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If 401, try refreshing the token
        if (res.status === 401) {
          token = await refreshAccessToken();
          if (!token) return;
          res = await fetch("/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setUsers(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [accessToken, refreshAccessToken]);

  return { users, setUsers, loading };
};
export default useGetUsers;
