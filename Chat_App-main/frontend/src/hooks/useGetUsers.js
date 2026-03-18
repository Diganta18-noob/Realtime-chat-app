import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/admin/users");
        setUsers(res.data);
      } catch (error) {
        toast.error(error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users, setUsers, loading };
};
export default useGetUsers;
