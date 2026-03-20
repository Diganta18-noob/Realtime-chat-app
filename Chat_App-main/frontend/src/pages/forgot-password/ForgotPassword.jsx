import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";
import { HiOutlineMail } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      setSent(true);
      toast.success(res.data.message || "Reset link sent!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto animate-fade-in-up">
      <div className="w-full p-6 sm:p-8 glass-card">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-base-content/60">
            {sent
              ? "Check your email for a password reset link"
              : "Enter the email associated with your account"}
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-6">
            {/* Success state */}
            <div className="p-4 rounded-xl bg-success/10 border border-success/20">
              <p className="text-success text-sm">
                If an account with that email exists, we&apos;ve sent a password reset link. Please check your inbox (and spam folder).
              </p>
            </div>
            <Link
              to="/login"
              className="btn btn-gradient w-full text-base font-semibold"
            >
              <BiArrowBack className="text-xl" /> Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Email Address</span>
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered input-primary w-full pl-10 bg-base-200/50 focus:bg-base-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                "Send Reset Link"
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

export default ForgotPassword;
