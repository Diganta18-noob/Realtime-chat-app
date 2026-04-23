import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";

const Home = React.lazy(() => import("./pages/home/Home"));
const Login = React.lazy(() => import("./pages/login/Login"));
const SignUp = React.lazy(() => import("./pages/signup/SignUp"));
const ForgotPassword = React.lazy(() => import("./pages/forgot-password/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/reset-password/ResetPassword"));

const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const SetUsername = React.lazy(() => import("./pages/set-username/SetUsername"));

import AppSkeleton from "./components/skeletons/AppSkeleton";

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center px-2 sm:px-4">
    <AppSkeleton />
  </div>
);

function App() {
  const { authUser, isLoading } = useAuthContext();
  const location = useLocation();
  
  return (
    <>
      {/* Cinematic noise and vignette overlay */}
      <div className="cinematic-overlay" />
      
      <div className="min-h-screen flex items-center justify-center px-2 sm:px-4">
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
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
              path="/set-username"
              element={
                <ProtectedRoute>
                  <SetUsername />
                </ProtectedRoute>
              }
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
        </AnimatePresence>
      </Suspense>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#09090B",
            color: "#E2E8F0",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      />
    </div>
    </>
  );
}

export default App;
