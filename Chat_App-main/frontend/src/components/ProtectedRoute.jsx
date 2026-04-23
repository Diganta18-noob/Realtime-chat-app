import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return null;
  if (!authUser) return <Navigate to="/login" replace />;

  if (authUser.isUsernameSet === false && location.pathname !== "/set-username") {
    return <Navigate to="/set-username" replace />;
  }

  if (authUser.isUsernameSet === true && location.pathname === "/set-username") {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;

