import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  if (!authUser) return <Navigate to="/login" replace />;
  if (authUser.role !== "admin") return <Navigate to="/" replace />;
  return children;
};
export default AdminRoute;
