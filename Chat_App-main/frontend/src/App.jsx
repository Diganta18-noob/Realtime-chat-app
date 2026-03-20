import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = React.lazy(() => import("./pages/home/Home"));
const Login = React.lazy(() => import("./pages/login/Login"));
const SignUp = React.lazy(() => import("./pages/signup/SignUp"));
const ForgotPassword = React.lazy(() => import("./pages/forgot-password/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/reset-password/ResetPassword"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));

import AppSkeleton from "./components/skeletons/AppSkeleton";

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center px-2 sm:px-4">
    <AppSkeleton />
  </div>
);

function App() {
  const { authUser, isLoading } = useAuthContext();
  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={authUser && !isLoading ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser && !isLoading ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/forgot-password"
            element={authUser && !isLoading ? <Navigate to="/" /> : <ForgotPassword />}
          />
          <Route
            path="/reset-password"
            element={authUser && !isLoading ? <Navigate to="/" /> : <ResetPassword />}
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </Suspense>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1A172B",
            color: "#E2E8F0",
            border: "1px solid rgba(109, 40, 217, 0.2)",
          },
        }}
      />
    </div>
  );
}

export default App;
