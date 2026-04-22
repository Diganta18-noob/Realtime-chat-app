import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";
import { Lock, Eye, EyeOff, User, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const ResetPasswordByUsername = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !newPassword || !confirmPassword) {
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

    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/reset-password-username", {
        username,
        newPassword,
      });
      setSuccess(true);
      toast.success(res.data.message || "Password reset successfully!");
      // Optionally redirect after a few seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Reset failed. Username may not exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto my-6"
    >
      <div className="w-full p-8 sm:p-10 glass-card hover-glow">
        {/* Brand */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-extrabold gradient-text mb-2 tracking-tight"
          >
            Force Reset
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-sm text-base-content/60 font-medium"
          >
            {success ? "Password has been overwritten." : "Override your password directly by username."}
          </motion.p>
        </div>

        {success ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
            <div className="p-4 flex flex-col items-center justify-center rounded-xl bg-success/20 border border-success/30 backdrop-blur-md">
              <p className="text-success text-sm font-semibold">
                Authorization Override Granted!
              </p>
              <p className="text-success/80 text-xs mt-1">
                You will be redirected shortly...
              </p>
            </div>
            <Link
              to="/login"
              className="btn btn-gradient w-full text-base font-semibold shadow-lg shadow-success/20"
            >
              Sign In Now
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-semibold tracking-wide text-xs uppercase">Target Username</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter specific username"
                  className="input input-bordered input-primary w-full pl-10 bg-base-300/40 focus:bg-base-300/80 border-none ring-1 ring-white/5 focus:ring-primary/50 transition-all text-base-content"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </motion.div>

            {/* New Password */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-semibold tracking-wide text-xs uppercase">New Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="input input-bordered input-primary w-full pl-10 pr-10 bg-base-300/40 focus:bg-base-300/80 border-none ring-1 ring-white/5 focus:ring-primary/50 transition-all text-base-content"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/80 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-semibold tracking-wide text-xs uppercase">Confirm Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="input input-bordered input-primary w-full pl-10 pr-10 bg-base-300/40 focus:bg-base-300/80 border-none ring-1 ring-white/5 focus:ring-danger/50 transition-all text-base-content"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/80 transition-colors"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <button
                className="btn btn-secondary w-full mt-4 text-base font-semibold shadow-lg shadow-black/20 hover:shadow-black/40 border border-white/10"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" /> Overwrite Password
                  </>
                )}
              </button>
            </motion.div>
          </form>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center mt-8 pt-6 border-t border-white/10">
          <Link
            to="/login"
            className="flex items-center justify-center text-sm text-base-content/60 hover:text-base-content transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Authorization
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResetPasswordByUsername;
