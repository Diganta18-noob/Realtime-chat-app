import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  const isLoading = authUser === undefined; 

  if (isLoading) return null; // Wait for AuthContext to finish its bootstrap checks
  if (!authUser) return <Navigate to="/login" replace />;
  if (authUser.role !== "admin") return <Navigate to="/" replace />;
  return children;
};
export default AdminRoute;
