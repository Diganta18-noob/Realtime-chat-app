import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";
import { HiOutlineLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!token) {
      toast.error("Invalid reset link — no token found");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        token,
        newPassword,
      });
      setSuccess(true);
      toast.success(res.data.message || "Password reset successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Reset failed. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto animate-fade-in-up">
        <div className="w-full p-6 sm:p-8 glass-card text-center">
          <h1 className="text-2xl font-bold gradient-text mb-4">Invalid Link</h1>
          <p className="text-base-content/60 text-sm mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <Link to="/forgot-password" className="btn btn-gradient w-full text-base font-semibold">
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto animate-fade-in-up">
      <div className="w-full p-6 sm:p-8 glass-card">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            New Password
          </h1>
          <p className="text-sm text-base-content/60">
            {success
              ? "Your password has been reset successfully"
              : "Enter your new password below"}
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-6">
            <div className="p-4 rounded-xl bg-success/10 border border-success/20">
              <p className="text-success text-sm">
                Password updated! You can now log in with your new password.
              </p>
            </div>
            <Link
              to="/login"
              className="btn btn-gradient w-full text-base font-semibold"
            >
              <BiArrowBack className="text-xl" /> Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">New Password</span>
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="input input-bordered input-primary w-full pl-10 pr-10 bg-base-200/50 focus:bg-base-200"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/80 text-lg transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="input input-bordered input-primary w-full pl-10 pr-10 bg-base-200/50 focus:bg-base-200"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/80 text-lg transition-colors"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              className="btn btn-gradient w-full mt-2 text-base font-semibold"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-sm text-secondary hover:text-accent transition-colors"
          >
            <BiArrowBack className="inline mr-1" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
