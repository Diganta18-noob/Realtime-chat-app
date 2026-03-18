import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoading } = useAuthContext();

  if (isLoading) return null;
  if (!authUser) return <Navigate to="/login" replace />;
  return children;
};
export default ProtectedRoute;
